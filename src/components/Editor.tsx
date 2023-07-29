import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup } from '@chakra-ui/react'
import EditorToolbar, { modules, formats } from './EditorToolbar'
import { motion } from "framer-motion";

import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css'
const Editor: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<ReactQuill | null>(null);
  const quillImageCallBack = () => {
    alert('ttrtrt')
  }
  
  const handleCancel = () => {
    alert("The draft has been saved.")
  };
  const handleSave = () => {
    console.log(content);
  };
  const handleEditorFocus = () => {
    if (editorRef.current) {
      editorRef.current.getEditor().focus();
    }
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
