export const services = ['Photography', 'Wedding film', 'Photography & wedding film', 'Pre-wedding shoot']

export function localToday() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function validateEnquiry(values, today = localToday()) {
  const errors = {}
  const name = values.name.trim()
  if (name.length < 2 || name.length > 80 || !/\p{L}/u.test(name)) errors.name = 'Please enter your names (2–80 characters).'
  const phone = values.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 10 || digits.length > 15) errors.phone = 'Enter a valid phone number with 10–15 digits.'
  if (values.date) {
    const date = new Date(`${values.date}T12:00:00`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || Number.isNaN(date.getTime()) || `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` !== values.date || values.date < today) errors.date = 'Choose today or a future date.'
  }
  const city = values.location.trim()
  if (city && (city.length < 2 || city.length > 120)) errors.location = 'Enter a city or destination (2–120 characters).'
  if (values.events.trim().length > 200) errors.events = 'Keep your event details within 200 characters.'
  if (values.message.trim().length > 1500) errors.message = 'Keep your plans within 1,500 characters.'
  return errors
}
