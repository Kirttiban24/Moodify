import { FaHeadphonesAlt } from "react-icons/fa";
import React, { useState } from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

  const { loading, handleLogin } = useAuth()

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin({email, password})
    navigate("/")
  }

  return (
    <main className="login-page">

      <div className="overlay"></div>

      <div className="login-card">

      <div className="logo">

        <div className="logo-icon">
          <FaHeadphonesAlt />
        </div>

        <h1>Moodify</h1>

        <p>
          Music That Understands Your Mood
        </p>

      </div>

        <div className="form-container">

          <h2>Welcome Back 👋</h2>

          <span>
            Sign in to continue your musical journey.
          </span>

          <form onSubmit={handleSubmit}>

            <FormGroup
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />

            <FormGroup
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <button
              className="button"
              type="submit"
              >
              Continue
            </button>
          </form>

          <p className="bottom-text">

            Don't have an account?

              <Link to="/register">
                Register
              </Link>

          </p>

        </div>
      </div>
    </main>
  )
}

export default Login
