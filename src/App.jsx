import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'

import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Expertises from './components/Expertises'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

import { setLenis } from './lib/scroll'

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [theme, setTheme] = useState('light')
  const lenisRef = useRef(null)

  // --- Smooth scroll (Lenis) ---
  useEffect(() => {
    if (prefersReduced) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    setLenis(lenis)
    if (import.meta.env.DEV) window.__lenis = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  // --- Verrouillage du scroll pendant le loader ---
  useEffect(() => {
    if (loaded) {
      lenisRef.current?.start()
      document.body.style.overflow = ''
    } else {
      lenisRef.current?.stop()
      document.body.style.overflow = 'hidden'
    }
  }, [loaded])

  // --- Fin du loader ---
  useEffect(() => {
    const delay = prefersReduced ? 200 : 1300
    const id = setTimeout(() => setLoaded(true), delay)
    return () => clearTimeout(id)
  }, [])

  // --- Thème de la nav = thème de la section sous la barre ---
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-theme]'))
    let raf
    let last = null
    const tick = () => {
      const band = 72
      let current = 'light'
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= band && r.bottom > band) {
          current = s.dataset.theme
          break
        }
      }
      if (current !== last) {
        last = current
        setTheme(current)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {/* Note Martini : fin liseré racing en haut de page */}
      <div className="martini-rule fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true" />

      <AnimatePresence>{!loaded && <Loader key="loader" />}</AnimatePresence>

      <Nav theme={theme} />

      <main>
        <Hero active={loaded} />
        <Manifesto />
        <Expertises />
        <About />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
