import { useRef, useEffect, useState } from "react"

type KeyDef = {
  col: number; row: number; w: number
  en: string; ru: string
  isRE: boolean
}

// EN/RU dual-label layout. isRE = true for E/R (EN) / У/К (RU) keys
const KEY_ROWS: KeyDef[] = [
  // Row 0 — numbers
  { col: 0,    row: 0, w: 1,    en: "ESC",  ru: "",    isRE: false },
  { col: 1,    row: 0, w: 1,    en: "1",    ru: "1",   isRE: false },
  { col: 2,    row: 0, w: 1,    en: "2",    ru: "2",   isRE: false },
  { col: 3,    row: 0, w: 1,    en: "3",    ru: "3",   isRE: false },
  { col: 4,    row: 0, w: 1,    en: "4",    ru: "4",   isRE: false },
  { col: 5,    row: 0, w: 1,    en: "5",    ru: "5",   isRE: false },
  { col: 6,    row: 0, w: 1,    en: "6",    ru: "6",   isRE: false },
  { col: 7,    row: 0, w: 1,    en: "7",    ru: "7",   isRE: false },
  { col: 8,    row: 0, w: 1,    en: "8",    ru: "8",   isRE: false },
  { col: 9,    row: 0, w: 1,    en: "9",    ru: "9",   isRE: false },
  { col: 10,   row: 0, w: 1,    en: "0",    ru: "0",   isRE: false },
  { col: 11,   row: 0, w: 1,    en: "-",    ru: "-",   isRE: false },
  { col: 12,   row: 0, w: 1,    en: "=",    ru: "=",   isRE: false },
  { col: 13,   row: 0, w: 2,    en: "BKSP", ru: "",    isRE: false },

  // Row 1 — QWERTY / ЙЦУКЕН
  { col: 0,    row: 1, w: 1.5,  en: "TAB",  ru: "",    isRE: false },
  { col: 1.5,  row: 1, w: 1,    en: "Q",    ru: "Й",   isRE: false },
  { col: 2.5,  row: 1, w: 1,    en: "W",    ru: "Ц",   isRE: false },
  { col: 3.5,  row: 1, w: 1,    en: "E",    ru: "У",   isRE: true  },
  { col: 4.5,  row: 1, w: 1,    en: "R",    ru: "К",   isRE: true  },
  { col: 5.5,  row: 1, w: 1,    en: "T",    ru: "Е",   isRE: false },
  { col: 6.5,  row: 1, w: 1,    en: "Y",    ru: "Н",   isRE: false },
  { col: 7.5,  row: 1, w: 1,    en: "U",    ru: "Г",   isRE: false },
  { col: 8.5,  row: 1, w: 1,    en: "I",    ru: "Ш",   isRE: false },
  { col: 9.5,  row: 1, w: 1,    en: "O",    ru: "Щ",   isRE: false },
  { col: 10.5, row: 1, w: 1,    en: "P",    ru: "З",   isRE: false },
  { col: 11.5, row: 1, w: 1,    en: "[",    ru: "Х",   isRE: false },
  { col: 12.5, row: 1, w: 1,    en: "]",    ru: "Ъ",   isRE: false },
  { col: 13.5, row: 1, w: 1.5,  en: "\\",  ru: "",    isRE: false },

  // Row 2 — ASDF / ФЫВА
  { col: 0,    row: 2, w: 1.75, en: "CAPS", ru: "",    isRE: false },
  { col: 1.75, row: 2, w: 1,    en: "A",    ru: "Ф",   isRE: false },
  { col: 2.75, row: 2, w: 1,    en: "S",    ru: "Ы",   isRE: false },
  { col: 3.75, row: 2, w: 1,    en: "D",    ru: "В",   isRE: false },
  { col: 4.75, row: 2, w: 1,    en: "F",    ru: "А",   isRE: false },
  { col: 5.75, row: 2, w: 1,    en: "G",    ru: "П",   isRE: false },
  { col: 6.75, row: 2, w: 1,    en: "H",    ru: "Р",   isRE: false },
  { col: 7.75, row: 2, w: 1,    en: "J",    ru: "О",   isRE: false },
  { col: 8.75, row: 2, w: 1,    en: "K",    ru: "Л",   isRE: false },
  { col: 9.75, row: 2, w: 1,    en: "L",    ru: "Д",   isRE: false },
  { col: 10.75,row: 2, w: 1,    en: ";",    ru: "Ж",   isRE: false },
  { col: 11.75,row: 2, w: 1,    en: "'",    ru: "Э",   isRE: false },
  { col: 12.75,row: 2, w: 2.25, en: "ENT",  ru: "",    isRE: false },

  // Row 3 — ZXCV / ЯЧСМ
  { col: 0,    row: 3, w: 2.25, en: "SHF",  ru: "",    isRE: false },
  { col: 2.25, row: 3, w: 1,    en: "Z",    ru: "Я",   isRE: false },
  { col: 3.25, row: 3, w: 1,    en: "X",    ru: "Ч",   isRE: false },
  { col: 4.25, row: 3, w: 1,    en: "C",    ru: "С",   isRE: false },
  { col: 5.25, row: 3, w: 1,    en: "V",    ru: "М",   isRE: false },
  { col: 6.25, row: 3, w: 1,    en: "B",    ru: "И",   isRE: false },
  { col: 7.25, row: 3, w: 1,    en: "N",    ru: "Т",   isRE: false },
  { col: 8.25, row: 3, w: 1,    en: "M",    ru: "Ь",   isRE: false },
  { col: 9.25, row: 3, w: 1,    en: ",",    ru: "Б",   isRE: false },
  { col: 10.25,row: 3, w: 1,    en: ".",    ru: "Ю",   isRE: false },
  { col: 11.25,row: 3, w: 1,    en: "/",    ru: ".",   isRE: false },
  { col: 12.25,row: 3, w: 2.75, en: "SHF",  ru: "",    isRE: false },

  // Row 4 — bottom
  { col: 0,    row: 4, w: 1.25, en: "CTL",  ru: "",    isRE: false },
  { col: 1.25, row: 4, w: 1,    en: "WIN",  ru: "",    isRE: false },
  { col: 2.25, row: 4, w: 1.25, en: "ALT",  ru: "",    isRE: false },
  { col: 3.5,  row: 4, w: 6.25, en: "",     ru: "",    isRE: false },
  { col: 9.75, row: 4, w: 1.25, en: "ALT",  ru: "",    isRE: false },
  { col: 11,   row: 4, w: 1,    en: "FN",   ru: "",    isRE: false },
  { col: 12,   row: 4, w: 1,    en: "CTL",  ru: "",    isRE: false },
]

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

    type Edge = { x1: number; y1: number; x2: number; y2: number; isRE: boolean }
    type KeyRect = {
      pts: [number,number][]   // tl, tr, br, bl of top face
      cx: number; cy: number
      isRE: boolean
      en: string; ru: string
    }

    let edges: Edge[] = []
    let keyRects: KeyRect[] = []
    const DRAW_DURATION = 4200

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      build()
    }

    const build = () => {
      const W = canvas.width
      const H = canvas.height

      const kbdW = Math.min(W * 0.86, 960)
      const UNIT = kbdW / GRID_W
      const kbdH = GRID_H * UNIT * 0.9
      const kbdX = (W - kbdW) / 2
      const kbdY = (H - kbdH) / 2 - H * 0.03

      // ── Flipped ракурс: наклон влево-вперёд (правый угол ближе к зрителю) ──
      const SKEW_X = -0.15   // shear по X (противоположный знак)
      const SKEW_Y = 0.05    // slight vertical tilt
      const DEPTH  = UNIT * 0.28

      const toScreen = (col: number, row: number): [number, number] => {
        const fx = kbdX + col * UNIT
        const fy = kbdY + row * UNIT * 0.9
        const sx = fx + fy * SKEW_X - kbdY * SKEW_X
        const sy = fy + fx * SKEW_Y - kbdX * SKEW_Y
        return [sx, sy]
      }

      edges = []
      keyRects = []

      // ── Outer body outline ────────────────────────────────────────────────
      const corners: [number,number][] = [
        toScreen(0, 0), toScreen(GRID_W, 0),
        toScreen(GRID_W, GRID_H), toScreen(0, GRID_H),
      ]
      for (let i = 0; i < 4; i++) {
        const a = corners[i], b = corners[(i + 1) % 4]
        edges.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], isRE: false })
      }

      // ── 3D depth — left side visible now (flipped perspective) ───────────
      const leftTop    = toScreen(0, 0)
      const leftBot    = toScreen(0, GRID_H)
      const rightBot   = toScreen(GRID_W, GRID_H)

      // depth direction: now going down-left
      const dx = -DEPTH * 0.5
      const dy =  DEPTH

      for (const pt of [leftTop, leftBot, rightBot]) {
        edges.push({ x1: pt[0], y1: pt[1], x2: pt[0]+dx, y2: pt[1]+dy, isRE: false })
      }
      edges.push({
        x1: leftTop[0]+dx,  y1: leftTop[1]+dy,
        x2: leftBot[0]+dx,  y2: leftBot[1]+dy, isRE: false
      })
      edges.push({
        x1: leftBot[0]+dx,  y1: leftBot[1]+dy,
        x2: rightBot[0]+dx, y2: rightBot[1]+dy, isRE: false
      })

      // ── Row dividers ──────────────────────────────────────────────────────
      for (let r = 1; r < GRID_H; r++) {
        const [x1, y1] = toScreen(0, r)
        const [x2, y2] = toScreen(GRID_W, r)
        edges.push({ x1, y1, x2, y2, isRE: false })
      }

      // ── Keys ──────────────────────────────────────────────────────────────
      for (const key of KEY_ROWS) {
        const PAD = 0.09
        const c0 = key.col + PAD, c1 = key.col + key.w - PAD
        const r0 = key.row + PAD, r1 = key.row + 1 - PAD

        const tl = toScreen(c0, r0)
        const tr = toScreen(c1, r0)
        const br = toScreen(c1, r1)
        const bl = toScreen(c0, r1)

        edges.push({ x1: tl[0], y1: tl[1], x2: tr[0], y2: tr[1], isRE: key.isRE })
        edges.push({ x1: tr[0], y1: tr[1], x2: br[0], y2: br[1], isRE: key.isRE })
        edges.push({ x1: br[0], y1: br[1], x2: bl[0], y2: bl[1], isRE: key.isRE })
        edges.push({ x1: bl[0], y1: bl[1], x2: tl[0], y2: tl[1], isRE: key.isRE })

        // keycap depth (small front+left sides, flipped)
        const kd = DEPTH * 0.3
        const kdx = -kd * 0.5, kdy = kd
        for (const pt of [bl, br]) {
          edges.push({ x1: pt[0], y1: pt[1], x2: pt[0]+kdx, y2: pt[1]+kdy, isRE: key.isRE })
        }
        edges.push({
          x1: bl[0]+kdx, y1: bl[1]+kdy,
          x2: br[0]+kdx, y2: br[1]+kdy, isRE: key.isRE
        })
        // left side of keycap
        edges.push({ x1: tl[0], y1: tl[1], x2: tl[0]+kdx, y2: tl[1]+kdy, isRE: key.isRE })
        edges.push({
          x1: tl[0]+kdx, y1: tl[1]+kdy,
          x2: bl[0]+kdx, y2: bl[1]+kdy, isRE: key.isRE
        })

        const cx = (tl[0]+tr[0]+br[0]+bl[0]) / 4
        const cy = (tl[1]+tr[1]+br[1]+bl[1]) / 4
        keyRects.push({ pts: [tl, tr, br, bl], cx, cy, isRE: key.isRE, en: key.en, ru: key.ru })
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
      const eased = t < 0.5 ? 2*t*t : -1+(4-2*t)*t
      const progress = Math.floor(eased * edges.length)
      const assembled = t >= 1

      const W = canvas.width
      const H = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#06070a"
      ctx.fillRect(0, 0, W, H)

      // Ambient mouse glow
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 300)
      grad.addColorStop(0, "rgba(250,110,20,0.07)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // ── Key hover glow ─────────────────────────────────────────────────────
      if (assembled) {
        for (const key of keyRects) {
          const dx = mx - key.cx
          const dy = my - key.cy
          const dist = Math.sqrt(dx*dx + dy*dy)
          const radius = 80
          if (dist < radius) {
            const intensity = 1 - dist / radius
            const glowColor = key.isRE
              ? `rgba(255,100,10,${intensity * 0.55})`
              : `rgba(255,140,50,${intensity * 0.32})`
            const g = ctx.createRadialGradient(key.cx, key.cy, 0, key.cx, key.cy, radius * 1.8 * intensity + 30)
            g.addColorStop(0, glowColor)
            g.addColorStop(1, "rgba(0,0,0,0)")
            ctx.fillStyle = g
            ctx.fillRect(0, 0, W, H)
          }
        }
      }

      // ── Draw edges ────────────────────────────────────────────────────────
      for (let i = 0; i < progress; i++) {
        const e = edges[i]
        const age = (progress - i) / Math.max(progress, 1)
        const baseAlpha = Math.max(0.07, 0.52 - age * 0.38)
        const isFront = i > progress - 55

        ctx.shadowBlur = isFront ? 12 : (e.isRE ? 7 : 0)
        ctx.shadowColor = e.isRE ? "rgba(255,90,10,1)" : "rgba(245,130,30,0.9)"

        if (isFront) {
          ctx.strokeStyle = `rgba(255,145,30,${Math.min(baseAlpha + 0.45, 1)})`
          ctx.lineWidth = 1.8
        } else if (e.isRE) {
          ctx.strokeStyle = `rgba(255,90,10,${baseAlpha + 0.25})`
          ctx.lineWidth = 1.3
        } else {
          ctx.strokeStyle = `rgba(185,165,125,${baseAlpha})`
          ctx.lineWidth = 0.6
        }

        ctx.beginPath()
        ctx.moveTo(e.x1, e.y1)
        ctx.lineTo(e.x2, e.y2)
        ctx.stroke()
      }
      ctx.shadowBlur = 0

      // ── Key labels (after assembly) ───────────────────────────────────────
      if (assembled) {
        for (const key of keyRects) {
          if (!key.en && !key.ru) continue
          const [tl, tr,, bl] = key.pts
          const dx = mx - key.cx
          const dy = my - key.cy
          const dist = Math.sqrt(dx*dx + dy*dy)
          const hovered = dist < 80
          const isRE = key.isRE

          // EN label — top-left of key, large
          const enAlpha = hovered ? 1 : (isRE ? 0.95 : 0.7)
          const enColor = isRE
            ? `rgba(255,110,20,${enAlpha})`
            : hovered
              ? `rgba(255,160,60,1)`
              : `rgba(220,200,170,${enAlpha})`

          // font size based on key unit size
          const keyW = Math.sqrt((tr[0]-tl[0])**2 + (tr[1]-tl[1])**2)
          const fontSize = Math.max(8, Math.min(keyW * 0.28, 14))
          ctx.font = `bold ${fontSize}px 'Play', monospace`
          ctx.fillStyle = enColor
          ctx.shadowBlur = isRE ? 8 : (hovered ? 6 : 0)
          ctx.shadowColor = "rgba(255,100,20,0.9)"

          // EN text top-right corner area
          const enX = tl[0] + (tr[0]-tl[0]) * 0.62 + (bl[0]-tl[0]) * 0.18
          const enY = tl[1] + (tr[1]-tl[1]) * 0.62 + (bl[1]-tl[1]) * 0.18 + fontSize * 0.8
          ctx.fillText(key.en, enX, enY)

          // RU label — bottom-left, smaller, dimmer
          if (key.ru) {
            const ruFontSize = Math.max(6, fontSize * 0.72)
            ctx.font = `${ruFontSize}px 'Play', monospace`
            const ruAlpha = isRE ? 0.85 : (hovered ? 0.9 : 0.45)
            const ruColor = isRE
              ? `rgba(255,130,30,${ruAlpha})`
              : hovered
                ? `rgba(255,170,80,${ruAlpha})`
                : `rgba(180,160,120,${ruAlpha})`
            ctx.fillStyle = ruColor
            ctx.shadowBlur = isRE ? 5 : 0

            const ruX = tl[0] + (tr[0]-tl[0]) * 0.12 + (bl[0]-tl[0]) * 0.65
            const ruY = tl[1] + (tr[1]-tl[1]) * 0.12 + (bl[1]-tl[1]) * 0.65 + ruFontSize
            ctx.fillText(key.ru, ruX, ruY)
          }

          ctx.shadowBlur = 0
        }
      }

      // Scanlines
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.055)"
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
