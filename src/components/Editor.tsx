import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup } from '@chakra-ui/react'
import 'react-quill/dist/quill.snow.css';
import '../styles/editor.css'
const Editor: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const editorRef = useRef<ReactQuill | null>(null);
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };
  const handleCancel = () => {
    alert("The draft has been saved.")
  };
  const handleSave = () => {
    console.log(value);
  };
  const handleEditorFocus = () => {
    if (editorRef.current) {
      editorRef.current.getEditor().focus();
    }
  };
  return (
    <div id="editor" onClick={handleEditorFocus}>
    <ReactQuill ref={(instance) => (editorRef.current = instance)} theme="snow" modules={modules} value={value} onChange={setValue} />
    <ButtonGroup className="buttons">
    <Button className="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
    <Button className="button" variant="primary" onClick={handleSave}>Save</Button>
    </ButtonGroup>
    </div>
  );
};

export default Editor;
