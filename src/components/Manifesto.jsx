import { useEffect, useRef } from 'react'

// Phrase revelee mot a mot pendant le scroll (les mots marques accent passent en rouge racing).
const WORDS = [
  ['Cabinet', false],
  ['familial', false],
  ['sur', false],
  ['la', false],
  ['Côte', false],
  ["d'Azur.", false],
  ['Le', false],
  ['conseil', false],
  ['stratégique', false],
  ['et', false],
  ['le', false],
  ['développement', false],
  ['technologique', false],
  ['au', false],
  ['service', false],
  ['de', false],
  ['votre', true],
  ['croissance.', true],
]

export default function Manifesto() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll('[data-w]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach((s) => s.classList.add('lit'))
      return
    }

    let raf
    const tick = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.9)))
      const lit = Math.floor(progress * spans.length)
      spans.forEach((s, i) => s.classList.toggle('lit', i < lit))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      data-theme="light"
      className="flex min-h-[105vh] items-center px-6 py-28 md:px-10"
      aria-label="Présentation"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <h2
          ref={ref}
          className="max-w-5xl font-display text-4xl leading-[1.08] tracking-tightest text-ink md:text-6xl lg:text-7xl"
          style={{ textWrap: 'balance' }}
        >
          {WORDS.map(([w, accent], i) => (
            <span key={i} data-w className={`mani-w${accent ? ' accent' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
