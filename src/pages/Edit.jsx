import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../components/editor/Editor';
import ImageUploader from '../components/imageUploader/ImageUploader';
import { db } from '../firebase_setup/firebase';
import '../styles/edit.css';
const Edit = (props) => {
    const {currentUser} = props
    let {postId} = useParams()
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const userEmail = currentUser.email
    useEffect(() => {
      const fetchData = async () => {
        try {
          const postDocRef = doc(db, "posts", postId);
          const userDocRef = doc(db, "users", userEmail);
  
          // Fetch both post and user data asynchronously
          const [postSnapshot, userSnapshot] = await Promise.all([
            getDoc(postDocRef),
            getDoc(userDocRef)
          ]);
  
          const postData = postSnapshot.data();
          const userData = userSnapshot.data();
  
          setPost({ id: postSnapshot.id, ...postData });
          setUser({ id: userSnapshot.id, ...userData });
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchData();
    }, [postId, userEmail]);
    
    useEffect(() => {
      if (updated) {
        const fetchPost = async () => {
          try {
            const postDocRef = doc(db, "posts", postId);
            const postSnapshot = await Promise(getDoc(postDocRef));
            const postData = postSnapshot.data();
            setPost({ id: postSnapshot.id, ...postData });
          } catch (error) {
            console.error(error);
          }
        };
        fetchPost();
        setUpdated(false)
      }
    }, [updated]);
    const isUpdated = (boolean) => {
      setUpdated(boolean);
    };

      if (loading) {
        return (
            <section className='edit'>
            <p>Fetching the article...</p>
            </section>
        )
      }
  
      
    else if (post && user && post.author != user.name) {
        return (
            <section className='edit'>
                <p>You have no access rights to edit this article.</p>
            </section>
        ) 
    }

    return (
        <section className='edit'>
            <Editor post={post} />
            <ImageUploader currentUser={currentUser} images={post.images} postId={post.id} isUpdated={isUpdated}/>
        </section>
    )

}

export default Edit;