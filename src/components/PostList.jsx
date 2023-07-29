import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";
import PostCard from './PostCard';
import { db } from '../firebase_setup/firebase';
import { collection, query, getDocs, Timestamp } from "firebase/firestore";



  
  const PostList = () => {
    const [posts, setPosts] = useState([]);
  
    // Fetch the posts from Firebase
  
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"))
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
      })
    }
    
    useEffect(()=>{
      fetchPosts()
    }, [])
    
  
    return (
      <section>
        <Container>
          <Row>
            <Col lg="12" className="post_list">
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    );
  };
  
  export default PostList;