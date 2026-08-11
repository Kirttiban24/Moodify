import React from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

const FormGroup = ({ label, id, name, type, required, value, onChange, placeholder }) => {
  return (

    <div className="form-group">

      <label htmlFor={id}>{label}</label>

      <div className="input-wrapper">

        {name==="username" && <FiUser className="input-icon"/>}

        {name==="email" && <HiOutlineMail className="input-icon"/>}

        {name==="password" && <RiLockPasswordLine className="input-icon"/>}

        <input
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default FormGroup
