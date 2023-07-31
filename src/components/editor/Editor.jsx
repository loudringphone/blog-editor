import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup } from '@chakra-ui/react'
import EditorToolbar, { modules } from './EditorToolbar'
import { motion } from "framer-motion";
import TitleBlock from '../../UI/TitleBlock';
import 'react-quill/dist/quill.snow.css';
import './editor.css'


const Editor = ({post}) => {
  const [updatedLabel, setUpdatedLabel] = useState(post.label)
  const [updatedTitle, setUpdatedTitle] = useState(post.title)
  const [content, setContent] = useState('');
  const editorRef = useRef(null);
  console.log(post)
  useEffect(() => {
    setContent(post.article || '');
  }, [post.article]);
  const handleCancel = () => {
    alert("The draft has been saved.")
  };
  const handleSave = () => {
    console.log(content);
  };

  const updatingLabel = (label) => {
    setUpdatedLabel(label);
  };
  const updatingTitle = (title) => {
    setUpdatedTitle(title);
  };
  return (
    <div className="edit-article">
      <TitleBlock post={post} updatingLabel={updatingLabel} updatingTitle={updatingTitle} />
      <div id="editor">
        <EditorToolbar />
        <ReactQuill ref={(instance) => (editorRef.current = instance)} theme="snow" modules={modules} value={content} onChange={setContent} />
        <ButtonGroup className="buttons">
          <motion.div whileTap={{scale: 0.9}}>
            <Button className="button" variant="secondary" onClick=
          {handleCancel} width="85px">Cancel</Button>
          </motion.div>

          <motion.div whileTap={{scale: 0.9}}>
            <Button className="button" variant="primary" onClick={handleSave} width="85px">Save</Button>
          </motion.div>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Editor;
