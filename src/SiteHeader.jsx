import logo from './assets/logo-header.png'

export default function SiteHeader({ overlay = false }) {
  return <header className={`masthead${overlay ? '' : ' masthead--page'}`} aria-label="Primary navigation">
    <a className="wordmark" href="/" aria-label="the thinkstudios home"><img src={logo} alt="the thinkstudios" /></a>
    <nav className="nav-links" aria-label="Primary links"><a href="/meet-karthik">Meet Karthik</a><a href="/#films">Gallery</a><a className="nav-links__book" href="/contact">Book us now</a></nav>
  </header>
}
