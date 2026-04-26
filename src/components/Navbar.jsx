import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.95rem'
  }

  const buttonLinkStyle = {
    textDecoration: 'none',
    color: '#ffffff',
    background: '#2a7a3a',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit'
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: '#2a7a3a',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>🌱</span>
        <span>The Green Hub</span>
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Shop</Link>

        {user ? (
          <>
            <span style={{ fontSize: '0.875rem', color: '#555' }}>
              {user.email}
            </span>
            <button onClick={handleSignOut} style={buttonLinkStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={buttonLinkStyle}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar