import { useEffect, useRef, useState } from 'react'
import './WeddingAlbums.css'

const albums = [
  { name: 'The wedding story', category: 'Weddings', images: ['gallery-02.jpg', 'gallery-03.jpg', 'gallery-06.jpg'], description: 'From the first ritual to the last embrace. A wedding story told through the people, the details, and the moments you will always want to return to.' },
  { name: 'Just the two of you', category: 'Portraits', images: ['gallery-img-1365.jpg', 'gallery-img-1362.jpg', 'gallery-img-1367.jpg'], description: 'A little space to be yourselves. Honest portraits, gentle direction, and the quiet connection that makes every frame unmistakably yours.' },
  { name: 'Promises & traditions', category: 'Ceremonies', images: ['gallery-dsc-9318.jpg', 'gallery-dsc-9271.jpg', 'gallery-dsc-9335.jpg'], description: 'The rituals that bring generations together. We follow the hands, the glances, and the emotion behind every promise.' },
  { name: 'A celebration of love', category: 'Celebrations', images: ['gallery-08.jpg', 'gallery-14-3.jpg', 'gallery-15-3.jpg'], description: 'The laughter, the family chaos, and the joy that fills the room. Photographs that bring you right back to how it all felt.' },
  { name: 'Forever in a frame', category: 'Editorial', images: ['gallery-dsc-9338.jpg', 'gallery-dsc-9329.jpg', 'gallery-dsc-9346.jpg'], description: 'Thoughtfully composed, rooted in real feeling. A collection of wedding portraits shaped by beautiful light and your own kind of love.' },
  { name: 'Let us tell your story', category: '', description: 'Every celebration has its own rhythm. Tell us about yours, and together we will create a photography and film experience that feels like you.' },
]

export default function WeddingAlbums() {
  const section = useRef(null)
  const track = useRef(null)
  const dialog = useRef(null)
  const [active, setActive] = useState(0)
  const [opened, setOpened] = useState(null)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    const update = () => {
      frame = 0
      if (!desktop.matches) {
        track.current.style.removeProperty('transform')
        return
      }
      const bounds = section.current.getBoundingClientRect()
      const distance = section.current.offsetHeight - window.innerHeight
      const progress = distance > 0 ? Math.max(0, Math.min(1, -bounds.top / distance)) : 0
      const position = progress * (albums.length - 1)
      const slide = track.current.firstElementChild
      const step = slide.offsetHeight + parseFloat(getComputedStyle(track.current).gap)
      track.current.style.transform = `translateY(${-position * step}px)`
      setActive(Math.round(position))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    desktop.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      desktop.removeEventListener('change', schedule)
    }
  }, [])

  useEffect(() => {
    if (opened === null) return
    const viewer = dialog.current
    const previousOverflow = document.body.style.overflow
    viewer.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      viewer.close()
      document.body.style.overflow = previousOverflow
    }
  }, [opened])

  const selectAlbum = (index) => {
    if (window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)').matches) {
      const top = window.scrollY + section.current.getBoundingClientRect().top
      window.scrollTo({ top: top + index / (albums.length - 1) * (section.current.offsetHeight - window.innerHeight), behavior: 'smooth' })
    } else setActive(index)
  }

  return (
    <section className="wedding-albums" id="albums" aria-labelledby="albums-title">
      <header className="wedding-albums__heading">
        <p>Selected wedding albums</p>
        <h2 id="albums-title">Stories that live <em>beyond the day.</em></h2>
      </header>
      <div className="albums-scroll" ref={section}>
        <div className="albums-pin">
          <nav className="albums-list" aria-label="Wedding albums">
            {albums.map((album, index) => (
              <button key={album.name} type="button" className={index === active ? 'is-active' : ''} aria-current={index === active ? 'true' : undefined} onClick={() => selectAlbum(index)}>
                <span>{album.name}</span><span className="albums-list__category">{album.category}</span>
              </button>
            ))}
          </nav>
          <div className="albums-media">
            <div className="albums-track" ref={track}>
              {albums.map((album, index) => (
                <div key={album.name} className={`albums-slide${index === active ? ' is-active' : ''}`} aria-hidden={index !== active} inert={index !== active}>
                  {album.images ? <>
                    <img src={`/optimized/${album.images[0]}`} alt={`${album.name} by the thinkstudios`} loading="lazy" />
                    <button type="button" className="albums-discover" onClick={() => setOpened(index)}>[ View album ]</button>
                  </> : <div className="albums-invitation"><p>Your story.<br />Our next inspiration.</p><a href="/contact">[ Book us now ]</a></div>}
                </div>
              ))}
            </div>
            <div className="albums-frame" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
          <div className="albums-description"><p key={active}>{albums[active].description}</p></div>
        </div>
      </div>
      {opened !== null && <dialog className="album-viewer" ref={dialog} onClose={() => setOpened(null)} onClick={(event) => { if (event.target === event.currentTarget) setOpened(null) }}>
        <div className="album-viewer__header"><h2>{albums[opened].name}</h2><button type="button" aria-label="Close album" autoFocus onClick={() => setOpened(null)}>Close</button></div>
        <div className="album-viewer__photos">{albums[opened].images.map((src, index) => <img key={src} src={`/optimized/${src}`} alt={`${albums[opened].name}, photograph ${index + 1}`} />)}</div>
      </dialog>}
    </section>
  )
}
