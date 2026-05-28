import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', form)
      localStorage.setItem('scf_token', data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', padding: '32px 16px' }}>
      <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 4px 32px rgba(194,24,91,0.09)', padding: '40px', width: '100%', maxWidth: '400px', border: '1px solid #f3e0e6' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '40px' }}>🔐</span>
          <h2 style={{ fontSize: '24px', color: '#C2185B', margin: '8px 0 4px' }}>Admin Login</h2>
          <p style={{ color: '#7B4F5E', fontSize: '14px' }}>She Can Foundation</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#7B4F5E', marginBottom: '6px' }}>Username</label>
            <input name="username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="admin" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#7B4F5E', marginBottom: '6px' }}>Password</label>
            <input name="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
          </div>
          {error && <p className="error-text">⚠️ {error}</p>}
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '4px' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ fontSize: '12px', color: '#b89aa4', textAlign: 'center', marginTop: '20px' }}>
          Default: admin / shecan2024 (seed first)
        </p>
      </div>
    </main>
  )
}