import { useState } from 'react'
import { Timestamp } from "firebase/firestore";
import { Button } from '@chakra-ui/react'
import './titleBlock.scss'
import { formatDate } from '../functions/formateDate';
import Selector from '../components/selector/Selector';
const TitleBlock = ({post, updatingLabel, updatingTitle, updatingPreview}) => {
  const [buttonLabelStyle, setButtonLabelStyle] = useState({visibility: 'visible'})
  const [selectorLabelStyle, setSelectorLabelStyle] = useState({display: 'none'})
  const [titleStyle, setTitleStyle] = useState({display: 'block'})
  const [inputTitleStyle, setInputTitleStyle] = useState({display: 'none'})
  const [updatedTitle, setUpdatedTitle] = useState(post.title)
  const [previewStyle, setPreviewStyle] = useState({display: 'block'})
  const [inputPreviewStyle, setInputPreviewStyle] = useState({display: 'none'})
  const [updatedPreview, setUpdatedPreview] = useState(post.preview)

  let postDate
  if (post.date) {
    postDate = formatDate(new Timestamp(post.date.seconds, post.date.nanoseconds).toDate())
  }
  const handleLabelClick = () => {
    setButtonLabelStyle({color: 'rgba(255, 0, 0, 0)'})
    setSelectorLabelStyle({display: 'flex'})
  }
  const handleTitleClick = () => {
    if (!updatedTitle) {
        setUpdatedTitle(post.title)
    }
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
    setTitleStyle({display: 'block'})
    setInputTitleStyle({display: 'none'})
  }
  const handlePreviewClick = () => {
    if (!updatedPreview) {
        setUpdatedPreview(post.preview)
    }
    setPreviewStyle({display: 'none'})
    setInputPreviewStyle({display: 'block'})
  }
  const handlePreviewChange = (e) => {
    const value = e.target.value
    setUpdatedPreview(value)
    updatingPreview(value)
  }
  const handlePreviewBlur = (e) => {
    const value = e.target.value
    if (value === '') {
        setUpdatedPreview(post.preview)
        updatingPreview(post.preview)
    }
    setPreviewStyle({display: 'block'})
    setInputPreviewStyle({display: 'none'})
  }
  return (
    <div className="title-block">
        <div className="label">
          <Button className="button" variant="secondary" maxWidth="120px" padding="0 1.25rem 0 1.25rem" borderRadius={50} onClick={handleLabelClick} style={buttonLabelStyle}>{post.label}</Button>
          <Selector postLabel={post.label} updatingLabel={updatingLabel} style={selectorLabelStyle}/>
        </div>
        <div className="blog-title" onClick={handleTitleClick}>
          <h1 style={titleStyle}>{updatedTitle || post.title}</h1>
          <textarea placeholder="Title" type="text" style={inputTitleStyle} value={updatedTitle} onInput={handleTitleChange} onBlur={handleTitleBlur}/>
        </div>
        <div className="small-title">
            <p className="author">{post.author}</p>
            <p className="publish-date">{postDate}</p>
        </div>
        <div className="blog-preview" onClick={handlePreviewClick}>
          <h2 style={{fontWeight: "bold"}}>Preview</h2>
          <h2 style={previewStyle}>{updatedPreview || post.preview}</h2>
          <textarea placeholder="Preview" type="text" style={inputPreviewStyle} value={updatedPreview} onInput={handlePreviewChange} onBlur={handlePreviewBlur}/>
        </div>

    </div>
  )
}

export default TitleBlock