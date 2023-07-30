import React from 'react'
import ImageItem from './ImageItem'

const ImageList = ({images}) => {
    
    console.log('images')
    return (
        <ul className="image-list">
            {
                images &&
                images.map((image,i) => (<ImageItem
                    key={i}
                    image={image}
                     />))
            }
        </ul>
    )
}

export default ImageList
