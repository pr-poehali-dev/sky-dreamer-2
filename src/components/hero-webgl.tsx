import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { useMemo, useRef, useState, useEffect, Suspense } from "react"
import * as THREE from "three"
import { TextureLoader } from "three"

const KEYBOARD_IMG = "https://cdn.poehali.dev/projects/bf322fce-7edc-4c02-a6db-17e26d292b8b/files/96cee49b-3ed5-4d12-b9de-c6650e8b0f5b.jpg"

const WIDTH = 1920
const HEIGHT = 1080

const Scene = () => {
  const texture = useLoader(TextureLoader, KEYBOARD_IMG)
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform float uTime;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;

        // Subtle parallax from pointer
        vec2 distortedUv = uv + uPointer * 0.012;

        vec4 baseColor = texture2D(uTexture, distortedUv);

        // Scanning dot grid overlay
        float aspect = ${WIDTH}.0 / ${HEIGHT}.0;
        vec2 tUv = vec2(uv.x * aspect, uv.y);
        vec2 tiling = vec2(120.0);
        vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;
        float brightness = noise(tUv * tiling * 0.5);
        float dist = length(tiledUv);
        float dotVal = smoothstep(0.5, 0.49, dist) * brightness;

        float flow = 1.0 - smoothstep(0.0, 0.02, abs(uv.y - uProgress));

        // Orange glow sweep (Marathon style)
        vec3 mask = vec3(dotVal * flow * 8.0, dotVal * flow * 3.5, dotVal * flow * 0.3);

        // Vignette
        vec2 vigUv = uv * 2.0 - 1.0;
        float vignette = 1.0 - dot(vigUv * vec2(0.6, 0.8), vigUv * vec2(0.6, 0.8));
        vignette = clamp(vignette, 0.0, 1.0);

        vec3 final = baseColor.rgb * vignette + mask;

        gl_FragColor = vec4(final, 1.0);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [texture])

  useFrame(({ clock, pointer }) => {
    if (material.uniforms) {
      material.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.4) * 0.5 + 0.5
      material.uniforms.uPointer.value = pointer
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export const Hero3DWebGL = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [sloganVisible, setSloganVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 400)
    const t2 = setTimeout(() => setSubtitleVisible(true), 1000)
    const t3 = setTimeout(() => setSloganVisible(true), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Edge fades */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 z-[60] pointer-events-none flex flex-col items-center justify-end pb-16 px-6 text-center">
        {/* Brand name */}
        <div
          className={`font-orbitron font-extrabold text-4xl md:text-6xl xl:text-7xl tracking-widest transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="text-primary">RE</span><span className="text-white">клава</span>
        </div>

        {/* Slogan */}
        <div
          className={`mt-4 font-space-mono text-sm md:text-base xl:text-lg text-white/60 tracking-[0.3em] uppercase transition-all duration-700 delay-200 ${sloganVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Those who dare truly live
        </div>
      </div>

      {/* Full-screen WebGL canvas */}
      <Canvas
        flat
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "#000000", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Hero3DWebGL
