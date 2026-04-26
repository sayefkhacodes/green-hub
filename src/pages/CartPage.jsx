import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalCO2, totalItems } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '700px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111', lineHeight: 1.2 }}>Your cart is empty</h1>
        <p style={{ color: '#555', marginTop: '1rem' }}>Browse our eco-friendly products and start saving CO₂.</p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            background: '#2a7a3a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px'
          }}
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#111', lineHeight: 1.2, margin: '0 0 1.5rem' }}>Your cart</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            background: '#fff',
            alignItems: 'center'
          }}>
            <img
              src={item.image_url}
              alt={item.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
            />

            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 0.25rem', color: '#111', fontSize: '1.05rem' }}>{item.name}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
                £{item.price} · CO₂ saved: {item.co2_saved_kg} kg per item
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  width: '32px', height: '32px', border: '1px solid #ccc',
                  background: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem'
                }}
              >−</button>
              <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{
                  width: '32px', height: '32px', border: '1px solid #ccc',
                  background: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem'
                }}
              >+</button>
            </div>

            <div style={{ minWidth: '70px', textAlign: 'right', fontWeight: 'bold', color: '#111' }}>
              £{(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                padding: '0.4rem 0.6rem',
                background: 'transparent',
                border: '1px solid #ddd',
                color: '#888',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f4f9f4',
        borderRadius: '8px',
        border: '1px solid #d4e8d4'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#333' }}>Items in cart:</span>
          <strong>{totalItems}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#333' }}>Total CO₂ saved:</span>
          <strong style={{ color: '#2a7a3a' }}>{totalCO2.toFixed(2)} kg</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #c7e0c7' }}>
          <span style={{ color: '#111' }}><strong>Total:</strong></span>
          <strong style={{ color: '#111' }}>£{totalPrice.toFixed(2)}</strong>
        </div>

        <button
          onClick={handleCheckout}
          style={{
            width: '100%',
            marginTop: '1.5rem',
            padding: '0.85rem',
            background: '#2a7a3a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {user ? 'Proceed to checkout' : 'Login to checkout'}
        </button>
      </div>
    </div>
  )
}

export default CartPage