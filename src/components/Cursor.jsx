import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, input, textarea, [data-cursor]'

// Anneau d'accent qui suit le curseur (desktop uniquement, masqué au tactile via CSS).
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const ring = ref.current
    if (!ring) return

    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let tx = rx
    let ty = ry
    let raf

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const over = (e) => {
      if (e.target.closest?.(INTERACTIVE)) ring.classList.add('is-hover')
    }
    const out = (e) => {
      if (e.target.closest?.(INTERACTIVE)) ring.classList.remove('is-hover')
    }
    const down = () => ring.classList.add('is-down')
    const up = () => ring.classList.remove('is-down')

    const loop = () => {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerout', out)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerout', out)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return <div ref={ref} className="cursor-ring" aria-hidden="true" />
}
