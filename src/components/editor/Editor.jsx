import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup } from '@chakra-ui/react'
import EditorToolbar, { modules } from './EditorToolbar'
import { motion } from "framer-motion";
import TitleBlock from '../../UI/TitleBlock';
import { db } from '../../firebase_setup/firebase'
import { updateDoc, doc } from "firebase/firestore"
import 'react-quill/dist/quill.snow.css';
import './editor.css'


const Editor = ({post}) => {
  const [label, setLabel] = useState(post.label)
  const [title, setTitle] = useState(post.title)
  const [preview, setPreview] = useState(post.preview)
  const [article, setArticle] = useState('');
  const [saved, setSaved] = useState(false);
  const editorRef = useRef(null);

  console.log(post)
  useEffect(() => {
    setArticle(post.article || '');
  }, [post.article]);
  const handleCancel = () => {
    alert("The draft has been saved.")
  };
  const handleSave = async () => {
    const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        label: label || post.label,
        title: title || post.title,
        preview: preview || post.preview,
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
  return (
    <div className="edit-article">
      <TitleBlock post={post} updatingLabel={updatingLabel} updatingTitle={updatingTitle} updatingPreview={updatingPreview}/>
      <div id="editor">
        <EditorToolbar />
        <ReactQuill ref={(instance) => (editorRef.current = instance)} theme="snow" modules={modules} value={article} onChange={setArticle} />
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
  );
};

export default Editor;
