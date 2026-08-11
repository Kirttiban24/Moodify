import { FaHeadphonesAlt } from "react-icons/fa";
import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const { loading, handleRegister } = useAuth()  

  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister({username, email, password})

    navigate("/")
  }

  return (
        <main className="register-page">
        <div className="overlay"></div>

            <div className="register-card">
                <div className="logo">
                    <div className="logo-icon">
                        <FaHeadphonesAlt />
                    </div>
                    <h1>Moodify</h1>
                    <p>Music That Understands Your Mood</p>
                </div>

                <div className="form-container">
                    <h2>Create Account 🚀</h2>

                    <span>
                        Join Moodify and discover music based on your emotions.
                    </span>

                    <form onSubmit={handleSubmit}>
                        <FormGroup
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        required
                        />

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
                        disabled={loading}
                        >
                        {loading ? "Creating Account..." : "Create Account →"}
                        </button>
                    </form>

                    <p className="bottom-text">
                        Already have an account?

                        <Link to="/login">
                        Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register
