import { motion } from 'framer-motion'

// Écran d'introduction : wordmark + bandes Martini, qui se relève au chargement.
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="text-center">
        <motion.div
          className="martini-bars mx-auto mb-6 h-7 rounded-sm"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 168, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className="font-display text-2xl tracking-tightest text-paper"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          DACSONS
        </motion.span>
      </div>
    </motion.div>
  )
}
