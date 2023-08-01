import { db } from '../firebase_setup/firebase';
import { deleteDoc, doc } from "firebase/firestore";

export async function deletePost(postId) {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      console.log('Document successfully deleted:', postId);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }