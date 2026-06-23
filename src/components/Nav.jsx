import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Magnetic from './ui/Magnetic'
import { scrollToId } from '../lib/scroll'

const links = [
  { label: 'Expertises', id: '#expertises' },
  { label: 'À propos', id: '#about' },
  { label: 'Contact', id: '#contact' },
]

export default function Nav({ theme = 'light' }) {
  const [open, setOpen] = useState(false)
  const dark = theme === 'dark'
  const fg = dark ? 'var(--paper)' : 'var(--ink)'

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  const lineColor = open ? 'var(--paper)' : fg

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <a
            href="#top"
            onClick={go('#top')}
            className="font-display text-lg tracking-tightest transition-colors duration-500"
            style={{ color: open ? 'var(--paper)' : fg }}
          >
            DACSONS
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <Magnetic
                as="a"
                key={l.id}
                href={l.id}
                onClick={go(l.id)}
                className="group relative text-sm font-medium transition-colors duration-500"
                style={{ color: fg }}
              >
                <span>{l.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-racing transition-all duration-300 ease-smooth group-hover:w-full" />
              </Magnetic>
            ))}
            <Magnetic
              as="a"
              href="#contact"
              onClick={go('#contact')}
              className="rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-500"
              style={{ color: fg, borderColor: dark ? 'rgba(243,242,238,0.25)' : 'rgba(7,10,20,0.2)' }}
            >
              Écrire
            </Magnetic>
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className="block h-[2px] w-7 origin-center transition-all duration-300"
              style={{ background: lineColor, transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block h-[2px] w-7 origin-center transition-all duration-300"
              style={{ background: lineColor, transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-3">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.id}
                  onClick={go(l.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl tracking-tightest text-paper"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a href="mailto:contact@dacsons.fr" className="mt-14 text-sky">
              contact@dacsons.fr
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
