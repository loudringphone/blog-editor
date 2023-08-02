import { useState } from 'react'
import './imageItem.scss'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon';
import DeleteBin5LineIcon from 'remixicon-react/DeleteBin5LineIcon';
import { motion } from "framer-motion";
import { db, storage } from '../../firebase_setup/firebase'
import { ref, deleteObject } from 'firebase/storage';
import { updateDoc, doc } from "firebase/firestore"

const ImageItem = ({ postId, images, image, isUpdated }) => {
    const [copyStyle, setCopyStyle] = useState({display: 'none', opacity: 0})
    let imageUrlStr = '...' + image?.slice(-12);
    let mediaAndToken = null
    if (image && /alt=media&token=([^&]+)/.exec(image)) {
        mediaAndToken =  /alt=media&token=([^&]+)/.exec(image)[1].slice(0,12) + '...'
    }
  
    const copyToClipboard = () => {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = image;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        setCopyStyle({display: 'flex', opacity: 1})
        setTimeout(() => {
            setCopyStyle({display: 'none', opacity: 0})
        }, 2000);
    }

    const deleteImage = () => {
      const imageRef = ref(storage, image);
      deleteObject(imageRef)
        .then(() => {
            console.log('File successfully deleted!');
            const postRef = doc(db, "posts", postId);
              images.splice(images.indexOf(image), 1);
              updateDoc(postRef, {
                images: images
              })
        })
        .then(() => { return isUpdated(true) })
        .catch((error) => {
            console.error('Error deleting file:', error);
        })
        .then(() => {
          const postRef = doc(db, "posts", postId);
          images.splice(images.indexOf(image), 1);
          updateDoc(postRef, {
            images: images
          })
        })
        .then(() => {
          isUpdated(true)
        })
    }
    return (
        <>
            <li
                className="image-item"
                key={image}>
                  <div className='img'>
                    <img src={image} alt={image} />

                  </div>
                <a href={image} className='image-url' target="_blank">{mediaAndToken || imageUrlStr}</a>
                <div className="actions">
                <motion.div className="copyToClipboard" whileTap={{scale: 0.9}}>
                    <div className="copied" style={copyStyle}>
                    <p>link copied</p>
                    </div>
                  <FileCopyLineIcon size={30} onClick={copyToClipboard}/>
                </motion.div>
                <motion.div whileTap={{scale: 0.9}}>
                  <DeleteBin5LineIcon size={30} onClick={deleteImage} />
                </motion.div>
                </div>
            </li>
        </>
    )
}

export default ImageItem
