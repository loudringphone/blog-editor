import { useState, useRef} from 'react'
import './selector.scss'
import { capitaliseFirstLetter } from '../../functions/capitaliseFirstLetter';

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
      setUpdatedLabel(capitaliseFirstLetter(value))
      updatingLabel(capitaliseFirstLetter(value))
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
      if (capitaliseFirstLetter(postLabel) == 'Tips' || capitaliseFirstLetter(postLabel) == 'Recycling') {
        setInput(false)
      }
    }
    if (capitaliseFirstLetter(value) == 'Tips' || capitaliseFirstLetter(value) == 'Recycling') {
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
        <option value="Tips">Tips</option>
        <option value="Recycling">Recycling</option>
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