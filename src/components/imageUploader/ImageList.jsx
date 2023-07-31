import React from 'react'
import ImageItem from './ImageItem'

const ImageList = ({postId, images, isUpdated}) => {
    
    console.log('images')
    return (
        <ul className="image-list">
            {
                images &&
                images.map((image,i) => (<ImageItem
                    key={i}
                    postId={postId}
                    images={images}
                    image={image}
                    isUpdated={isUpdated}
                     />))
            }
        </ul>
    )
}

export default ImageList
