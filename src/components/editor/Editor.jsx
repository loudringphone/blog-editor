import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup } from '@chakra-ui/react'
import EditorToolbar, { modules, formats } from './EditorToolbar'
import { motion } from "framer-motion";

import 'react-quill/dist/quill.snow.css';
import './editor.css'


const Editor = (props) => {
  const editorRef = useRef(null);
  const {post} = props
  console.log(post)
  const [content, setContent] = useState('');
  useEffect(() => {
    setContent(post.article || '');
  }, [post.article]);
  const handleCancel = () => {
    alert("The draft has been saved.")
  };
  const handleSave = () => {
    console.log(content);
  };
  const handleEditorFocus = () => {
    // if (editorRef.current) {
    //   editorRef.current.getEditor().focus();
    // }
  };
  return (
    <div id="editor" onClick={handleEditorFocus}>
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
  );
};

export default Editor;
