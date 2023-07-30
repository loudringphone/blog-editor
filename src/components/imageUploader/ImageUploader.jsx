import { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImageList from './ImageList'

const ImageUploader = ({currentUser, images}) => {
    return (
        <div className="image-uploader">
        <div className="title">Upload image</div>
        <ImageUpload currentUser={currentUser} imgQty={images?.length}/>
        <ImageList images={images} />
        </div>
    )
}

export default ImageUploader;