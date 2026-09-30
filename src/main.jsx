import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MeetKarthik from './MeetKarthik.jsx'
import ContactPage from './ContactPage.jsx'

const isMeetPage = window.location.pathname.replace(/\/$/, '') === '/meet-karthik'
const isContactPage = window.location.pathname.replace(/\/$/, '') === '/contact'
if (isContactPage) document.title = 'Contact | the thinkstudios'
if (isMeetPage) document.title = 'Meet Karthik | the thinkstudios'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMeetPage ? <MeetKarthik /> : isContactPage ? <ContactPage /> : <App />}
  </StrictMode>,
)
