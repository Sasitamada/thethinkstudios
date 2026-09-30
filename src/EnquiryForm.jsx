import { useState } from 'react'
import { localToday, validateEnquiry } from './enquiryValidation'
import './EnquiryForm.css'

const initialValues = { name: '', phone: '', date: '', location: '', events: '', message: '' }

export default function EnquiryForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const change = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    setStatus('')
    if (errors[name]) setErrors({ ...errors, [name]: validateEnquiry(next)[name] })
  }
  const blur = (event) => {
    const name = event.target.name
    setErrors((previous) => ({ ...previous, [name]: validateEnquiry(values)[name] }))
  }
  const fieldProps = (name) => ({
    id: `enquiry-${name}`, name, value: values[name], onChange: change, onBlur: blur,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `enquiry-${name}-error` : undefined,
  })
  const error = (name) => errors[name] && <span className="enquiry-error" id={`enquiry-${name}-error`}>{errors[name]}</span>
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validateEnquiry(values)
    setErrors(nextErrors)
    const first = Object.keys(nextErrors)[0]
    if (first) {
      document.getElementById(`enquiry-${first}`).focus()
      setStatus('Please check the highlighted fields.')
      return
    }
    const body = `*WEBSITE CLIENT ENQUIRY — THE THINKSTUDIOS*\n\nHello! We would love to enquire about photography and films for our celebration.\n\n*Your names:* ${values.name.trim()}\n*Phone number:* ${values.phone.trim()}\n*Wedding date:* ${values.date ? new Date(values.date + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not decided yet'}\n*Wedding city / destination:* ${values.location.trim() || 'Not decided yet'}\n*Celebration or events:* ${values.events.trim() || 'To be discussed'}\n\n*A little about our plans:*\n${values.message.trim() || 'We would love to discuss our plans with you.'}\n\nPlease share your availability, collections, and the next steps. Thank you!`
    window.location.href = `https://wa.me/917675955990?text=${encodeURIComponent(body)}`
    setStatus('Continue in WhatsApp and send your message to complete your enquiry.')
  }

  return <section className="enquiry" id="enquiry" aria-labelledby="enquiry-title">
    <div className="enquiry-heading">
      <p className="enquiry-eyebrow">Private commissions</p>
      <h2 id="enquiry-title">Tell us about<br />your<br />celebration.</h2>
      <p>We would be delighted to hear what you are planning. Please share a few details below and we will be in touch regarding availability, collections and next steps.</p>
      <nav className="enquiry-links" aria-label="Contact the studio">
        <a href="https://wa.me/917675955990" target="_blank" rel="noreferrer">WhatsApp ↗</a>
        <a href="tel:+917675955990">Call ↗</a>
        <a href="https://www.instagram.com/the_thinkstudios/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href="mailto:hello@thethinkstudios.com">Email ↗</a>
      </nav>
    </div>
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="enquiry-field"><label className="enquiry-sr" htmlFor="enquiry-name">Your names (required)</label><input {...fieldProps('name')} autoComplete="name" required maxLength={80} placeholder="Your names *" />{error('name')}</div>
      <div className="enquiry-field"><label className="enquiry-sr" htmlFor="enquiry-phone">Phone number (required)</label><input {...fieldProps('phone')} type="tel" autoComplete="tel" required maxLength={25} placeholder="Phone number *" />{error('phone')}</div>
      <div className="enquiry-field enquiry-date"><label htmlFor="enquiry-date">Wedding date</label><input {...fieldProps('date')} type="date" min={localToday()} aria-label="Wedding date (optional)" />{error('date')}</div>
      <div className="enquiry-field"><label className="enquiry-sr" htmlFor="enquiry-location">Wedding city / destination</label><input {...fieldProps('location')} maxLength={120} placeholder="Wedding city / destination" />{error('location')}</div>
      <div className="enquiry-field"><label className="enquiry-sr" htmlFor="enquiry-events">Celebration or events</label><input {...fieldProps('events')} maxLength={200} placeholder="Celebration or events" />{error('events')}</div>
      <div className="enquiry-field"><label className="enquiry-sr" htmlFor="enquiry-message">A little about your plans</label><textarea {...fieldProps('message')} rows={4} maxLength={1500} placeholder="A little about your plans" />{error('message')}</div>
      <div className="enquiry-actions"><button className="enquiry-submit" type="submit">Send enquiry ↗</button><p className="enquiry-hint">Your details will open in WhatsApp so we can continue the conversation personally.</p></div>
      <p className="enquiry-status" role="status">{status}</p>
    </form>
  </section>
}
