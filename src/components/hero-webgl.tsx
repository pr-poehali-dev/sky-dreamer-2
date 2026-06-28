import { useRef, useEffect, useState } from "react"

const GEO_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"

type Coord = [number, number]
type Ring = Coord[]

function project(lon: number, lat: number, w: number, h: number): [number, number] {
  const x = ((lon + 180) / 360) * w
  const y = ((90 - lat) / 180) * h
  return [x, y]
}

type GeoFeature = { geometry: { type: string; coordinates: Coord[][][] | Coord[][][][] } | null }
type GeoJSON = { features: GeoFeature[] }

function extractRings(geojson: GeoJSON): Ring[] {
  const rings: Ring[] = []
  for (const feature of geojson.features) {
    const geom = feature.geometry
    if (!geom) continue
    const polys: Coord[][][] =
      geom.type === "Polygon"
        ? [geom.coordinates]
        : geom.type === "MultiPolygon"
        ? geom.coordinates
        : []
    for (const poly of polys) {
      if (poly[0]) rings.push(poly[0])
    }
  }
  return rings
}

export const Hero3DWebGL = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [sloganVisible, setSloganVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 600)
    const t2 = setTimeout(() => setSloganVisible(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let rings: Ring[] = []
    let allEdges: { x1: number; y1: number; x2: number; y2: number }[] = []
    let totalEdges = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildEdges()
    }

    const buildEdges = () => {
      const W = canvas.width
      const H = canvas.height
      const scale = Math.min(W / 960, H / 480)
      const offX = (W - 960 * scale) / 2
      const offY = (H - 480 * scale) / 2

      allEdges = []
      for (const ring of rings) {
        for (let i = 0; i < ring.length - 1; i++) {
          const [x1, y1] = project(ring[i][0], ring[i][1], 960, 480)
          const [x2, y2] = project(ring[i + 1][0], ring[i + 1][1], 960, 480)
          allEdges.push({
            x1: x1 * scale + offX,
            y1: y1 * scale + offY,
            x2: x2 * scale + offX,
            y2: y2 * scale + offY,
          })
        }
      }
      totalEdges = allEdges.length
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      } else {
        mouseX = (e as MouseEvent).clientX
        mouseY = (e as MouseEvent).clientY
      }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("resize", resize)
    resize()

    let startTime: number | null = null
    const DRAW_DURATION = 5500

    const draw = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const t = Math.min(elapsed / DRAW_DURATION, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const progress = Math.floor(eased * totalEdges)

      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#08090a"
      ctx.fillRect(0, 0, W, H)

      // Mouse glow
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380)
      grad.addColorStop(0, "rgba(240,100,20,0.06)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Draw edges
      for (let i = 0; i < progress; i++) {
        const e = allEdges[i]
        const age = (progress - i) / Math.max(progress, 1)
        const alpha = Math.max(0.07, 0.55 - age * 0.42)
        const isFront = i > progress - 100

        ctx.shadowBlur = isFront ? 10 : 0
        ctx.shadowColor = "rgba(240,110,20,0.9)"

        ctx.beginPath()
        ctx.moveTo(e.x1, e.y1)
        ctx.lineTo(e.x2, e.y2)
        ctx.strokeStyle = isFront
          ? `rgba(245,130,30,${Math.min(alpha + 0.35, 1)})`
          : `rgba(200,175,130,${alpha})`
        ctx.lineWidth = isFront ? 1.6 : 0.65
        ctx.stroke()
      }

      ctx.shadowBlur = 0

      // Scanlines
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.07)"
        ctx.fillRect(0, y, W, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    fetch(GEO_URL)
      .then((r) => r.json())
      .then((data) => {
        rings = extractRings(data)
        buildEdges()
        animId = requestAnimationFrame(draw)
      })
      .catch(() => {
        animId = requestAnimationFrame(draw)
      })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="h-screen bg-[#08090a] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#08090a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08090a] to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#08090a] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#08090a] to-transparent" />
      </div>

      {/* Text */}
      <div className="absolute inset-0 z-[60] pointer-events-none flex flex-col items-center justify-end pb-16 px-6 text-center">
        <div
          className={`font-orbitron font-extrabold text-4xl md:text-6xl xl:text-7xl tracking-widest transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="text-primary">RE</span><span className="text-white">клава</span>
        </div>
        <div
          className={`mt-4 font-space-mono text-sm md:text-base xl:text-lg text-white/50 tracking-[0.3em] uppercase transition-all duration-700 ${sloganVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Those who dare truly live
        </div>
      </div>
    </div>
  )
}

export default Hero3DWebGL