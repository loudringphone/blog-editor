import { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'
import ImageList from './ImageList'

const ImageUploader = ({currentUser, images, postId, isUpdated}) => {
    // const [uploaded, setUploaded] = useState(false);

    // useEffect(() => {
    //     if (uploaded) {

    //       setUploaded(false)
    //     }
    // }, [uploaded]);

    return (
        <div className="image-uploader">
        <div className="title">Upload image</div>
        <ImageUpload currentUser={currentUser} images={images} isUpdated={isUpdated} postId={postId}/>
        <ImageList postId={postId} images={images} isUpdated={isUpdated}  />
        </div>
    )
}

export default ImageUploader;