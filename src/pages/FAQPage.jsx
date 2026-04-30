import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#111', margin: '0 0 1rem' }}>About The Green Hub</h1>

      <p style={{ lineHeight: 1.7, color: '#333', fontSize: '1.05rem' }}>
        EDIT THIS PARAGRAPH: Write 2-3 sentences about what The Green Hub is and why we built it. Talk about helping consumers make sustainable shopping choices, the importance of transparent sustainability information, and reducing the environmental impact of everyday purchases.
      </p>

      <h2 style={{ color: '#111', marginTop: '2rem' }}>Our Mission</h2>
      <p style={{ lineHeight: 1.7, color: '#333' }}>
        EDIT THIS PARAGRAPH: Write 2-3 sentences on the mission — making sustainability easy to understand, surfacing CO₂ savings clearly, building a platform users can trust.
      </p>

      <h2 style={{ color: '#111', marginTop: '2rem' }}>How It Works</h2>
      <p style={{ lineHeight: 1.7, color: '#333' }}>
        EDIT THIS PARAGRAPH: Write 2-3 sentences on the user experience — browsing eco-friendly products, seeing each item's sustainability score and CO₂ impact, tracking your cumulative environmental contribution on the dashboard.
      </p>

      <h2 style={{ color: '#111', marginTop: '2rem' }}>The Team</h2>
      <p style={{ lineHeight: 1.7, color: '#333' }}>
        EDIT THIS PARAGRAPH: Write 1-2 sentences about Team Binary — final-year computer science students at LSBU developing this platform as part of the Software Engineering module.
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
