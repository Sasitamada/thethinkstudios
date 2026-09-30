import logo from './assets/logo-header.png'

export default function SiteHeader({ overlay = false, page = 'home' }) {
  return <header className={`masthead${overlay ? '' : ' masthead--page'}`} aria-label="Primary navigation">
    <a className="wordmark" href="/" aria-label="the thinkstudios home"><img src={logo} alt="the thinkstudios" /></a>
    <nav className="nav-links" aria-label="Primary links">
      <a href={page === 'home' ? '/meet-karthik' : '/'}>{page === 'home' ? 'Meet Karthik' : 'Home'}</a>
      <a href="/#films">Gallery</a>
      <a className="nav-links__book" href={page === 'contact' ? '/meet-karthik' : '/contact'}>{page === 'contact' ? 'Meet Karthik' : 'Contact us'}</a>
    </nav>
  </header>
}
