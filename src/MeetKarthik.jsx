import logo from './assets/logo-header.png'
import './MeetKarthik.css'

export default function MeetKarthik() {
  return <main className="site-shell meet-page">
    <header className="meet-nav"><a href="/" aria-label="the thinkstudios home"><img src={logo} alt="the thinkstudios" /></a><nav aria-label="Primary navigation"><a href="/">[ Home ]</a><a href="/#enquiry">[ Get in touch ]</a></nav></header>
    <section className="meet-intro" aria-labelledby="meet-title"><div><p className="meet-eyebrow">The thinkstudios</p><h1 id="meet-title">Meet<br /><em>Karthik.</em></h1><p className="meet-lead">Let’s talk about your story.</p><p>Every celebration has its own rhythm. Share the people, places, and moments that matter to you, and let’s plan how to capture your day.</p><a className="meet-cta" href="/#enquiry">Tell us about your celebration ↗</a></div><figure><img src="/optimized/hero-dsc-9338.jpg" alt="A wedding photograph from the thinkstudios portfolio" /><figcaption>Stories through the thinkstudios lens.</figcaption></figure></section>
    <section className="meet-approach"><p className="meet-eyebrow">Our approach</p><h2>Real feeling.<br />Beautifully composed.</h2><div><p>At the thinkstudios, our photography and wedding films follow the laughter, quiet connections, and once-in-a-lifetime moments that make a celebration yours.</p><p>From an intimate pre-wedding shoot to a wedding surrounded by family, the conversation starts with what you want to remember.</p></div></section>
    <footer className="meet-footer"><a href="/">← Back to home</a><a href="mailto:hello@thethinkstudios.com">hello@thethinkstudios.com</a><a href="https://www.instagram.com/the_thinkstudios/" target="_blank" rel="noreferrer">Instagram ↗</a></footer>
  </main>
}
