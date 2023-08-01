import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules } from './EditorToolbar'
import { motion } from "framer-motion";
import TitleBlock from '../../UI/TitleBlock';
import { db } from '../../firebase_setup/firebase'
import { updateDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import 'react-quill/dist/quill.snow.css';
import './editor.css'
import { Checkbox, Input, Button, ButtonGroup } from '@chakra-ui/react'
import { deletePost } from '../../functions/deletePost';
import { useNavigate } from 'react-router-dom';

const Editor = ({post}) => {
  const navigate = useNavigate()
  const [label, setLabel] = useState(post.label)
  const [title, setTitle] = useState(post.title)
  const [preview, setPreview] = useState(post.preview)
  const [article, setArticle] = useState('');
  const [placeholderStyle, setPlaceholderStyle] = useState({display: 'flex'})
  const [draft, setDraft] = useState(post.draft);
  const [saved, setSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState(post.image);
  const editorRef = useRef(null);
  console.log(post)
  useEffect(() => {
    setArticle(post.article || '');
  }, [post.article]);
  const handleCancel = () => {
    const currentURL = window.location.href;
    const segments = currentURL.split('/');
    const path = segments[segments.length - 2]
    console.log(path)
    if (path === 'create') {
      const result = window.confirm('Are you sure to discard this draft?')
      if (result) {
        deletePost(post.id)
        toast.success("Your draft has been successfully deleted.", {autoClose: 1500})
        navigate('/my-post')
      }
    }
  };
  const handleSave = async () => {
    if (!draft && imageUrl.length <= 5) {
      return alert('Please provide a cover image before publishing the article.')
    }
    const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        label: label || post.label,
        title: title || post.title,
        preview: preview || post.preview,
        image: imageUrl || post.image,
        draft: draft,
        article: article
    });
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 5000);
  };

  const updatingLabel = (label) => {
    setLabel(label);
  };
  const updatingTitle = (title) => {
    setTitle(title);
  };
  const updatingPreview = (preview) => {
    setPreview(preview);
  };

  const handleImageUrlInput = (e) => {
    const value = e.target.value
    setImageUrl(value)
  }
  const handleDraft = (e) => {
    const target = e.target.checked
    setDraft(target)
  }
  const handleFocus = () => {
    if (editorRef.current && article.length == 0) {
      editorRef.current.focus();
      setPlaceholderStyle({display: 'none'})
    }
  };
  return (
    <div className="edit-article">
      <TitleBlock post={post} updatingLabel={updatingLabel} updatingTitle={updatingTitle} updatingPreview={updatingPreview}/>
      <div className="whole-article">
      <Input
        value={imageUrl}
        onChange={handleImageUrlInput}
        type='url'
        _placeholder={{ color: 'gray.400' }}
        placeholder='Cover Image URL'/>
        <div className='img-placeholder'>
        { imageUrl ?
          <img src={imageUrl} alt={imageUrl} />
          :<></>}
        <h2 className="cover-image">Cover image</h2>

        </div>
      <div id="editor">
        <EditorToolbar />
        {!article || article.length == 0 ?
          <p className='placeholder' style={placeholderStyle}>Write your article here...</p>
          :
          <></>
        }
        <div onClick={handleFocus}>
        <ReactQuill ref={editorRef} theme="snow" modules={modules} value={article} onChange={setArticle}/>
        </div>
        <Checkbox size="md" isChecked={draft} onChange=
          {handleDraft}>Draft?</Checkbox>
        <ButtonGroup className="buttons">
          <motion.div whileTap={{scale: 0.9}}>
            <Button className="button" variant="secondary" onClick=
          {handleCancel} width="85px">Cancel</Button>
          </motion.div>
          {saved?
              <Button className="button" variant="saved" width="85px">Saved</Button>
        :
            <motion.div whileTap={{scale: 0.9}}>
              <Button className="button" variant="primary" onClick={handleSave} width="85px">Save</Button>
            </motion.div>
        
        }
          
        </ButtonGroup>
      </div>
      </div>
    </div>
  );
};

export default Editor;
