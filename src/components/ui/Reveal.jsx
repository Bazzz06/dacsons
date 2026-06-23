import { motion } from 'framer-motion'

// Révèle son contenu à l'entrée dans le viewport. Respecte automatiquement
// prefers-reduced-motion via <MotionConfig reducedMotion="user"> dans App.
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
