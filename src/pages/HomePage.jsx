import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')

      if (error) {
        setError(error.message)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) return <p style={{ padding: '2rem' }}>Loading products...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Error: {error}</p>

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', background: '#ffffff', minHeight: '100vh' }}>
      
      <p>Eco-friendly products, {products.length} available</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              background: '#fff',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <h3 style={{ margin: '0.75rem 0 0.25rem' }}>{product.name}</h3>
              <p style={{ margin: '0.25rem 0', color: '#555' }}>£{product.price}</p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
                Sustainability: {product.sustainability_score}/10
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#2a7a3a' }}>
                CO₂ saved: {product.co2_saved_kg} kg
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage