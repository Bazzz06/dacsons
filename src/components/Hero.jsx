import { motion } from 'framer-motion'
import Magnetic from './ui/Magnetic'
import { scrollToId } from '../lib/scroll'

const letters = 'DACSONS'.split('')

export default function Hero({ active }) {
  const show = active ? { opacity: 1, y: 0 } : {}

  return (
    <section
      id="top"
      data-theme="light"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-24 md:px-10"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={show}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-navy/70"
        >
          <span className="martini-bars h-3 w-10 rounded-sm" />
          Conseil · Finance · Logiciel
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.82] tracking-tightest text-navy">
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
          <p className="max-w-md text-lg text-ink/70 md:text-xl">
            Cabinet familial sur la Côte d'Azur. Deux expertises.
          </p>

          <Magnetic
            as="button"
            onClick={() => scrollToId('#expertises')}
            className="group inline-flex items-center gap-3 self-start rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink/50"
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
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink/40">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ink/30" />
      </motion.div>
    </section>
  )
}
