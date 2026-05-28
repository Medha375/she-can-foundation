import { useState } from 'react'
import axios from 'axios'
import SuccessMessage from './SuccessMessage'

export default function ContactForm() {
  const [form, setForm]         = useState({ name: '', email: '', message: '' })
  const [errors, setErrors]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim())             e.name    = 'Name is required'
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = 'Enter a valid email'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')
    try {
      await axios.post('http://localhost:5000/api/contact', form)
      setSubmitted(true)
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return <SuccessMessage onReset={() => { setSubmitted(false); setForm({ name:'', email:'', message:'' }) }} />

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#7B4F5E', marginBottom: '6px' }}>
          Full Name *
        </label>
        <input
          name="name" placeholder="Priya Sharma"
          value={form.name} onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#7B4F5E', marginBottom: '6px' }}>
          Email Address *
        </label>
        <input
          name="email" type="email" placeholder="priya@example.com"
          value={form.email} onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#7B4F5E', marginBottom: '6px' }}>
          Message *
        </label>
        <textarea
          name="message" rows={5} placeholder="Write your message here..."
          value={form.message} onChange={handleChange}
          style={{ resize: 'vertical' }}
        />
        {errors.message && <p className="error-text">{errors.message}</p>}
      </div>

      {serverError && <p className="error-text" style={{ fontSize: '14px' }}>⚠️ {serverError}</p>}

      <button type="submit" className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
        {loading ? 'Submitting...' : 'Send Message →'}
      </button>
    </form>
  )
}
