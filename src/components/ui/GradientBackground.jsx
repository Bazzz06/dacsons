import { GrainGradient } from '@paper-design/shaders-react'

// Fond anime "grain gradient" aux couleurs DACSONS (bleu nuit, bleu ciel, rouge)
// sur fond sombre. Animation coupee si prefers-reduced-motion.
export function GradientBackground() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="absolute inset-0">
      <GrainGradient
        style={{ height: '100%', width: '100%' }}
        colorBack="hsl(225, 47%, 6%)"
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={reduced ? 0 : 1}
        colors={['hsl(222, 65%, 42%)', 'hsl(198, 85%, 60%)', 'hsl(356, 80%, 54%)']}
      />
    </div>
  )
}

export default GradientBackground
