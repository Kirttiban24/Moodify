import React from 'react'

const FormGroup = ({ label, id, name, type, required, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type} id={id} name={name} required={required} />
    </div>
  )
}

export default FormGroup
