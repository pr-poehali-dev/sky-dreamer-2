import { useRef, useEffect, useState } from "react"

// ─── Keyboard layout ───────────────────────────────────────────────────────────
// 14 columns × 5 rows of keys in a standard TKL-ish layout
// Each entry: [col, row, widthUnits, label, isRE]
// widthUnits: 1 = normal, 1.5 = wide, 2 = extra wide

type KeyDef = { col: number; row: number; w: number; label: string; isRE: boolean }

const KEY_ROWS: KeyDef[] = [
  // Row 0 — number row
  { col: 0,    row: 0, w: 1,   label: "ESC",   isRE: false },
  { col: 1,    row: 0, w: 1,   label: "1",     isRE: false },
  { col: 2,    row: 0, w: 1,   label: "2",     isRE: false },
  { col: 3,    row: 0, w: 1,   label: "3",     isRE: false },
  { col: 4,    row: 0, w: 1,   label: "4",     isRE: false },
  { col: 5,    row: 0, w: 1,   label: "5",     isRE: false },
  { col: 6,    row: 0, w: 1,   label: "6",     isRE: false },
  { col: 7,    row: 0, w: 1,   label: "7",     isRE: false },
  { col: 8,    row: 0, w: 1,   label: "8",     isRE: false },
  { col: 9,    row: 0, w: 1,   label: "9",     isRE: false },
  { col: 10,   row: 0, w: 1,   label: "0",     isRE: false },
  { col: 11,   row: 0, w: 1,   label: "-",     isRE: false },
  { col: 12,   row: 0, w: 1,   label: "=",     isRE: false },
  { col: 13,   row: 0, w: 2,   label: "BKSP",  isRE: false },

  // Row 1 — QWERTY
  { col: 0,    row: 1, w: 1.5, label: "TAB",   isRE: false },
  { col: 1.5,  row: 1, w: 1,   label: "Q",     isRE: false },
  { col: 2.5,  row: 1, w: 1,   label: "W",     isRE: false },
  { col: 3.5,  row: 1, w: 1,   label: "E",     isRE: true  },
  { col: 4.5,  row: 1, w: 1,   label: "R",     isRE: true  },
  { col: 5.5,  row: 1, w: 1,   label: "T",     isRE: false },
  { col: 6.5,  row: 1, w: 1,   label: "Y",     isRE: false },
  { col: 7.5,  row: 1, w: 1,   label: "U",     isRE: false },
  { col: 8.5,  row: 1, w: 1,   label: "I",     isRE: false },
  { col: 9.5,  row: 1, w: 1,   label: "O",     isRE: false },
  { col: 10.5, row: 1, w: 1,   label: "P",     isRE: false },
  { col: 11.5, row: 1, w: 1,   label: "[",     isRE: false },
  { col: 12.5, row: 1, w: 1,   label: "]",     isRE: false },
  { col: 13.5, row: 1, w: 1.5, label: "\\",   isRE: false },

  // Row 2 — ASDF
  { col: 0,    row: 2, w: 1.75,label: "CAPS",  isRE: false },
  { col: 1.75, row: 2, w: 1,   label: "A",     isRE: false },
  { col: 2.75, row: 2, w: 1,   label: "S",     isRE: false },
  { col: 3.75, row: 2, w: 1,   label: "D",     isRE: false },
  { col: 4.75, row: 2, w: 1,   label: "F",     isRE: false },
  { col: 5.75, row: 2, w: 1,   label: "G",     isRE: false },
  { col: 6.75, row: 2, w: 1,   label: "H",     isRE: false },
  { col: 7.75, row: 2, w: 1,   label: "J",     isRE: false },
  { col: 8.75, row: 2, w: 1,   label: "K",     isRE: false },
  { col: 9.75, row: 2, w: 1,   label: "L",     isRE: false },
  { col: 10.75,row: 2, w: 1,   label: ";",     isRE: false },
  { col: 11.75,row: 2, w: 1,   label: "'",     isRE: false },
  { col: 12.75,row: 2, w: 2.25,label: "ENTER", isRE: false },

  // Row 3 — ZXCV
  { col: 0,    row: 3, w: 2.25,label: "SHIFT",  isRE: false },
  { col: 2.25, row: 3, w: 1,   label: "Z",     isRE: false },
  { col: 3.25, row: 3, w: 1,   label: "X",     isRE: false },
  { col: 4.25, row: 3, w: 1,   label: "C",     isRE: false },
  { col: 5.25, row: 3, w: 1,   label: "V",     isRE: false },
  { col: 6.25, row: 3, w: 1,   label: "B",     isRE: false },
  { col: 7.25, row: 3, w: 1,   label: "N",     isRE: false },
  { col: 8.25, row: 3, w: 1,   label: "M",     isRE: false },
  { col: 9.25, row: 3, w: 1,   label: ",",     isRE: false },
  { col: 10.25,row: 3, w: 1,   label: ".",     isRE: false },
  { col: 11.25,row: 3, w: 1,   label: "/",     isRE: false },
  { col: 12.25,row: 3, w: 2.75,label: "SHIFT", isRE: false },

  // Row 4 — bottom row
  { col: 0,    row: 4, w: 1.25,label: "CTRL",  isRE: false },
  { col: 1.25, row: 4, w: 1,   label: "WIN",   isRE: false },
  { col: 2.25, row: 4, w: 1.25,label: "ALT",   isRE: false },
  { col: 3.5,  row: 4, w: 6.25,label: "",      isRE: false },
  { col: 9.75, row: 4, w: 1.25,label: "ALT",   isRE: false },
  { col: 11,   row: 4, w: 1,   label: "FN",    isRE: false },
  { col: 12,   row: 4, w: 1,   label: "CTRL",  isRE: false },
]

// Total grid width in units
const GRID_W = 15
const GRID_H = 5

export const Hero3DWebGL = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const [titleVisible, setTitleVisible] = useState(false)
  const [sloganVisible, setSloganVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 800)
    const t2 = setTimeout(() => setSloganVisible(true), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let startTime: number | null = null

    // Build list of "edges" to draw for animation
    // Each edge is two screen points + metadata
    type Edge = { x1: number; y1: number; x2: number; y2: number; isRE: boolean }
    let edges: Edge[] = []
    let keyScreenRects: {
      cx: number; cy: number; rx: number; ry: number; isRE: boolean; label: string
    }[] = []

    const DRAW_DURATION = 4500 // ms to assemble the keyboard

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      build()
    }

    const build = () => {
      const W = canvas.width
      const H = canvas.height

      // Keyboard size: fill ~80% of screen width, centered vertically
      const kbdW = Math.min(W * 0.88, 1000)
      const UNIT = kbdW / GRID_W
      const kbdH = GRID_H * UNIT * 0.95
      const kbdX = (W - kbdW) / 2
      const kbdY = (H - kbdH) / 2 - H * 0.04

      // 3D perspective skew — isometric feel
      const SKEW_X = 0.18   // horizontal shear
      const SKEW_Y = -0.06  // vertical shear (tilt top-back)
      const DEPTH = UNIT * 0.32  // side/bottom thickness

      // Transform flat [col,row] → screen [x,y]
      const toScreen = (col: number, row: number): [number, number] => {
        const fx = kbdX + col * UNIT
        const fy = kbdY + row * UNIT * 0.95
        // apply perspective shear
        const sx = fx + fy * SKEW_X - kbdY * SKEW_X
        const sy = fy + fx * SKEW_Y - kbdX * SKEW_Y
        return [sx, sy]
      }

      edges = []
      keyScreenRects = []

      // Outer keyboard body edges (bottom slab)
      const corners = [
        toScreen(0, 0), toScreen(GRID_W, 0),
        toScreen(GRID_W, GRID_H), toScreen(0, GRID_H),
      ]

      // Top face outline
      for (let i = 0; i < 4; i++) {
        const a = corners[i]
        const b = corners[(i + 1) % 4]
        edges.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], isRE: false })
      }

      // 3D depth sides (front + right + bottom)
      const depthCorners = [[0, GRID_H], [GRID_W, GRID_H]] as [number, number][]
      const topCorners = [[0, 0], [GRID_W, 0]] as [number, number][]

      for (const [col, row] of [...depthCorners, ...topCorners.slice(1)]) {
        const [sx, sy] = toScreen(col, row)
        edges.push({ x1: sx, y1: sy, x2: sx + DEPTH * 0.5, y2: sy + DEPTH, isRE: false })
      }
      // bottom of depth
      const [bx0, by0] = toScreen(0, GRID_H)
      const [bx1, by1] = toScreen(GRID_W, GRID_H)
      edges.push({
        x1: bx0 + DEPTH * 0.5, y1: by0 + DEPTH,
        x2: bx1 + DEPTH * 0.5, y2: by1 + DEPTH,
        isRE: false,
      })
      const [rx0, ry0] = toScreen(GRID_W, 0)
      edges.push({
        x1: rx0 + DEPTH * 0.5, y1: ry0 + DEPTH,
        x2: bx1 + DEPTH * 0.5, y2: by1 + DEPTH,
        isRE: false,
      })

      // Row dividers
      for (let row = 1; row < GRID_H; row++) {
        const [x1, y1] = toScreen(0, row)
        const [x2, y2] = toScreen(GRID_W, row)
        edges.push({ x1, y1, x2, y2, isRE: false })
      }

      // Individual keys
      for (const key of KEY_ROWS) {
        const PAD = 0.1
        const c0 = key.col + PAD
        const c1 = key.col + key.w - PAD
        const r0 = key.row + PAD
        const r1 = key.row + 1 - PAD

        const tl = toScreen(c0, r0)
        const tr = toScreen(c1, r0)
        const br = toScreen(c1, r1)
        const bl = toScreen(c0, r1)

        // 4 sides of key top face
        edges.push({ x1: tl[0], y1: tl[1], x2: tr[0], y2: tr[1], isRE: key.isRE })
        edges.push({ x1: tr[0], y1: tr[1], x2: br[0], y2: br[1], isRE: key.isRE })
        edges.push({ x1: br[0], y1: br[1], x2: bl[0], y2: bl[1], isRE: key.isRE })
        edges.push({ x1: bl[0], y1: bl[1], x2: tl[0], y2: tl[1], isRE: key.isRE })

        // 3D key side (small depth for each keycap)
        const keyDepth = DEPTH * 0.35
        edges.push({
          x1: bl[0], y1: bl[1],
          x2: bl[0] + keyDepth * 0.5, y2: bl[1] + keyDepth,
          isRE: key.isRE,
        })
        edges.push({
          x1: br[0], y1: br[1],
          x2: br[0] + keyDepth * 0.5, y2: br[1] + keyDepth,
          isRE: key.isRE,
        })
        edges.push({
          x1: bl[0] + keyDepth * 0.5, y1: bl[1] + keyDepth,
          x2: br[0] + keyDepth * 0.5, y2: br[1] + keyDepth,
          isRE: key.isRE,
        })

        // Center for mouse interaction
        const cx = (tl[0] + tr[0] + br[0] + bl[0]) / 4
        const cy = (tl[1] + tr[1] + br[1] + bl[1]) / 4
        const rx = Math.abs(tr[0] - tl[0]) / 2
        const ry = Math.abs(br[1] - tr[1]) / 2
        keyScreenRects.push({ cx, cy, rx, ry, isRE: key.isRE, label: key.label })
      }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      } else {
        mouseRef.current = { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
      }
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("resize", resize)
    resize()

    const draw = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const t = Math.min(elapsed / DRAW_DURATION, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const progress = Math.floor(eased * edges.length)

      const W = canvas.width
      const H = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#06070a"
      ctx.fillRect(0, 0, W, H)

      // Subtle ambient glow around mouse
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 320)
      grad.addColorStop(0, "rgba(250,110,20,0.08)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // ── Draw key glow on hover ───────────────────────────────────────────
      for (const key of keyScreenRects) {
        const dx = mx - key.cx
        const dy = my - key.cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = Math.max(key.rx, key.ry) * 2.2
        if (dist < radius) {
          const intensity = 1 - dist / radius
          const glowR = key.isRE ? 300 : 200
          const glowColor = key.isRE
            ? `rgba(255,120,10,${intensity * 0.45})`
            : `rgba(255,140,40,${intensity * 0.28})`
          const glow = ctx.createRadialGradient(key.cx, key.cy, 0, key.cx, key.cy, glowR * intensity)
          glow.addColorStop(0, glowColor)
          glow.addColorStop(1, "rgba(0,0,0,0)")
          ctx.fillStyle = glow
          ctx.fillRect(0, 0, W, H)
        }
      }

      // ── Draw assembled edges ─────────────────────────────────────────────
      for (let i = 0; i < progress; i++) {
        const e = edges[i]
        const age = (progress - i) / Math.max(progress, 1)
        const isFront = i > progress - 60

        const baseAlpha = Math.max(0.06, 0.5 - age * 0.38)

        ctx.shadowBlur = isFront ? 14 : (e.isRE ? 6 : 0)
        ctx.shadowColor = e.isRE ? "rgba(255,100,10,1)" : "rgba(245,130,30,0.9)"

        if (isFront) {
          ctx.strokeStyle = `rgba(255,140,30,${Math.min(baseAlpha + 0.45, 1)})`
          ctx.lineWidth = 1.8
        } else if (e.isRE) {
          ctx.strokeStyle = `rgba(255,100,10,${baseAlpha + 0.2})`
          ctx.lineWidth = 1.2
        } else {
          ctx.strokeStyle = `rgba(190,170,130,${baseAlpha})`
          ctx.lineWidth = 0.6
        }

        ctx.beginPath()
        ctx.moveTo(e.x1, e.y1)
        ctx.lineTo(e.x2, e.y2)
        ctx.stroke()
      }

      ctx.shadowBlur = 0

      // Scanlines
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.06)"
        ctx.fillRect(0, y, W, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="h-screen bg-[#06070a] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#06070a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#06070a] to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#06070a] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#06070a] to-transparent" />
      </div>

      {/* Text */}
      <div className="absolute inset-0 z-[60] pointer-events-none flex flex-col items-center justify-end pb-14 px-6 text-center">
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
