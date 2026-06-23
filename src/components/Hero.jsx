import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Magnetic from './ui/Magnetic'
import ErrorBoundary from './ErrorBoundary'
import { scrollToId } from '../lib/scroll'

// Fond anime charge a part (lib WebGL ~1.6 Mo) pour ne pas bloquer le 1er paint.
const GradientBackground = lazy(() => import('./ui/GradientBackground'))

const letters = 'DACSONS'.split('')

export default function Hero({ active }) {
  const show = active ? { opacity: 1, y: 0 } : {}

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 text-paper md:px-10"
    >
      {/* Fond anime (couleurs DACSONS), isole : si WebGL echoue on garde le fond sombre */}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <GradientBackground />
        </Suspense>
      </ErrorBoundary>
      {/* Voiles pour la lisibilite du wordmark */}
      <div className="pointer-events-none absolute inset-0 bg-ink/25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={show}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/80"
        >
          <span className="martini-bars h-3 w-10 rounded-sm" />
          Conseil · Finance · Logiciel
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.82] tracking-tightest text-paper">
          <span className="sr-only">DACSONS</span>
          <span aria-hidden="true" className="flex">
            {letters.map((c, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block text-[19vw] md:text-[15.5vw]"
                  initial={{ y: '115%' }}
                  animate={active ? { y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={show}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-lg text-paper/75 md:text-xl">
            Cabinet familial sur la Côte d'Azur. Deux expertises.
          </p>

          <Magnetic
            as="button"
            onClick={() => scrollToId('#expertises')}
            className="group inline-flex items-center gap-3 self-start rounded-full border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-paper/70"
          >
            Découvrir
            <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-paper/50">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-paper/30" />
      </motion.div>
    </section>
  )
}
