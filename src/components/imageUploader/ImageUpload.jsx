import { useRef, useState } from 'react';
import FileAddLineIcon from 'remixicon-react/FileAddLineIcon';
import './imageUploader.scss'
import { Button } from '@chakra-ui/react'
import { db, storage } from '../../firebase_setup/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { updateDoc, doc } from "firebase/firestore"
import processing from '../../assets/images/loading.gif'
import { v4 as uuidv4 } from 'uuid';
import { getCurrentDate } from '../../functions/getCurrentDate';

const ImageUpload = ({ currentUser, images, isUpdated, postId }) => {
    const imageInputRef = useRef(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const handleButtonClick = () => {
        imageInputRef.current.click();
      };
    const handleImageSelection = (event) => {
        const file = event.target.files[0];
        if(!file) return;
          const fileExtension = file.name.split('.').pop();
          const imageName = getCurrentDate() + '-' + uuidv4() + '.' + fileExtension
          console.log(imageName)
          setProgresspercent(0.1);
          const storageRef = ref(storage, `${currentUser.email}/${postId}/images/${imageName}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on("state_changed", (snapshot) => {
            const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
            },
            (error) => {
              alert(error);
              setProgresspercent(0);
            },
            async () => {
              let imgURL
              await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {imgURL = downloadURL})
              const postRef = doc(db, "posts", postId);
              images.push(imgURL)
              await updateDoc(postRef, {
                images: images
              })
              isUpdated(true)
              setProgresspercent(0);
            }
          );
    }
    console.log(images)
    if (images?.length >= 5) {
      return (
        <div className="image-card">
          <p className="main">Limit reached</p>
          <p className="info">You have added the maximum numbers of images for this article. Please remove an image from below.</p>
          </div>
      )
    } 
    return (
        <>
            <div className="image-card">
                {
                    progresspercent > 0 ?
                    <div className="processing">
                      <img src={processing} alt="processing" style={{height: '18px'}}/>Uploading... {Math.round(progresspercent)}%
                    </div>
                    
                :
                    <>
                      <div className="image-inputs">
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageSelection} ref={imageInputRef} />
                        <Button className="button" variant="primary" width="120px" onClick={handleButtonClick}>
                            <FileAddLineIcon size={30} />
                            &nbsp; Upload
                        </Button>
                      </div>
                      <p className="main">Upload image to get a link</p>
                      <p className="info">Supported files: GIF, JPG, PNG</p>
                    </>
                    
                    






                }
               

            </div>
        </>
    )
}

export default ImageUpload
