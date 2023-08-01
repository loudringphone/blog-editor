import { useState } from 'react'
import { Timestamp } from "firebase/firestore";
import { Button } from '@chakra-ui/react'
import './titleBlock.scss'
import { formatDate } from '../functions/formateDate';
import Selector from '../components/selector/Selector';
const TitleBlock = ({post, updatingLabel, updatingTitle, updatingPreview}) => {
  const [updatedTitle, setUpdatedTitle] = useState(post.title)
  const [updatedPreview, setUpdatedPreview] = useState(post.preview)

  let postDate
  if (post.date) {
    postDate = formatDate(new Timestamp(post.date.seconds, post.date.nanoseconds).toDate())
  }
  const handleLabelClick = () => {
    if (post.label === "") {
        updatingLabel("Tips")
    }
  }
  const handleTitleClick = () => {
    if (!updatedTitle) {
        setUpdatedTitle(post.title)
    }
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
  const handlePreviewClick = () => {
    if (!updatedPreview) {
        setUpdatedPreview(post.preview)
    }
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
  }
  return (
    <div className="title-block">
        <div className="label">
          <Selector postLabel={post.label} updatingLabel={updatingLabel}/>
        </div>
        <div className="blog-title" onClick={handleTitleClick}>
          <textarea placeholder="Title" type="text" value={updatedTitle} onInput={handleTitleChange} onBlur={handleTitleBlur}/>
        </div>
        <div className="small-title">
            <p className="author">{post.author}</p>
            <p className="publish-date">{postDate}</p>
        </div>
        <div className="blog-preview" onClick={handlePreviewClick}>
          <h2 style={{fontWeight: "bold"}}>Preview</h2>
          <textarea placeholder="Preview" type="text" value={updatedPreview} onInput={handlePreviewChange} onBlur={handlePreviewBlur}/>
        </div>

    </div>
  )
}

export default TitleBlock