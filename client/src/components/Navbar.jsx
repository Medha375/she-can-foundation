import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('scf_token')

  const logout = () => {
    localStorage.removeItem('scf_token')
    navigate('/')
  }

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #f3e0e6',
      padding: '0 32px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(194,24,91,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '22px' }}>🌸</span>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#C2185B' }}>
          She Can Foundation
        </span>
      </Link>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {token ? (
          <>
            <Link to="/admin" style={{ color: '#C2185B', fontWeight: 500, fontSize: '14px' }}>Admin Panel</Link>
            <button onClick={logout} style={{ background: 'none', border: '1.5px solid #C2185B', borderRadius: '8px', color: '#C2185B', padding: '6px 16px', fontSize: '14px' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#C2185B', fontWeight: 500, fontSize: '14px' }}>Admin Login</Link>
        )}
      </div>
    </nav>
  )
}