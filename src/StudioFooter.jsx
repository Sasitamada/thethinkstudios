import logo from './assets/logo-header.png'

export default function StudioFooter() {
  return (
      <footer className="studio-footer" id="contact">
        <img className="studio-footer__logo" src={logo} alt="the thinkstudios" />
        <div className="studio-footer__main">
          <div className="studio-footer__brand">
            <p>We create emotional, cinematic wedding stories in India and beyond. Based in Visakhapatnam, the thinkstudios captures the people, moments, and feelings that make your celebration yours. Wedding cinematography with heart, crafted to be remembered.</p>
            <div className="studio-footer__direct">
              <a href="mailto:hello@thethinkstudios.com">hello@thethinkstudios.com</a>
              <a href="tel:+917675955990">+91 7675955990</a>
            </div>
          </div>
          <div className="studio-footer__groups">
            <nav className="studio-footer__column" aria-label="Footer navigation">
              <h2>[Navigation]</h2>
              <a href="/meet-karthik">Meet Karthik</a>
              <a href="/#films">Gallery</a>
              <a href="/#journal">Journal</a>
              <a href="/contact">Contact us</a>
            </nav>
            <div className="studio-footer__column">
              <h2>[Studio]</h2>
              <span>Visakhapatnam</span>
              <span>India &amp; beyond</span>
              <a href="/#films">Wedding films</a>
            </div>
            <nav className="studio-footer__column" aria-label="Studio contacts">
              <h2>[Contacts]</h2>
              <a href="mailto:hello@thethinkstudios.com">Email</a>
              <a href="https://wa.me/917675955990" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="/#films">Wedding films</a>
              <a href="https://www.instagram.com/the_thinkstudios/" target="_blank" rel="noopener noreferrer">Instagram</a>
            </nav>
            <div className="studio-footer__column">
              <h2>[Office hours]</h2>
              <span>Monday to Friday</span>
              <span>10:00 am to 6:00 pm</span>
            </div>
          </div>
        </div>
        <p className="studio-footer__copyright">Copyright 2026. the_thinkstudios. All rights reserved.</p>
      </footer>
  )
}
