import { useState, useEffect } from 'react'
import PostCard from './PostCard';
import { db } from '../firebase_setup/firebase';
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import '../styles/posts.css'
import processing from '../assets/images/loading.gif'

const PostList = ({currentUser, myPosts}) => {
    const [posts, setPosts] = useState([]);
    const [updated, setUpdated] = useState(true);
    const [loading, setLoading] = useState(true);
    const fetchPosts = async () => {
      console.log(currentUser)
      let q = query(collection(db, "posts"), where("draft", "==", false))
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
    }, [currentUser])
    useEffect(()=>{
      if (!updated) {
        fetchPosts()
        setUpdated(true)
      }
    }, [updated])
    
    const isUpdated = (boolean) => {
      setUpdated(boolean);
    };

    if (loading) {
      return (
        <section>
          <div className="processing">
            <img src={processing} alt="processing" style={{height: '18px'}}/>Fetching posts...
          </div>
        </section>
      )
    }

    return (
      <section>
        <div className='post-list'>
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} userEmail={currentUser?.email} myPosts={myPosts} isUpdated={isUpdated} />
              ))}
         </div>  
      </section>
    );
  };
  
  export default PostList;