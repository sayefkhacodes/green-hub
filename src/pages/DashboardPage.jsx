import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('id, created_at, total_price, total_co2_saved')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setOrders(data)
      }
      setLoading(false)
    }

    fetchOrders()
  }, [user])

  if (authLoading) return <p style={{ padding: '2rem' }}>Loading...</p>
  if (!user) return <Navigate to="/login" replace />
  if (loading) return <p style={{ padding: '2rem' }}>Loading your dashboard...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Error: {error}</p>

  const totalCO2 = orders.reduce((sum, o) => sum + Number(o.total_co2_saved || 0), 0)
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_price || 0), 0)
  const totalOrders = orders.length

  // Equivalent: average tree absorbs ~21kg CO2/year, average car emits ~150g/km
  const treeEquivalent = (totalCO2 / 21).toFixed(2)
  const kmEquivalent = (totalCO2 / 0.15).toFixed(0)

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ margin: '0 0 0.5rem' }}>Your green impact</h1>
      <p style={{ color: '#555', margin: '0 0 2rem' }}>Welcome back, {user.email}</p>

      {orders.length === 0 ? (
        <div style={{
          padding: '3rem 2rem',
          background: '#f4f9f4',
          border: '1px solid #d4e8d4',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌱</div>
          <h2 style={{ margin: '0 0 0.5rem' }}>No orders yet</h2>
          <p style={{ color: '#555', margin: '0 0 1.5rem' }}>
            Make your first eco-friendly purchase to start tracking your impact.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#2a7a3a',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px'
            }}
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: '#f4f9f4',
              border: '1px solid #d4e8d4',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#2a7a3a', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                CO₂ saved
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0', color: '#2a7a3a' }}>
                {totalCO2.toFixed(2)} kg
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#555', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Total orders
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0' }}>
                {totalOrders}
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#555', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                Total spent
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 0' }}>
                £{totalSpent.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Impact equivalents */}
          {totalCO2 > 0 && (
            <div style={{
              padding: '1.5rem',
              background: '#fffbe6',
              border: '1px solid #f5e6a3',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: '0 0 0.75rem' }}>What this means</h3>
              <p style={{ margin: '0.25rem 0', color: '#333', lineHeight: 1.6 }}>
                🌳 Equivalent to <strong>{treeEquivalent} trees</strong> absorbing CO₂ for a year
              </p>
              <p style={{ margin: '0.25rem 0', color: '#333', lineHeight: 1.6 }}>
                🚗 Or roughly <strong>{kmEquivalent} km</strong> of average car emissions avoided
              </p>
            </div>
          )}

          {/* Recent orders */}
          <h2 style={{ margin: '0 0 1rem' }}>Recent orders</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {orders.slice(0, 5).map(order => (
              <div
                key={order.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  background: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#777' }}>
                    {new Date(order.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    £{Number(order.total_price).toFixed(2)}
                  </p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#2a7a3a' }}>
                    {Number(order.total_co2_saved).toFixed(2)} kg CO₂ saved
                  </p>
                </div>
              </div>
            ))}
          </div>

          {orders.length > 5 && (
            <p style={{ color: '#777', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
              Showing your 5 most recent orders ({orders.length} total).
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default DashboardPage
