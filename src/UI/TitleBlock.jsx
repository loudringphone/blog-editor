import { useState } from 'react'
import { Timestamp } from "firebase/firestore";
import { Button } from '@chakra-ui/react'
import './titleBlock.scss'
import { formatDate } from '../functions/formateDate';
import Selector from '../components/selector/Selector';
const TitleBlock = ({post, updatingLabel, updatingTitle}) => {
  const [buttonLabelStyle, setButtonLabelStyle] = useState({visibility: 'visible'})
  const [selectorLabelStyle, setSelectorLabelStyle] = useState({display: 'none'})
  const [titleStyle, setTitleStyle] = useState({display: 'block'})
  const [inputTitleStyle, setInputTitleStyle] = useState({display: 'none'})
  const [updatedTitle, setUpdatedTitle] = useState(post.title)
  
  let postDate
  if (post.date) {
    postDate = formatDate(new Timestamp(post.date.seconds, post.date.nanoseconds).toDate())
  }
  const handleLabelClick = () => {
    setButtonLabelStyle({color: 'rgba(255, 0, 0, 0)'})
    setSelectorLabelStyle({display: 'flex'})
  }
  const handleTitleClick = () => {
    setTitleStyle({display: 'none'})
    setInputTitleStyle({display: 'block'})
  }
  const handleTitleChange = (e) => {
    const value = e.target.value
    setUpdatedTitle(value)
    updatingTitle(value)
  }
  const handleTitleBlur = (e) => {
    const value = e.target.value
    if (value === '') {
        setUpdatedTitle(post.title)
        updatingTitle(post.title)
    }
  }
  return (
    <div className="title-block">
        <div className="label">
          <Button className="button" variant="secondary" maxWidth="120px" padding="0 1.25rem 0 1.25rem" borderRadius={50} onClick={handleLabelClick} style={buttonLabelStyle}>{post.label}</Button>
          <Selector postLabel={post.label} updatingLabel={updatingLabel} style={selectorLabelStyle}/>
        </div>
        <div className="blog-title" onClick={handleTitleClick}>
          <h1 style={titleStyle}>{post.title}</h1>
          <textarea placeholder="Title" type="text" style={inputTitleStyle} value={updatedTitle} onInput={handleTitleChange} onBlur={handleTitleBlur}/>
        </div>
        <div className="small-title">
            <p className="author">{post.author}</p>
            <p className="publish-date">{postDate}</p>
        </div>
        <input type="text" />

    </div>
  )
}

export default TitleBlock