import { useLocation, Link, Navigate } from 'react-router-dom'

function OrderConfirmation() {
  const location = useLocation()
  const state = location.state

  // If user navigated here directly (no order data), redirect home
  if (!state || !state.orderId) {
    return <Navigate to="/" replace />
  }

  const { orderId, totalCO2, totalPrice, totalItems } = state

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>

      <h1 style={{ margin: '0 0 0.5rem' }}>Order placed — thank you!</h1>

      <p style={{ color: '#555', marginBottom: '2rem' }}>
        Your order ID is <code style={{ background: '#f0f0f0', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.9em' }}>{orderId.slice(0, 8)}</code>
      </p>

      <div style={{
        padding: '1.5rem',
        background: '#f4f9f4',
        border: '1px solid #d4e8d4',
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Items:</span>
          <strong>{totalItems}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Total paid:</span>
          <strong>£{totalPrice.toFixed(2)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #c7e0c7' }}>
          <span>🌍 Total CO₂ saved with this order:</span>
          <strong style={{ color: '#2a7a3a' }}>{totalCO2.toFixed(2)} kg</strong>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#fff',
            color: '#2a7a3a',
            border: '1px solid #2a7a3a',
            textDecoration: 'none',
            borderRadius: '6px'
          }}
        >
          Continue shopping
        </Link>
        <Link
          to="/dashboard"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2a7a3a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px'
          }}
        >
          View dashboard
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
