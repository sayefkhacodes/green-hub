import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#111', margin: '0 0 1rem' }}>About The Green Hub</h1>

      <p style={{ lineHeight: 1.7, color: '#333', fontSize: '1.05rem' }}>
        The Green Hub is an eco-friendly shopping platform built to help consumers make environmentally responsible purchasing decisions without having to dig through marketing claims. Every product on the site comes with a clear sustainability score, materials information, and an estimate of the CO₂ saved compared to a conventional alternative.
      </p>

      <h2 style={{ color: '#111', marginTop: '2rem' }}>Our Mission</h2>
      <p style={{ lineHeight: 1.7, color: '#333' }}>
        We believe that buying sustainably should be the easy choice, not the difficult one. The Green Hub exists to surface the environmental impact of everyday purchases in a way that is honest, specific, and easy to understand. Our aim is to give shoppers the information they need to align their purchases with their values, and to make that information visible at the point of decision.
      </p>

      <h2 style={{ color: '#111', marginTop: '2rem' }}>How It Works</h2>
      <p style={{ lineHeight: 1.7, color: '#333' }}>
        Browse products across categories such as home, kitchen, beauty, and food. Each product page shows a sustainability score from 1 to 10, the materials used, and the estimated CO₂ saved per purchase. As you shop, your personal dashboard automatically tracks your cumulative environmental impact across all orders, expressed both as a CO₂ figure and as relatable equivalents like trees or kilometres of car emissions avoided.
      </p>

      <h2 style={{ color: '#111', marginTop: '2rem' }}>The Team</h2>
      <p style={{ lineHeight: 1.7, color: '#333' }}>
        The Green Hub is built by Team Binary, a group of Year 2 BSc Computer Science students at London South Bank University. The platform was developed as part of the CSI_5_SFE Software Engineering module.
      </p>

      <div style={{ marginTop: '2.5rem' }}>
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
          Browse our products
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
