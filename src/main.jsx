import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MeetKarthik from './MeetKarthik.jsx'

const isMeetPage = window.location.pathname.replace(/\/$/, '') === '/meet-karthik'
if (isMeetPage) document.title = 'Meet Karthik | the thinkstudios'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMeetPage ? <MeetKarthik /> : <App />}
  </StrictMode>,
)
