// Référence partagée vers l'instance Lenis, pour un scroll d'ancre fluide.
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToId(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2, offset: 0 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
