import { db } from '../firebase_setup/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"

export async function createPost(currentUser, navigate) {
  const author = currentUser.name
  const userEmail = currentUser.email
  const newPostRef = await addDoc(collection(db, "posts"), {
    label: '',
    title: '',
    preview: '',
    article: '',
    image: '',
    images: [],
    author: author,
    email: userEmail,
    draft: true,
    date: serverTimestamp(),
  });
  if (!newPostRef) {
    return alert('Error: Unable to create a new post')
  }
  navigate(newPostRef.id)
  console.log("New post ID:", newPostRef.id);
}