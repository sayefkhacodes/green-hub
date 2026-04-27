import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CheckoutPage() {
  const { user, loading: authLoading } = useAuth()
  const { items, totalPrice, totalCO2, totalItems, clearCart } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Wait for auth to resolve before deciding to redirect
  if (authLoading) {
    return <p style={{ padding: '2rem' }}>Loading...</p>
  }

  // Must be logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // No items in cart? Send back to shop
  if (items.length === 0) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    // Step 1: Insert the order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_price: totalPrice,
        total_co2_saved: totalCO2
      })
      .select()
      .single()

    if (orderError) {
      setError('Failed to place order: ' + orderError.message)
      setSubmitting(false)
      return
    }

    // Step 2: Insert order items
    const orderItemsToInsert = items.map(item => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
      co2_saved_at_purchase: item.co2_saved_kg || 0
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert)

    if (itemsError) {
      setError('Order created but items failed to save: ' + itemsError.message)
      setSubmitting(false)
      return
    }

    // Step 3: Clear cart and navigate to confirmation
    clearCart()
    navigate('/order-confirmation', { state: { orderId: orderData.id, totalCO2, totalPrice, totalItems } })
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ margin: '0 0 1.5rem' }}>Checkout</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '2rem',
        alignItems: 'start'
      }} className="product-detail-grid">

        <form onSubmit={handleSubmit} style={{
          padding: '1.5rem',
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '8px'
        }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.2rem' }}>Shipping details</h2>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Full name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Shipping address</span>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </label>

          <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '0.5rem' }}>
            This is a demo system. No real payment will be taken.
          </p>

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.875rem', margin: '1rem 0' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: '#2a7a3a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: submitting ? 'wait' : 'pointer',
              marginTop: '1rem'
            }}
          >
            {submitting ? 'Placing order...' : 'Place Order'}
          </button>
        </form>

        <div style={{
          padding: '1.5rem',
          background: '#f4f9f4',
          border: '1px solid #d4e8d4',
          borderRadius: '8px',
          position: 'sticky',
          top: '5rem'
        }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.2rem' }}>Order summary</h2>

          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span>{item.name} × {item.quantity}</span>
              <span>£{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #c7e0c7', marginTop: '1rem', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>CO₂ saved:</span>
              <strong style={{ color: '#2a7a3a' }}>{totalCO2.toFixed(2)} kg</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '0.5rem' }}>
              <strong>Total:</strong>
              <strong>£{totalPrice.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
