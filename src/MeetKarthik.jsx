import SiteHeader from './SiteHeader'
import './MeetKarthik.css'
import StudioFooter from './StudioFooter'

export default function MeetKarthik() {
  return <main className="site-shell meet-page">
    <SiteHeader page="meet" />
    <section className="meet-intro" aria-labelledby="meet-title"><div><p className="meet-eyebrow">The thinkstudios</p><h1 id="meet-title">Meet<br /><em>Karthik.</em></h1><p className="meet-lead">Photographer. Storyteller. Observer.</p><p>I’m Karthik, a photographer at the thinkstudios. I approach each wedding with a careful eye for light, connection, and the moments that unfold naturally. My aim is to create photographs that feel personal today and meaningful for years to come.</p><a className="meet-cta" href="/contact">Contact us ↗</a></div><figure><img src="/Screenshot%202026-10-01%20at%201.36.52%E2%80%AFAM.png" alt="Karthik holding his camera at a wedding celebration" /><figcaption>Karthik — the photographer behind the frame.</figcaption></figure></section>
    <section className="meet-approach"><p className="meet-eyebrow">My approach</p><h2>Real feeling.<br />Beautifully composed.</h2><div><p>I look for the small gestures as much as the grand celebrations: a reassuring hand, a shared smile, the energy of family coming together. These details give a wedding story its depth.</p><p>From pre-wedding portraits to the final celebration, my approach combines gentle direction with space for authentic moments. Thoughtful composition and a calm presence help you feel comfortable in front of the camera.</p></div></section>
    <StudioFooter />
  </main>
}
