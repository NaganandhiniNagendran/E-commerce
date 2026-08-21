import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from './api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await register(name, email, password, phone)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      // New registrants are customers — send them to the user dashboard
      navigate('/user-dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="login-card">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit} className="form">
          <label><span>Name</span><input value={name} onChange={e=>setName(e.target.value)} required /></label>
          <label><span>Email</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
          <label><span>Password</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
          <label><span>Phone</span><input value={phone} onChange={e=>setPhone(e.target.value)} /></label>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  )
}
