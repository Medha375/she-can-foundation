import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <main style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ display: 'inline-block', background: '#FCE4EC', color: '#C2185B', fontSize: '13px', fontWeight: 500, padding: '6px 16px', borderRadius: '20px', marginBottom: '16px', letterSpacing: '0.5px' }}>
          EMPOWERING WOMEN · BUILDING FUTURES
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: '#1A0A0E', lineHeight: 1.2, marginBottom: '14px' }}>
          Get in Touch with<br />
          <span style={{ color: '#C2185B' }}>She Can Foundation</span>
        </h1>
        <p style={{ color: '#7B4F5E', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          We'd love to hear from you. Whether you want to volunteer, collaborate, or simply learn more — reach out to us.
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 48px rgba(194,24,91,0.09)',
        padding: 'clamp(24px, 5vw, 48px)',
        width: '100%',
        maxWidth: '560px',
        border: '1px solid #f3e0e6',
      }}>
        <h2 style={{ fontSize: '22px', color: '#C2185B', marginBottom: '6px' }}>Contact Us</h2>
        <p style={{ color: '#7B4F5E', fontSize: '14px', marginBottom: '28px' }}>All fields marked with * are required</p>
        <ContactForm />
      </div>

      {/* Footer note */}
      <p style={{ marginTop: '32px', color: '#b89aa4', fontSize: '13px', textAlign: 'center' }}>
        🌸 She Can Foundation — Inspiring change, one woman at a time
      </p>
    </main>
  )
}