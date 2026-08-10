import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [emil, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { loading, handleRegister } = useAuth()  

  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister({username, email, password})

    navigate("/")
  }

  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username" 
            name="username"
            label="Name" 
            type="text" 
            placeholder="Enter your name" 
            required
           />
          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <button className="button" type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register
