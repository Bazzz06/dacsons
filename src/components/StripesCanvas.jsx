import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scene } from '../lib/store'

// Hex sRGB -> [r,g,b] 0..1. Le Canvas est en mode `flat linear` : les valeurs
// sont écrites telles quelles, donc on garde des couleurs sRGB fidèles.
const rgb = (h) => {
  const n = parseInt(h.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uDark;
  uniform float uHero;
  uniform vec2  uRes;
  uniform float uReduced;
  uniform vec3  cPaper;
  uniform vec3  cInk;
  uniform vec3  cSky;
  uniform vec3  cNavy;
  uniform vec3  cRacing;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  // bande douce centrée en c, demi-largeur hw, transition se
  float band(float x, float c, float hw, float se) {
    return 1.0 - smoothstep(hw, hw + se, abs(x - c));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);

    float t = uReduced > 0.5 ? 0.0 : uTime;

    // ondulation façon drapeau/soie
    float flow = sin(p.y * 2.4 + t * 0.5) * 0.05
               + sin(p.y * 5.1 - t * 0.31) * 0.025
               + (noise(p * 1.6 + vec2(t * 0.08, -t * 0.05)) - 0.5) * 0.18;

    float mouseShift = uMouse.x * 0.10 - uMouse.y * 0.04;

    // coordonnée diagonale qui dérive lentement
    float diag = (p.x * 0.62 - p.y * 0.30) + flow + mouseShift + t * 0.012;
    float freq = 2.6;
    float x = fract(diag * freq);

    // triplet Martini (bleu ciel / bleu nuit / rouge) + un bleu ciel isolé
    float skyM  = band(x, 0.120, 0.022, 0.018);
    float navyM = band(x, 0.175, 0.016, 0.016);
    float redM  = band(x, 0.235, 0.030, 0.020);
    float sky2M = band(x, 0.700, 0.020, 0.018);

    // fond clair -> sombre
    vec3 bg = mix(cPaper, cInk, uDark);

    // halo de lumière central quand on est en clair (lisibilité du hero)
    float glow = 1.0 - smoothstep(0.0, 0.75, distance(uv, vec2(0.5, 0.58)));
    bg = mix(bg, mix(bg, cPaper, 0.5), glow * (1.0 - uDark) * 0.8);

    // bandes vives dans le hero, calmées dans le contenu clair, discrètes en sombre
    float lightAlpha = mix(0.42, 0.82, uHero);
    float alpha = mix(lightAlpha, 0.30, uDark);

    vec3 col = bg;
    col = mix(col, cSky,    skyM  * alpha);
    col = mix(col, cNavy,   navyM * alpha * 0.95);
    col = mix(col, cRacing, redM  * alpha);
    col = mix(col, cSky,    sky2M * alpha * 0.70);

    // grain subtil
    col += (noise(uv * uRes * 0.7 + t) - 0.5) * 0.035;

    // vignette
    float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
    col *= mix(1.0, vig, 0.18 + 0.22 * uDark);

    gl_FragColor = vec4(col, 1.0);
  }
`

function Bars({ reduced }) {
  const matRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDark: { value: 0 },
      uHero: { value: 1 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uReduced: { value: reduced ? 1 : 0 },
      cPaper: { value: new THREE.Vector3(...rgb('#f3f2ee')) },
      cInk: { value: new THREE.Vector3(...rgb('#070a14')) },
      cSky: { value: new THREE.Vector3(...rgb('#5bc3ef')) },
      cNavy: { value: new THREE.Vector3(...rgb('#16244d')) },
      cRacing: { value: new THREE.Vector3(...rgb('#e11d2a')) },
    }),
    [reduced],
  )

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms
    if (!u) return
    if (!reduced) u.uTime.value += delta
    u.uRes.value.set(state.size.width, state.size.height)
    u.uMouse.value.x += (scene.mouseX - u.uMouse.value.x) * 0.05
    u.uMouse.value.y += (scene.mouseY - u.uMouse.value.y) * 0.05
    u.uDark.value += (scene.darkTarget - u.uDark.value) * 0.045
    u.uHero.value += (scene.heroBoost - u.uHero.value) * 0.05
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function StripesCanvas({ reduced = false }) {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        flat
        linear
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Bars reduced={reduced} />
      </Canvas>
    </div>
  )
}
