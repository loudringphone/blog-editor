import { useState } from 'react'
import './imageItem.scss'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon';
import DeleteBin5LineIcon from 'remixicon-react/DeleteBin5LineIcon';
import { motion } from "framer-motion";

const ImageItem = ({ image }) => {
    const [copyStyle, setCopyStyle] = useState({display: 'none', opacity: 0})
    let imageUrlStr = image
    if (image.length > 15) {
        imageUrlStr = '...' + image.slice(-15);
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
    return (
        <>
            <li
                className="image-item"
                key={image}>
               
                <a href={image} className='image-url' target="_blank">{imageUrlStr}</a>
                <div className="actions">
                <motion.div className="copyToClipboard" whileTap={{scale: 0.9}}>
                    <div className="copied" style={copyStyle}>
                    <p>link copied</p>
                    </div>
                  <FileCopyLineIcon size={30} onClick={copyToClipboard}/>
                </motion.div>
                <motion.div whileTap={{scale: 0.9}}>
                  <DeleteBin5LineIcon size={30} />
                </motion.div>
                </div>
            </li>
        </>
    )
}

export default ImageItem
