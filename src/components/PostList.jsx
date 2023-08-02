import { useState, useEffect } from 'react';
import { useLocation, NavLink, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from '@chakra-ui/react'
import PostCard from './PostCard';
import { db } from '../firebase_setup/firebase';
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import '../styles/posts.scss'
import processing from '../assets/images/loading.gif'

const PostList = ({currentUser, myPosts, label}) => {
    const {pathname} = useLocation();
    const params = useParams()
    const [posts, setPosts] = useState([]);
    const [updated, setUpdated] = useState(true);
    const [loading, setLoading] = useState(true);
    const fetchPosts = async () => {
      let q = query(collection(db, "posts"), where("draft", "==", false))
    
      if (label) {
        q = query(
          collection(db, "posts"),
          where("draft", "==", false),
          where("label", "==", label)
        );
      }
      if (currentUser?.email && myPosts) {
        q = query(collection(db, "posts"), where("email", "==", currentUser.email))
      }
      await getDocs(q)
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => {
            const aTime = a.date ? new Timestamp(a.date.seconds, a.date.nanoseconds).toDate() : null;
            const bTime = b.date ? new Timestamp(b.date.seconds, b.date.nanoseconds).toDate() : null;

            if (!aTime && !bTime) {
            return 0; // both documents have no createdAt property
            } else if (!aTime) {
            return 1; // a has no createdAt property, move it to the end
            } else if (!bTime) {
            return -1; // b has no createdAt property, move it to the end
            } else {
            return bTime - aTime; // sort by createdAt field
            }
        });
          setPosts(newData);
          if (currentUser == null || Object.keys(currentUser).length > 0) {
            setLoading(false)
          }
      })
    }
    useEffect(()=>{
      fetchPosts()
    }, [currentUser, pathname])
    useEffect(()=>{
      if (!updated) {
        fetchPosts()
        setUpdated(true)
      }
    }, [updated])
    
    const isUpdated = (boolean) => {
      setUpdated(boolean);
    };

    if (loading && label == 'Tips' && (pathname == '/' || pathname == '/home')) {
      return (
        <></>
      )
    }
    if (loading) {
      return (
        <section>
          <div className="processing">
            <img src={processing} alt="processing" style={{height: '18px'}}/>Fetching posts...
          </div>
        </section>
      )
    }
    
    if (pathname == '/' || pathname == '/home') {
      return (
        <>
          <div className='title-wrapper'>
            <h1>Ridly's {label}</h1>
          
            <motion.div whileTap={{scale: 0.9}}>
            <NavLink className="logo" to={`/posts/${label.toLowerCase()}`}>

              <Button className="button" size='lg' variant="primary" width="100px">View all</Button>
            </NavLink>

            </motion.div>
          </div>
          <div className='post-list'>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} userEmail={currentUser?.email} myPosts={myPosts} isUpdated={isUpdated} />
            ))}
          </div>  
        
        </>
      )

    }

    return (
      <>
        <div className='title-wrapper'>
          <h1>All posts</h1>
        </div>
        <div className='post-list'>
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} userEmail={currentUser?.email} myPosts={myPosts} isUpdated={isUpdated} />
              ))}
         </div>  
      </>
    );
  };
  
  export default PostList;