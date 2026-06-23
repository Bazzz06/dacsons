import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'

import Cursor from './components/Cursor'
import ErrorBoundary from './components/ErrorBoundary'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Expertises from './components/Expertises'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

import { scene } from './lib/store'
import { setLenis } from './lib/scroll'

// Three.js est lourd : on le charge à part pour ne pas bloquer le 1er paint.
const StripesCanvas = lazy(() => import('./components/StripesCanvas'))

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Détection WebGL : si indisponible, on s'appuie sur le fond CSS (lisibilité garantie).
function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [theme, setTheme] = useState('light')
  const lenisRef = useRef(null)
  const webglOK = useMemo(supportsWebGL, [])

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
    if (import.meta.env.DEV) {
      window.__lenis = lenis
      window.__scene = scene
    }

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
    const delay = prefersReduced ? 250 : 1500
    const id = setTimeout(() => setLoaded(true), delay)
    return () => clearTimeout(id)
  }, [])

  // --- Suivi du curseur (pour le shader) ---
  useEffect(() => {
    const onMove = (e) => {
      scene.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      scene.mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // --- Détection de la section active -> thème clair/sombre ---
  // Boucle rAF dédiée : toujours à jour quel que soit le mode de scroll
  // (molette, ancres Lenis, deep-link, reduced-motion). Le setState Nav
  // n'est déclenché qu'au changement de thème.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-theme]'))
    let raf
    let last = null

    const tick = () => {
      const band = 72 // sous la barre de nav
      let current = 'light'
      let activeId = ''
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= band && r.bottom > band) {
          current = s.dataset.theme
          activeId = s.id
          break
        }
      }
      scene.darkTarget = current === 'dark' ? 1 : 0
      scene.heroBoost = activeId === 'top' ? 1 : 0
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
      {/* Fond CSS de secours (lisibilité si WebGL absent / avant 1re frame) */}
      <div className={`page-underlay${theme === 'dark' ? ' is-dark' : ''}`} aria-hidden="true" />
      {webglOK && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <StripesCanvas reduced={prefersReduced} />
          </Suspense>
        </ErrorBoundary>
      )}
      {!prefersReduced && <Cursor />}

      <AnimatePresence>{!loaded && <Loader key="loader" />}</AnimatePresence>

      <Nav theme={theme} />

      <main className="relative">
        <Hero active={loaded} />
        <Expertises />
        <About />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}
