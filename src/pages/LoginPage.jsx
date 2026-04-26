import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await signIn(email, password)
    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '4rem auto',
      padding: '2rem',
      background: '#fff',
      border: '1px solid #e5e5e5',
      borderRadius: '8px'
    }}>
      <h1 style={{ margin: '0 0 1.5rem', color: '#111', lineHeight: 1.2, fontSize: '1.75rem' }}>Login</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#333' }}>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.6rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#333' }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.6rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </label>

        {error && (
          <p style={{ color: '#c0392b', fontSize: '0.875rem', margin: '0.5rem 0' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#2a7a3a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: loading ? 'wait' : 'pointer',
            marginTop: '0.5rem'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ fontSize: '0.875rem', textAlign: 'center', marginTop: '1.5rem', color: '#555' }}>
        New here? <Link to="/signup" style={{ color: '#2a7a3a' }}>Create an account</Link>
      </p>
    </div>
  )
}

export default LoginPage