import { Link } from 'react-router-dom'

function FAQPage() {
  const faqs = [
    {
      question: "What is The Green Hub?",
      answer: "The Green Hub is an eco-friendly shopping platform that helps consumers discover sustainable products and make environmentally responsible purchasing decisions. Each product on the platform displays a sustainability score, materials information, and the estimated CO₂ saved compared to a conventional alternative."
    },
    {
      question: "How is the sustainability score calculated?",
      answer: "Each product is assigned a sustainability score from 1 to 10, based on a combination of factors including the materials used, manufacturing process, packaging, and end-of-life recyclability. Scores are curated by our team rather than generated algorithmically, allowing us to verify each claim against the supplier's documentation."
    },
    {
      question: "What does 'CO₂ saved' mean?",
      answer: "The CO₂ saved figure shown on each product is an estimate of the carbon emissions avoided by choosing that product over a conventional alternative. These estimates are based on industry research and supplier-provided lifecycle data, and are intended as a guide rather than a precise measurement."
    },
    {
      question: "How are products selected?",
      answer: "Products listed on The Green Hub are curated based on their environmental credentials, including third-party sustainability certifications, transparency around materials, and ethical manufacturing practices. We focus on items where the sustainability claim is verifiable rather than marketed."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Authentication is handled through Supabase, which uses industry-standard password hashing and JWT-based session tokens. Database access is protected by Row Level Security policies, meaning each user can only access their own order history. The platform follows GDPR principles for handling personal data."
    },
    {
      question: "How can I track my impact over time?",
      answer: "Once you have an account, your personal dashboard automatically tracks the cumulative CO₂ savings across all of your orders. The dashboard also shows relatable equivalents, such as the number of trees needed to absorb the same amount of CO₂ over a year, or the equivalent kilometres of average car emissions avoided."
    }
  ]

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ color: '#111', margin: '0 0 1.5rem' }}>Frequently Asked Questions</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              padding: '1.25rem',
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px'
            }}
          >
            <h3 style={{ color: '#111', margin: '0 0 0.5rem', fontSize: '1.05rem' }}>
              {faq.question}
            </h3>
            <p style={{ color: '#333', margin: 0, lineHeight: 1.6 }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
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
          Back to shop
        </Link>
      </div>
    </div>
  )
}

export default FAQPage
