import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('scf_token')

  const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { Authorization: `Bearer ${token}` },
  })

  const load = async () => {
    try {
      const { data } = await api.get('/api/contact')
      setSubmissions(data)
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('scf_token'); navigate('/login') }
      else setError('Failed to load submissions')
    } finally { setLoading(false) }
  }

  useEffect(() => { if (!token) { navigate('/login'); return } load() }, [])

  const markRead = async (id) => {
    await api.patch(`/api/contact/${id}/read`)
    setSubmissions(s => s.map(m => m._id === id ? { ...m, isRead: true } : m))
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this submission?')) return
    await api.delete(`/api/contact/${id}`)
    setSubmissions(s => s.filter(m => m._id !== id))
  }

  const unread = submissions.filter(s => !s.isRead).length

  if (loading) return <p style={{ textAlign: 'center', marginTop: '80px', color: '#C2185B' }}>Loading...</p>

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', color: '#C2185B' }}>Admin Panel</h1>
          <p style={{ color: '#7B4F5E', fontSize: '14px', marginTop: '4px' }}>
            {submissions.length} total · <strong>{unread}</strong> unread
          </p>
        </div>
        <span style={{ background: '#FCE4EC', color: '#C2185B', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 500 }}>
          🌸 She Can Foundation
        </span>
      </div>

      {error && <p style={{ color: '#c62828', marginBottom: '16px' }}>⚠️ {error}</p>}

      {submissions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px', color: '#b89aa4' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
          <p>No submissions yet.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {submissions.map(s => (
          <div key={s._id} style={{
            background: s.isRead ? '#fff' : '#FFF0F5',
            border: `1.5px solid ${s.isRead ? '#f3e0e6' : '#F48FB1'}`,
            borderRadius: '14px',
            padding: '20px 24px',
            boxShadow: s.isRead ? 'none' : '0 2px 12px rgba(194,24,91,0.08)',
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '16px', color: '#1A0A0E' }}>{s.name}</span>
                {!s.isRead && <span style={{ marginLeft: '8px', background: '#C2185B', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>NEW</span>}
                <p style={{ color: '#7B4F5E', fontSize: '13px', marginTop: '2px' }}>{s.email}</p>
              </div>
              <span style={{ fontSize: '12px', color: '#b89aa4' }}>{new Date(s.createdAt).toLocaleString()}</span>
            </div>
            <p style={{ color: '#3d2030', fontSize: '15px', lineHeight: 1.6, margin: '10px 0 16px', whiteSpace: 'pre-wrap' }}>{s.message}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!s.isRead && (
                <button onClick={() => markRead(s._id)} style={{ background: 'none', border: '1.5px solid #C2185B', color: '#C2185B', borderRadius: '8px', padding: '6px 14px', fontSize: '13px' }}>
                  Mark as Read
                </button>
              )}
              <button onClick={() => remove(s._id)} style={{ background: 'none', border: '1.5px solid #e0b0b0', color: '#c62828', borderRadius: '8px', padding: '6px 14px', fontSize: '13px' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}