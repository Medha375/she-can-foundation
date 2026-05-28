export default function SuccessMessage({ onReset }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 32px',
      animation: 'fadeIn 0.5s ease',
    }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>🌸</div>
      <h2 style={{ color: '#C2185B', marginBottom: '10px', fontSize: '26px' }}>
        Form Submitted Successfully!
      </h2>
      <p style={{ color: '#7B4F5E', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
        Thank you for reaching out. The She Can Foundation team will get back to you soon.
      </p>
      <button className="btn-primary" onClick={onReset}>
        Submit Another Message
      </button>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }`}</style>
    </div>
  )
}