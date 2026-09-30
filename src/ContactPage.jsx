import SiteHeader from './SiteHeader'
import EnquiryForm from './EnquiryForm'
import StudioFooter from './StudioFooter'
import './MeetKarthik.css'

export default function ContactPage() {
  return <main className="site-shell contact-page">
    <SiteHeader page="contact" />
    <EnquiryForm />
    <StudioFooter />
  </main>
}
