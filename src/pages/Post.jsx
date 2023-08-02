import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PencilLineIcon from 'remixicon-react/PencilLineIcon';
import { db } from '../firebase_setup/firebase';
import { formatDate } from "../functions/formateDate";
import { Timestamp } from "firebase/firestore";
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import { Helmet } from '../components/helmet/Helmet'
import processing from '../assets/images/loading.gif'
import '../styles/post.scss';

const Post = ({currentUser}) => {
    let {postId} = useParams()
    const [post, setPost] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const userEmail = currentUser?.email
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const postDocRef = doc(db, "posts", postId);
            const postSnapshot = await getDoc(postDocRef);
            const postData = postSnapshot.data();
            setPost({ id: postSnapshot.id, ...postData });
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
        fetchPost();
      }, [postId]);

    let postDate
    if (post.date) {
        postDate = formatDate(new Timestamp(post.date.seconds, post.date.nanoseconds).toDate())
    }

    function HtmlRenderer({ htmlString }) {
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    }

    if (loading) {
    return (
        <section className='post'>
            <div className="processing">
                <img src={processing} alt="processing" style={{height: '30px'}}/>
                Fetching the article...
          </div>
        </section>
    )
    }
    return (
      <Helmet title={post.title}>
        <section className='post'>
            <div className="title-block">
              <div className="blog-button">
                {post.label}
              </div>
              <div className="blog-title">
                <h1>{post.title}</h1>
              </div>
              <div className="small-title">
                <p className="author">{post.author}</p>
                <p className="publish-date">{postDate}</p>
                {
                userEmail && userEmail === post.email ? (
                  <motion.div className='edit' whileTap={{ scale: 0.9 }}>
                    <NavLink to={`/edit/${post.id}`}>
                      <PencilLineIcon size={20} /> Edit
                    </NavLink>
                  </motion.div>

                ) : (
                    <></>
                )
                }
              </div>
              
            </div>
            <div className="blog-post-content">
              <HtmlRenderer htmlString={post.article} />
            </div>
        </section>
      </Helmet>
    )
}

export default Post;