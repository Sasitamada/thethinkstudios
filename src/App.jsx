import { useEffect, useState } from 'react'
import logo from './assets/logo-header.png'
import footerLogo from './assets/logo.png'
import './App.css'

const icons = {
  menu:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lbnUtaWNvbiBsdWNpZGUtbWVudSI+PHBhdGggZD0iTTQgNWgxNiIvPjxwYXRoIGQ9Ik00IDEyaDE2Ii8+PHBhdGggZD0iTTQgMTloMTYiLz48L3N2Zz4=',
  search:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlYXJjaC1pY29uIGx1Y2lkZS1zZWFyY2giPjxwYXRoIGQ9Im0yMSAyMS00LjM0LTQuMzQiLz48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PC9zdmc+',
  close:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXgtaWNvbiBsdWNpZGUteCI+PHBhdGggZD0iTTE4IDYgNiAxOCIvPjxwYXRoIGQ9Im02IDYgMTIgMTIiLz48L3N2Zz4=',
  left:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdC1pY29uIGx1Y2lkZS1jaGV2cm9uLWxlZnQiPjxwYXRoIGQ9Im0xNSAxOC02LTYgNi02Ii8+PC9zdmc+',
  right:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg==',
  phone:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBob25lLWljb24gbHVjaWRlLXBob25lIj48cGF0aCBkPSJNMTMuODMyIDE2LjU2OGExIDEgMCAwIDAgMS4yMTMtLjMwM2wuMzU1LS40NjVBMiAyIDAgMCAxIDE3IDE1aDNhMiAyIDAgMCAxIDIgMnYzYTIgMiAwIDAgMS0yIDJBMTggMTggMCAwIDEgMiA0YTIgMiAwIDAgMSAyLTJoM2EyIDIgMCAwIDEgMiAydjNhMiAyIDAgMCAxLS44IDEuNmwtLjQ2OC4zNTFhMSAxIDAgMCAwLS4yOTIgMS4yMzMgMTQgMTQgMCAwIDAgNi4zOTIgNi4zODQiLz48L3N2Zz4=',
  instagram:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjUiIHJ5PSI1Ii8+PHBhdGggZD0iTTE2IDExLjk0QTQgNCAwIDEgMSAxMi4wNiA4IDQgNCAwIDAgMSAxNiAxMS45NHoiLz48bGluZSB4MT0iMTcuNSIgeTE9IjYuNSIgeDI9IjE3LjUxIiB5Mj0iNi41Ii8+PC9zdmc+',
  youtube:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjIiIHk9IjYiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMiIgcng9IjMiLz48cG9seWdvbiBwb2ludHM9IjEwIDE1IDE2IDEyIDEwIDkiIGZpbGw9ImN1cnJlbnRDb2xvciIgc3Ryb2tlPSJub25lIi8+PC9zdmc+',
  facebook:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOCAySDZhNCA0IDAgMCAwLTQgNHYxMmE0IDQgMCAwIDAgNCA0aDZ2LTdoLTJ2LTNoMlY5LjVhMy41IDMuNSAwIDAgMSAzLjUtMy41SDE4djNoLTIuNWEuNS41IDAgMCAwLS41LjV2MkgxOHYzaC0zVjIyaDNhNCA0IDAgMCAwIDQtNFY2YTQgNCAwIDAgMC00LTR6IiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0ibm9uZSIvPjwvc3ZnPg==',
  home:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Im0zIDExIDktOSA5IDkiLz48cGF0aCBkPSJNNCAxMHYxMGEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWMTAiLz48cGF0aCBkPSJNOSAyMnYtNmg2djYiLz48L3N2Zz4=',
  journal:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00IDE5LjVBNi41IDYuNSAwIDAgMSAxMC41IDEzSDIwIi8+PHBhdGggZD0iTTQgNGEyIDIgMCAwIDEgMi0yaDExdjE4SDYuNWEyLjUgMi41IDAgMCAxIDAtNUgyMCIvPjxwYXRoIGQ9Ik04IDdoNiIvPjxwYXRoIGQ9Ik04IDEwaDYiLz48L3N2Zz4=',
  book:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSAyMUg3YTIgMiAwIDAgMS0yLTJWNWExIDEgMCAwIDEgMS0xaDE0YTEgMSAwIDAgMSAxIDF2MTQiLz48cGF0aCBkPSJNNSA3aDE0Ii8+PC9zdmc+',
  film:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjIiIHk9IjMiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxOCIgcng9IjIiLz48cGF0aCBkPSJNNyAzVjIxIi8+PHBhdGggZD0iTTE3IDNWMjEiLz48cGF0aCBkPSJNMiA4aDUiLz48cGF0aCBkPSJNMiAxNmg1Ii8+PHBhdGggZD0iTTE3IDhoNSIvPjxwYXRoIGQ9Ik0xNyAxNmg1Ii8+PC9zdmc+',
  clock:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDZ2Nmw0IDIiLz48L3N2Zz4=',
  map:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4taWNvbiBsdWNpZGUtbWFwLXBpbiI+PHBhdGggZD0iTTIwIDEwYzAgNC45OTMtNS41MzkgMTAuMTkzLTcuMzk5IDExLjc5OWExIDEgMCAwIDEtMS4yMDIgMEM5LjUzOSAyMC4xOTMgNCAxNC45OTMgNCAxMGE4IDggMCAwIDEgMTYgMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48L3N2Zz4=',
}

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

const heroSlides = [
  {
    src: '/optimized/hero-dsc-9338.jpg',
    alt: 'Wedding portrait from the thinkstudios hero story',
  },
  {
    src: '/optimized/hero-dsc-9329.jpg',
    alt: 'Cinematic wedding frame from the thinkstudios hero story',
  },
  {
    src: '/optimized/hero-12.jpg',
    alt: 'Wedding couple portrait from the thinkstudios hero story',
  },
  {
    src: '/optimized/hero-14.jpg',
    alt: 'Warm evening wedding frame from the thinkstudios hero story',
  },
  {
    src: '/optimized/hero-raw-04.jpg',
    alt: 'Editorial wedding photograph from the thinkstudios hero story',
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
    alt: 'Wedding frame from a recent public gallery upload',
  },
  {
    src: '/optimized/gallery-14-3.jpg',
    alt: 'Portrait moment from a newly added celebration story',
  },
  {
    src: '/optimized/gallery-15-3.jpg',
    alt: 'Couple frame from the thinkstudios public archive',
  },
  {
    src: '/optimized/gallery-16.jpg',
    alt: 'Event portrait from the public gallery archive',
  },
  {
    src: '/optimized/gallery-dsc-9271.jpg',
    alt: 'Wedding still from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9318.jpg',
    alt: 'Ceremony frame from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9329.jpg',
    alt: 'Editorial wedding portrait from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9335.jpg',
    alt: 'Documentary wedding moment from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9338.jpg',
    alt: 'Candid celebration photo from the DSC archive set',
  },
  {
    src: '/optimized/gallery-dsc-9346.jpg',
    alt: 'Wedding portrait from the DSC archive set',
  },
]

const menuItems = [
  {
    href: 'https://www.instagram.com/the_thinkstudios/',
    label: 'Instagram',
    icon: 'instagram',
    external: true,
  },
  { href: '#top', label: 'Home', icon: 'home' },
  { href: '#journal', label: 'Journal', icon: 'journal' },
  { href: '#book', label: 'Book us now', icon: 'book' },
  { href: '#films', label: 'Wedding Films', icon: 'film' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % heroSlides.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [])

  const handlePrevSlide = () => {
    setCurrentSlide((slide) => (slide - 1 + heroSlides.length) % heroSlides.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((slide) => (slide + 1) % heroSlides.length)
  }

  return (
    <main className="site-shell">
      <header className="masthead" aria-label="Primary navigation">
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src={icons.menu} alt="" />
        </button>

        <a className="wordmark" href="#top" aria-label="the thinkstudios home">
          <img src={logo} alt="the thinkstudios" />
        </a>

        <nav className="social-nav" aria-label="Social links">
          <a
            className="social-icon-link"
            href="https://www.instagram.com/the_thinkstudios/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img src={icons.instagram} alt="" />
          </a>
          <a className="social-icon-link" href="#films" aria-label="Wedding films">
            <img src={icons.youtube} alt="" />
          </a>
          <a
            className="social-icon-link"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img src={icons.facebook} alt="" />
          </a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-frame">
          <img
            src={heroSlides[currentSlide].src}
            alt={heroSlides[currentSlide].alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <button
            className="hero-arrow prev"
            type="button"
            aria-label="Previous story"
            onClick={handlePrevSlide}
          >
            <img src={icons.left} alt="" />
          </button>
          <button
            className="hero-arrow next"
            type="button"
            aria-label="Next story"
            onClick={handleNextSlide}
          >
            <img src={icons.right} alt="" />
          </button>
        </div>

        <div className="filmstrip" aria-label="Selected wedding stories">
          {heroSlides.map((image, index) => (
            <button
              key={image.src}
              className={`filmstrip-item ${index === currentSlide ? 'active' : ''}`}
              type="button"
              aria-label={`Open story ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
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
        <a className="primary-link" href="#book">
          Book us now
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
          <h2>Newly added frames now live on the site.</h2>
        </div>
        <div className="public-stories-grid">
          {publicStories.map((image) => (
            <figure key={image.src} className="public-story">
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="awards editorial">
        <p className="eyebrow">Award winning approach</p>
        <h2>Our work is designed for couples who want their wedding to feel like cinema, not a checklist.</h2>
        <div className="badge-row" aria-label="Studio values">
          <span>Emotion</span>
          <span>Story</span>
          <span>Light</span>
          <span>Sound</span>
          <span>Legacy</span>
          <span>And more</span>
        </div>
      </section>

      <section className="journal" id="journal">
        <p className="eyebrow">Featured on the journal</p>
        <h2>On the importance of real moments</h2>
        <div className="journal-list">
          {journal.map((item) => (
            <a href="#book" key={item}>
              {item}
            </a>
          ))}
        </div>
      </section>

      <section className="booking" id="book">
        <h2>Be the star in your own story.</h2>
        <a className="book-button" href="mailto:hello@thethinkstudios.com?subject=Wedding%20film%20enquiry">
          Book us now
        </a>
        <div className="footer-social">
          <a href="https://www.instagram.com/the_thinkstudios/" target="_blank">
            Instagram
          </a>
          <a href="#films">Films</a>
        </div>
        <p>Made with love, in India</p>
      </section>

      <footer className="site-footer">
        <section className="footer-main">
          <div className="footer-brand-column">
            <div className="footer-brand-lockup">
              <img src={footerLogo} alt="the thinkstudios" />
              <div className="footer-brand-text">
                <strong>the thinkstudios</strong>
              </div>
            </div>
            <div className="footer-social-icons">
              <a
                className="footer-icon-link"
                href="https://www.instagram.com/the_thinkstudios"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src={icons.instagram} alt="" />
              </a>
              <a className="footer-icon-link" href="#films" aria-label="Wedding films">
                <img src={icons.youtube} alt="" />
              </a>
              <a
                className="footer-icon-link"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <img src={icons.facebook} alt="" />
              </a>
            </div>
          </div>

          <div className="footer-column footer-detail-column">
            <p className="footer-label">Our Location</p>
            <p className="footer-copy">
              Visakhapatnam
            </p>
            <a className="footer-contact footer-contact-icon" href="tel:+917675955990">
              <img src={icons.phone} alt="" />
              +91 7675955990
            </a>
            <p className="footer-contact">thethinkstudios.com</p>
          </div>

          <div className="footer-column footer-detail-column">
            <p className="footer-label">Office Hours</p>
            <p className="footer-meta">Monday to Friday</p>
            <p className="footer-meta">
              <img src={icons.clock} alt="" />
              10:00 am to 6:00 pm
            </p>
            <p className="footer-meta">
              <img src={icons.map} alt="" />
              Visakhapatnam office
            </p>
          </div>

          <div className="footer-column footer-links-column">
            <p className="footer-label">Quick Links</p>
            <nav className="footer-stack-links" aria-label="Footer quick links">
              <a href="#experience">About</a>
              <a href="#book">Book us now</a>
              <a href="#films">Wedding films</a>
            </nav>
            <a className="footer-book" href="#book">
              Contact Studio
            </a>
          </div>
        </section>

        <div className="footer-bottom">
          <p>Copyright 2026. the_thinkstudios. All rights reserved.</p>
          <nav className="footer-links" aria-label="Footer links">
            <a href="#experience">About</a>
            <a href="#book">Book us now</a>
            <a href="#films">Wedding films</a>
          </nav>
          <p>Wedding cinematography with heart, crafted in Vishakhapatnam.</p>
        </div>
      </footer>

      <aside className={`menu-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-drawer-inner">
          <div className="menu-drawer-top">
            <button
              className="drawer-close"
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <img src={icons.close} alt="" />
            </button>
            <a className="drawer-logo" href="#top" onClick={() => setMenuOpen(false)}>
              <img src={logo} alt="the thinkstudios" />
            </a>
          </div>
          <nav>
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <img src={icons[item.icon]} alt="" />
                {item.label}
              </a>
            ))}
          </nav>
          <a className="drawer-instagram" href="https://www.instagram.com/the_thinkstudios/" target="_blank" rel="noreferrer">
            Visit Instagram
          </a>
        </div>
      </aside>
    </main>
  )
}

export default App
