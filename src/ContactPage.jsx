import logo from './assets/logo-header.png'
import EnquiryForm from './EnquiryForm'
import StudioFooter from './StudioFooter'
import './MeetKarthik.css'

export default function ContactPage() {
  return <main className="site-shell">
    <header className="meet-nav"><a href="/" aria-label="the thinkstudios home"><img src={logo} alt="the thinkstudios" /></a><nav aria-label="Primary navigation"><a href="/">[ Home ]</a><a href="/meet-karthik">[ Meet Karthik ]</a></nav></header>
    <EnquiryForm />
    <StudioFooter />
  </main>
}
