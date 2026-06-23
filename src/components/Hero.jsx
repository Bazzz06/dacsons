import { motion } from 'framer-motion'
import Magnetic from './ui/Magnetic'
import { scrollToId } from '../lib/scroll'

const letters = 'DACSONS'.split('')

export default function Hero({ active }) {
  const show = active ? { opacity: 1, y: 0 } : {}

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-14 pt-24 text-paper md:px-10 md:pb-20"
    >
      {/* Vidéo de fond */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_26%]"
        src="/hero.mp4"
        poster="/hero-poster.png"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* Scrim : sombre en bas (lisibilité du wordmark), visage visible en haut */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ink/15" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={show}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/80"
        >
          <span className="martini-bars h-3 w-10 rounded-sm" />
          Conseil · Finance · Logiciel
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.82] tracking-tightest">
          <span className="sr-only">DACSONS</span>
          <span aria-hidden="true" className="flex">
            {letters.map((c, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block text-[19vw] md:text-[15vw]"
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
          className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-lg text-paper/75 md:text-xl">
            Cabinet familial sur la Côte d'Azur. Trois expertises qui se répondent —{' '}
            <span className="text-paper">une même exigence.</span>
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
    </section>
  )
}
