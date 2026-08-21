import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from './api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Clear any stale token before login
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      // Redirect admin users to admin dashboard, others to user dashboard
      const dest = data.user && data.user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard'
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <aside className="auth-hero">
          <div className="brand-row">
            <div className="brand-mark">E</div>
            <span>EastCart</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Welcome back</p>
            <h1>Grow your store with smarter decisions.</h1>
            <p>
              Manage inventory, orders, and customer insights from one clean, powerful dashboard.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-pill">
              <strong>24k</strong>
              <span>Orders</span>
            </div>
            <div className="stat-pill">
              <strong>4.9/5</strong>
              <span>Rating</span>
            </div>
            <div className="stat-pill">
              <strong>98%</strong>
              <span>Fulfillment</span>
            </div>
          </div>
        </aside>

        <main className="auth-panel">
          <div className="login-card">
            <div className="card-topline">Account access</div>
            <h1>Sign in</h1>
            <p className="subtitle">Use your credentials to continue to your workspace.</p>

            <form onSubmit={handleSubmit} className="form">
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </label>

              <div className="form-row">
                <label className="check-row">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            {error && <div className="error">{error}</div>}

            <div className="foot">
              No account? <Link to="/register">Create one</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
