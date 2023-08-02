import { useState, useRef} from 'react'
import './selector.scss'

const Selector = ({postLabel, updatingLabel}) => {
  const [updatedLabel, setUpdatedLabel] = useState(null)
  const [input, setInput] = useState(false)
  const inputRef = useRef()
  const handleLabelChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setUpdatedLabel('')
      setInput(true)
    }
    else if (value != 'Custom') {
      setUpdatedLabel(value)
      updatingLabel(value)
    } else {
      setInput(true)
      setUpdatedLabel('')
      updatingLabel('')
      setTimeout(() => {
        inputRef.current.focus()
      }, 0);
    }
  }
  const handleInputBlur = (e) => {
    const value = e.target.value
    if (value === '') {
      setUpdatedLabel(postLabel)
      updatingLabel(postLabel)
      if (postLabel == 'projects' || postLabel == 'articles') {
        setInput(false)
      }
    }
    if (value == 'projects' || value == 'articles') {
      setInput(false)
    }
  }

  return (
    <div className="form-field-select-wrapper">
      <select
        className="form-field"
        style={input ? { display: 'none' } : { display: 'block' }}
        onChange={handleLabelChange}
        
        value={(updatedLabel || postLabel) || 'Add'}
      >
        <option value="Add">Add label</option>
        <option value="projects">Projects</option>
        <option value="articles">Articles</option>
        <option value="Custom">Custom label</option>

      </select>
      <input
        type="text"
        placeholder="Label"
        className="form-field"
        onInput={handleLabelChange}
        onBlur={handleInputBlur}
        value={updatedLabel}
        ref={inputRef}
        style={input ? { display: 'block' } : { display: 'none' }}
      />

      {/* <ArrowDownSLineIcon size={20} style={input ? { display: 'none' } : { display: 'block' }} /> */}
    </div>
  )
}

export default Selector