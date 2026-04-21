import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) return <p style={{ padding: '2rem' }}>Loading product...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Error: {error}</p>
  if (!product) return <p style={{ padding: '2rem' }}>Product not found.</p>

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#2a7a3a', textDecoration: 'none', fontSize: '0.875rem' }}>
        ← Back to all products
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginTop: '1.5rem',
        alignItems: 'start'
      }}>
        <img
          src={product.image_url}
          alt={product.name}
          style={{
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #eee'
          }}
        />

        <div>
          <p style={{
            color: '#666',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            {product.categories?.name}
          </p>

          <h1 style={{ margin: '0 0 0.5rem 0', lineHeight: 1.2, fontSize: '2rem' }}>{product.name}</h1>

          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>
            £{product.price}
          </p>

          <p style={{ lineHeight: 1.6, color: '#333' }}>
            {product.description}
          </p>

          <div style={{
            background: '#f4f9f4',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1.5rem',
            border: '1px solid #d4e8d4'
          }}>
            <h3 style={{ margin: '0 0 0.75rem', color: '#2a7a3a' }}>Sustainability</h3>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Score:</strong> {product.sustainability_score}/10
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Materials:</strong> {product.materials}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>CO₂ saved:</strong> {product.co2_saved_kg} kg per purchase
            </p>
          </div>

          <button
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              background: '#2a7a3a',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => alert('Cart coming soon!')}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail