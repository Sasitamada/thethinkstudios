import { useEffect, useState } from 'react'
import SiteHeader from './SiteHeader'
import './App.css'
import WeddingAlbums from './WeddingAlbums'
import EnquiryForm from './EnquiryForm'
import StudioFooter from './StudioFooter'

const gallery = [
  {
    src: '/optimized/hero-raw-04.jpg',
    alt: 'Cinematic wedding portrait by the thinkstudios',
  },
  {
    src: '/optimized/gallery-02.jpg',
    alt: 'Wedding story photographed by the thinkstudios',
  },
  {
    src: '/optimized/gallery-03.jpg',
    alt: 'Elegant wedding moment by the thinkstudios',
  },
  {
    src: '/optimized/gallery-08.jpg',
    alt: 'Wedding couple captured in an editorial frame',
  },
  {
    src: '/optimized/gallery-06.jpg',
    alt: 'Destination wedding celebration by the thinkstudios',
  },
]

const journal = [
  'Anjali & Rohan: Rain, vows, and the after-party',
  'Meera & Kabir: A palace morning in Jaipur',
  'Nisha & Arjun: One take, one lifetime',
  'Behind the frame: Why real moments still win',
]

const recentFrames = [
  {
    src: '/optimized/gallery-img-1367.jpg',
    alt: 'Wedding portrait by the thinkstudios from a recent celebration',
  },
  {
    src: '/optimized/gallery-img-1362.jpg',
    alt: 'Couple frame by the thinkstudios in natural light',
  },
  {
    src: '/optimized/gallery-img-1365.jpg',
    alt: 'Editorial vertical portrait by the thinkstudios',
  },
]

const publicStories = [
  {
    src: '/optimized/gallery-03-3.jpg',
    title: 'A celebration of love',
    alt: 'Wedding frame from a recent public gallery upload',
  },
  {
    src: '/optimized/gallery-14-3.jpg',
    title: 'Together, always',
    alt: 'Portrait moment from a newly added celebration story',
  },
  {
    src: '/optimized/gallery-15-3.jpg',
    title: 'Just the two of you',
    alt: 'Couple frame from the thinkstudios public archive',
  },
  {
    src: '/optimized/gallery-16.jpg',
    title: 'Joy in every frame',
    alt: 'Event portrait from the public gallery archive',
  },
  {
    src: '/optimized/gallery-dsc-9271.jpg',
    title: 'Promises & traditions',
    alt: 'Wedding still from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9318.jpg',
    title: 'The wedding ceremony',
    alt: 'Ceremony frame from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9329.jpg',
    title: 'Timeless portraits',
    alt: 'Editorial wedding portrait from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9335.jpg',
    title: 'Moments that matter',
    alt: 'Documentary wedding moment from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9338.jpg',
    title: 'The wedding story',
    alt: 'Candid celebration photo from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9346.jpg',
    title: 'Forever in a frame',
    alt: 'Wedding portrait from the DSC archive set',
  },
]


const progressSegments = [
  14, 14, 14, 14, 20, 30, 20, 14, 14, 14, 14, 14,
  14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
]

function ScrollProgress({ side, activeIndex }) {
  return (
    <div
      className={`scroll-progress scroll-progress--${side}`}
      aria-hidden="true"
    >
      {progressSegments.map((_, index) => (
        <span
          key={`${side}-${index}`}
          className={`scroll-progress__seg ${index === activeIndex ? 'is-active' : ''}`}
          style={{ '--seg-w': `${index === activeIndex ? 30 : Math.abs(index - activeIndex) === 1 ? 20 : 14}px` }}
        />
      ))}
    </div>
  )
}

const introLines = ['Your wedding is a feeling.', 'We frame it to last forever.']
const introWordCount = introLines.join(' ').split(' ').length

function HomeIntro() {
  const [visible, setVisible] = useState(() => !window.location.hash)
  const [wordCount, setWordCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timers = []
    const finish = () => setVisible(false)
    for (let index = 1; index <= introWordCount; index += 1) {
      timers.push(window.setTimeout(() => setWordCount(index), reducedMotion ? 0 : 300 + index * 160))
    }
    const leaveAt = reducedMotion ? 1000 : 300 + introWordCount * 160 + 700
    timers.push(window.setTimeout(() => setLeaving(true), leaveAt))
    timers.push(window.setTimeout(finish, leaveAt + (reducedMotion ? 0 : 300)))
    const onKeyDown = (event) => {
      if (event.key === 'Escape') finish()
      if (event.key === 'Tab') event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      timers.forEach(window.clearTimeout)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [visible])

  if (!visible) return null
  const firstLineCount = introLines[0].split(' ').length
  return (
    <div className={`home-intro${leaving ? ' is-leaving' : ''}`} id="homeIntro" aria-label={introLines.join(' ')} role="status">
      <p className="home-intro__text" aria-hidden="true">
        {introLines.map((line, index) => {
          const count = Math.max(0, wordCount - (index === 0 ? 0 : firstLineCount))
          return <span className="home-intro__line" key={line}>
            {line.split(' ').slice(0, count).join(' ')}
            {((index === 0 && wordCount <= firstLineCount) || (index === 1 && wordCount > firstLineCount)) && <span className="home-intro__cursor" />}
          </span>
        })}
      </p>
    </div>
  )
}

function App() {
  const [activeProgressIndex, setActiveProgressIndex] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0
      setActiveProgressIndex(Math.round(Math.max(0, Math.min(1, progress)) * (progressSegments.length - 1)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    const observer = new ResizeObserver(updateProgress)
    observer.observe(document.body)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      observer.disconnect()
    }
  }, [])

  return (
    <main className="site-shell">
      <HomeIntro />
      <ScrollProgress side="left" activeIndex={activeProgressIndex} />
      <ScrollProgress side="right" activeIndex={activeProgressIndex} />

      <SiteHeader overlay />

      <section className="hero-section" id="top" aria-label="Wedding cinematography">
        <div className="hero-frame">
          <video
            className="hero__video"
            src="/ROOPA%20RAJ%20PRE%20WEDDING%20VIDEO_1.mp4"
            poster="/optimized/hero-dsc-9338.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="hero__overlay" aria-hidden="true" />
          <p className="hero__label">Wedding films &amp;<br />photography</p>
          <h1 className="hero__title">Be the star<br />in your own<br />story.</h1>
          <p className="hero__description">
            Stories shaped by emotion, atmosphere, and the truth of the moment.
            Wedding films and photographs, in India and beyond.
          </p>
          <a className="hero__link" href="#films">Explore our films <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="home-film" aria-labelledby="home-film-title">
        <div className="home-film__heading"><p>Through our lens</p><h2 id="home-film-title">A moment. A feeling. A film.</h2></div>
        <video src="/sasi.mp4" autoPlay muted loop playsInline preload="auto" aria-label="Featured film by the thinkstudios" />
      </section>

      <section className="intro editorial">
        <p className="eyebrow">Wedding films rooted in feeling</p>
        <h1>Be the star in your own story.</h1>
        <p>
          <strong>the_thinkstudios</strong> creates elegant wedding films and
          photographs shaped by emotion, atmosphere, and the truth of the moment.
          We follow the laughter, the quiet hands, the family chaos, and the
          once-in-a-lifetime glow.
        </p>
        <a className="primary-link" href="/contact">
          Contact us
        </a>
      </section>

      <section className="stats-row" aria-label="Studio highlights">
        <article>
          <strong>Wedding Cinematographer</strong>
          <span>Films with polish, pace, and heart.</span>
        </article>
        <article>
          <strong>India and beyond</strong>
          <span>Destination-ready teams for intimate and grand celebrations.</span>
        </article>
        <article>
          <strong>Editorial craft</strong>
          <span>Clean frames, honest emotion, cinematic sound design.</span>
        </article>
      </section>

      <section className="experience" id="experience">
        <div>
          <p className="eyebrow">The experience</p>
          <h2>Over every ritual, every glance, every impossible-to-repeat second.</h2>
        </div>
        <p>
          From the first call to the final film, we plan the shoot with the care
          your wedding deserves. Our presence is calm, our direction is gentle,
          and our edits are built to feel timeless long after the music fades.
        </p>
      </section>

      <WeddingAlbums />

      <section className="featured-films" id="films" aria-label="Wedding film gallery">
        <div className="featured-films-copy">
          <p className="eyebrow">Featured films</p>
          <h2>Real moments. Beautifully composed.</h2>
          <a className="primary-link" href="https://www.instagram.com/the_thinkstudios/" target="_blank" rel="noreferrer">
            View Instagram
          </a>
        </div>
        <div className="featured-films-grid">
          <figure className="featured-film">
            <img src={gallery[1].src} alt={gallery[1].alt} loading="lazy" decoding="async" />
          </figure>
          <figure className="featured-film">
            <img src={gallery[2].src} alt={gallery[2].alt} loading="lazy" decoding="async" />
          </figure>
          <figure className="featured-film">
            <img src={gallery[3].src} alt={gallery[3].alt} loading="lazy" decoding="async" />
          </figure>
          <figure className="featured-film">
            <img src={gallery[4].src} alt={gallery[4].alt} loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="recent-frames" aria-label="Recent wedding frames">
        <div className="recent-frames-copy">
          <p className="eyebrow">Fresh from the frame</p>
          <h2>More stories from the public gallery.</h2>
        </div>
        <div className="recent-frames-grid">
          {recentFrames.map((image) => (
            <figure key={image.src} className="recent-frame">
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="public-stories" aria-label="More public gallery stories">
        <div className="public-stories-copy">
          <p className="eyebrow">More from the archive</p>
          <h2>Real moments.<br />Stories to <em>remember.</em></h2>
        </div>
        <div className="public-stories-grid">
          {publicStories.map((image) => (
            <figure key={image.src} className="public-story">
              <div className="public-story__image">
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </div>
              <figcaption className="public-story__caption">{image.title}</figcaption>
              <span className="public-story__corners" aria-hidden="true"><i /><i /><i /><i /></span>
            </figure>
          ))}
        </div>
      </section>

      <section className="awards editorial">
        <p className="eyebrow">Award winning approach</p>
        <h2>Our work is designed for couples who want their wedding to feel like cinema, not a checklist.</h2>
        <div className="approach-list" aria-label="Studio values">
          <div className="approach-row"><h3>Emotion &amp; story</h3><p>Honest moments, quiet connections, and the joy of your day, woven into a story that feels like you.</p></div>
          <div className="approach-row"><h3>Light &amp; sound</h3><p>Thoughtfully composed frames and cinematic sound bring every ritual, glance, and celebration to life.</p></div>
          <div className="approach-row"><h3>Legacy &amp; more</h3><p>Wedding films and photographs crafted to be revisited, shared, and remembered for generations.</p></div>
        </div>
      </section>

      <section className="journal" id="journal">
        <p className="eyebrow">Featured on the journal</p>
        <h2>On the importance of real moments</h2>
        <div className="journal-list">
          {journal.map((item) => (
            <a href="/contact" key={item}>
              {item}
            </a>
          ))}
        </div>
      </section>

      <section className="booking" id="book">
        <h2>Be the star in your own story.</h2>
        <a className="book-button" href="/contact">
          Contact us
        </a>
        <div className="footer-social">
          <a href="https://www.instagram.com/the_thinkstudios/" target="_blank">
            Instagram
          </a>
          <a href="#films">Films</a>
        </div>
        <p>Made with love, in India</p>
      </section>

      <EnquiryForm />

      <StudioFooter />


    </main>
  )
}

export default App
