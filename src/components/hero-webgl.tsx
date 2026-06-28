import { useRef, useEffect, useState } from "react"

type KeyDef = {
  col: number; row: number; w: number
  en: string; ru: string
  isRE: boolean
}

const KEY_ROWS: KeyDef[] = [
  // Row 0 — numbers
  { col: 0,    row: 0, w: 1,    en: "ESC",  ru: "",   isRE: false },
  { col: 1,    row: 0, w: 1,    en: "1",    ru: "1",  isRE: false },
  { col: 2,    row: 0, w: 1,    en: "2",    ru: "2",  isRE: false },
  { col: 3,    row: 0, w: 1,    en: "3",    ru: "3",  isRE: false },
  { col: 4,    row: 0, w: 1,    en: "4",    ru: "4",  isRE: false },
  { col: 5,    row: 0, w: 1,    en: "5",    ru: "5",  isRE: false },
  { col: 6,    row: 0, w: 1,    en: "6",    ru: "6",  isRE: false },
  { col: 7,    row: 0, w: 1,    en: "7",    ru: "7",  isRE: false },
  { col: 8,    row: 0, w: 1,    en: "8",    ru: "8",  isRE: false },
  { col: 9,    row: 0, w: 1,    en: "9",    ru: "9",  isRE: false },
  { col: 10,   row: 0, w: 1,    en: "0",    ru: "0",  isRE: false },
  { col: 11,   row: 0, w: 1,    en: "-",    ru: "-",  isRE: false },
  { col: 12,   row: 0, w: 1,    en: "=",    ru: "=",  isRE: false },
  { col: 13,   row: 0, w: 2,    en: "BKSP", ru: "",   isRE: false },

  // Row 1 — QWERTY / ЙЦУКЕН
  { col: 0,    row: 1, w: 1.5,  en: "TAB",  ru: "",   isRE: false },
  { col: 1.5,  row: 1, w: 1,    en: "Q",    ru: "Й",  isRE: false },
  { col: 2.5,  row: 1, w: 1,    en: "W",    ru: "Ц",  isRE: false },
  { col: 3.5,  row: 1, w: 1,    en: "E",    ru: "У",  isRE: true  },
  { col: 4.5,  row: 1, w: 1,    en: "R",    ru: "К",  isRE: true  },
  { col: 5.5,  row: 1, w: 1,    en: "T",    ru: "Е",  isRE: false },
  { col: 6.5,  row: 1, w: 1,    en: "Y",    ru: "Н",  isRE: false },
  { col: 7.5,  row: 1, w: 1,    en: "U",    ru: "Г",  isRE: false },
  { col: 8.5,  row: 1, w: 1,    en: "I",    ru: "Ш",  isRE: false },
  { col: 9.5,  row: 1, w: 1,    en: "O",    ru: "Щ",  isRE: false },
  { col: 10.5, row: 1, w: 1,    en: "P",    ru: "З",  isRE: false },
  { col: 11.5, row: 1, w: 1,    en: "[",    ru: "Х",  isRE: false },
  { col: 12.5, row: 1, w: 1,    en: "]",    ru: "Ъ",  isRE: false },
  { col: 13.5, row: 1, w: 1.5,  en: "\\",  ru: "",   isRE: false },

  // Row 2 — ASDF / ФЫВА
  { col: 0,    row: 2, w: 1.75, en: "CAPS", ru: "",   isRE: false },
  { col: 1.75, row: 2, w: 1,    en: "A",    ru: "Ф",  isRE: false },
  { col: 2.75, row: 2, w: 1,    en: "S",    ru: "Ы",  isRE: false },
  { col: 3.75, row: 2, w: 1,    en: "D",    ru: "В",  isRE: false },
  { col: 4.75, row: 2, w: 1,    en: "F",    ru: "А",  isRE: false },
  { col: 5.75, row: 2, w: 1,    en: "G",    ru: "П",  isRE: false },
  { col: 6.75, row: 2, w: 1,    en: "H",    ru: "Р",  isRE: false },
  { col: 7.75, row: 2, w: 1,    en: "J",    ru: "О",  isRE: false },
  { col: 8.75, row: 2, w: 1,    en: "K",    ru: "Л",  isRE: false },
  { col: 9.75, row: 2, w: 1,    en: "L",    ru: "Д",  isRE: false },
  { col: 10.75,row: 2, w: 1,    en: ";",    ru: "Ж",  isRE: false },
  { col: 11.75,row: 2, w: 1,    en: "'",    ru: "Э",  isRE: false },
  { col: 12.75,row: 2, w: 2.25, en: "ENTER",ru: "",   isRE: false },

  // Row 3 — ZXCV / ЯЧСМ
  { col: 0,    row: 3, w: 2.25, en: "SHIFT",ru: "",   isRE: false },
  { col: 2.25, row: 3, w: 1,    en: "Z",    ru: "Я",  isRE: false },
  { col: 3.25, row: 3, w: 1,    en: "X",    ru: "Ч",  isRE: false },
  { col: 4.25, row: 3, w: 1,    en: "C",    ru: "С",  isRE: false },
  { col: 5.25, row: 3, w: 1,    en: "V",    ru: "М",  isRE: false },
  { col: 6.25, row: 3, w: 1,    en: "B",    ru: "И",  isRE: false },
  { col: 7.25, row: 3, w: 1,    en: "N",    ru: "Т",  isRE: false },
  { col: 8.25, row: 3, w: 1,    en: "M",    ru: "Ь",  isRE: false },
  { col: 9.25, row: 3, w: 1,    en: ",",    ru: "Б",  isRE: false },
  { col: 10.25,row: 3, w: 1,    en: ".",    ru: "Ю",  isRE: false },
  { col: 11.25,row: 3, w: 1,    en: "/",    ru: ".",  isRE: false },
  { col: 12.25,row: 3, w: 2.75, en: "SHIFT",ru: "",   isRE: false },

  // Row 4 — bottom
  { col: 0,    row: 4, w: 1.25, en: "CTRL", ru: "",   isRE: false },
  { col: 1.25, row: 4, w: 1,    en: "WIN",  ru: "",   isRE: false },
  { col: 2.25, row: 4, w: 1.25, en: "ALT",  ru: "",   isRE: false },
  { col: 3.5,  row: 4, w: 6.25, en: "",     ru: "",   isRE: false },
  { col: 9.75, row: 4, w: 1.25, en: "ALT",  ru: "",   isRE: false },
  { col: 11,   row: 4, w: 1,    en: "FN",   ru: "",   isRE: false },
  { col: 12,   row: 4, w: 2,    en: "CTRL", ru: "",   isRE: false },
]

const GRID_W = 15
const GRID_H = 5

export const Hero3DWebGL = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const btnShownRef = useRef(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [sloganVisible, setSloganVisible] = useState(false)
  const [btnVisible, setBtnVisible] = useState(false)

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
      x: number; y: number; w: number; h: number   // flat screen rect (no perspective)
      cx: number; cy: number
      isRE: boolean
      en: string; ru: string
      keyW: number  // pixel width of the key
    }

    let edges: Edge[] = []
    let keyRects: KeyRect[] = []
    // Per-key label opacity (0→1 fade in after assembly)
    const labelOpacity: number[] = []
    let labelAlphaStart = 0
    const DRAW_DURATION = 4000
    const LABEL_FADE_DURATION = 1200

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      build()
    }

    const build = () => {
      const W = canvas.width
      const H = canvas.height

      // Flat top-down view — no skew/perspective
      const kbdW = Math.min(W * 0.90, 1050)
      const UNIT = kbdW / GRID_W
      const kbdH = GRID_H * UNIT
      const kbdX = (W - kbdW) / 2
      const kbdY = (H - kbdH) / 2 - H * 0.04

      edges = []
      keyRects = []

      // Outer body rect
      const bodyEdges: [number,number,number,number][] = [
        [kbdX, kbdY, kbdX + kbdW, kbdY],
        [kbdX + kbdW, kbdY, kbdX + kbdW, kbdY + kbdH],
        [kbdX + kbdW, kbdY + kbdH, kbdX, kbdY + kbdH],
        [kbdX, kbdY + kbdH, kbdX, kbdY],
      ]
      for (const [x1, y1, x2, y2] of bodyEdges) {
        edges.push({ x1, y1, x2, y2, isRE: false })
      }

      // Row dividers
      for (let r = 1; r < GRID_H; r++) {
        edges.push({
          x1: kbdX, y1: kbdY + r * UNIT,
          x2: kbdX + kbdW, y2: kbdY + r * UNIT,
          isRE: false
        })
      }

      // Keys
      for (let ki = 0; ki < KEY_ROWS.length; ki++) {
        const key = KEY_ROWS[ki]
        const PAD = UNIT * 0.07

        const x = kbdX + key.col * UNIT + PAD
        const y = kbdY + key.row * UNIT + PAD
        const kw = key.w * UNIT - PAD * 2
        const kh = UNIT - PAD * 2

        // 4 sides of key
        edges.push({ x1: x,      y1: y,      x2: x + kw, y2: y,      isRE: key.isRE })
        edges.push({ x1: x + kw, y1: y,      x2: x + kw, y2: y + kh, isRE: key.isRE })
        edges.push({ x1: x + kw, y1: y + kh, x2: x,      y2: y + kh, isRE: key.isRE })
        edges.push({ x1: x,      y1: y + kh, x2: x,      y2: y,      isRE: key.isRE })

        // Inner bevel (smaller inset rect for keycap look)
        const BEV = PAD * 1.2
        edges.push({ x1: x+BEV,    y1: y+BEV,    x2: x+kw-BEV, y2: y+BEV,    isRE: key.isRE })
        edges.push({ x1: x+kw-BEV, y1: y+BEV,    x2: x+kw-BEV, y2: y+kh-BEV, isRE: key.isRE })
        edges.push({ x1: x+kw-BEV, y1: y+kh-BEV, x2: x+BEV,    y2: y+kh-BEV, isRE: key.isRE })
        edges.push({ x1: x+BEV,    y1: y+kh-BEV, x2: x+BEV,    y2: y+BEV,    isRE: key.isRE })

        keyRects.push({
          x, y, w: kw, h: kh,
          cx: x + kw / 2,
          cy: y + kh / 2,
          isRE: key.isRE,
          en: key.en,
          ru: key.ru,
          keyW: kw,
        })
        labelOpacity[ki] = 0
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

      // Track when assembly finished for label fade + button
      if (assembled && labelAlphaStart === 0) labelAlphaStart = now
      if (assembled && !btnShownRef.current) {
        btnShownRef.current = true
        setTimeout(() => setBtnVisible(true), 800)
      }

      const W = canvas.width
      const H = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#06070a"
      ctx.fillRect(0, 0, W, H)

      // Ambient mouse glow
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 280)
      grad.addColorStop(0, "rgba(250,110,20,0.07)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Key hover glow
      for (const key of keyRects) {
        const dx = mx - key.cx
        const dy = my - key.cy
        const dist = Math.sqrt(dx*dx + dy*dy)
        const radius = key.keyW * 1.1
        if (dist < radius) {
          const intensity = Math.pow(1 - dist / radius, 1.5)
          const color = key.isRE
            ? `rgba(255,90,10,${intensity * 0.5})`
            : `rgba(255,140,50,${intensity * 0.3})`
          const g = ctx.createRadialGradient(key.cx, key.cy, 0, key.cx, key.cy, radius * 1.5)
          g.addColorStop(0, color)
          g.addColorStop(1, "rgba(0,0,0,0)")
          ctx.fillStyle = g
          ctx.fillRect(0, 0, W, H)
        }
      }

      // Draw edges
      for (let i = 0; i < progress; i++) {
        const e = edges[i]
        const age = (progress - i) / Math.max(progress, 1)
        const baseAlpha = Math.max(0.06, 0.55 - age * 0.42)
        const isFront = i > progress - 50

        ctx.shadowBlur = isFront ? 12 : (e.isRE ? 6 : 0)
        ctx.shadowColor = e.isRE ? "rgba(255,80,10,1)" : "rgba(245,130,30,0.9)"

        if (isFront) {
          ctx.strokeStyle = `rgba(255,150,30,${Math.min(baseAlpha + 0.42, 1)})`
          ctx.lineWidth = 1.8
        } else if (e.isRE) {
          ctx.strokeStyle = `rgba(255,80,10,${baseAlpha + 0.22})`
          ctx.lineWidth = 1.2
        } else {
          ctx.strokeStyle = `rgba(185,165,125,${baseAlpha})`
          ctx.lineWidth = 0.65
        }

        ctx.beginPath()
        ctx.moveTo(e.x1, e.y1)
        ctx.lineTo(e.x2, e.y2)
        ctx.stroke()
      }
      ctx.shadowBlur = 0

      // Labels — fade in smoothly after assembly
      if (assembled) {
        const fadeElapsed = labelAlphaStart > 0 ? now - labelAlphaStart : 0

        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        for (let ki = 0; ki < keyRects.length; ki++) {
          const key = keyRects[ki]
          if (!key.en && !key.ru) continue

          // Smooth per-key staggered fade: keys appear left-to-right, top-to-bottom
          const stagger = ki / keyRects.length * 600
          const keyElapsed = Math.max(0, fadeElapsed - stagger)
          const alpha = Math.min(keyElapsed / LABEL_FADE_DURATION, 1)
          // ease in
          const easedAlpha = alpha * alpha * (3 - 2 * alpha)
          if (easedAlpha <= 0) continue

          const mx2 = mouseRef.current.x
          const my2 = mouseRef.current.y
          const dx = mx2 - key.cx
          const dy = my2 - key.cy
          const dist = Math.sqrt(dx*dx + dy*dy)
          const hovered = dist < key.keyW * 1.1
          const hoverBoost = hovered ? Math.pow(1 - dist / (key.keyW * 1.1), 1.5) : 0

          // Font size: fit inside key, cap for wide keys
          const enFontSize = Math.min(key.keyW * 0.24, 13)
          const ruFontSize = Math.min(key.keyW * 0.17, 9.5)

          const hasRu = !!key.ru

          // EN label position: if has RU — upper-right quadrant, else centered
          let enX = key.cx
          let enY = key.cy

          if (hasRu) {
            enX = key.cx + key.w * 0.18
            enY = key.cy - key.h * 0.17
          }

          // RE keys: brighter orange
          const enBaseAlpha = key.isRE ? 0.95 : 0.75
          const enFinalAlpha = Math.min(enBaseAlpha + hoverBoost * 0.25, 1) * easedAlpha
          const enColor = key.isRE
            ? `rgba(255,100,20,${enFinalAlpha})`
            : hovered
              ? `rgba(255,165,70,${enFinalAlpha})`
              : `rgba(220,200,165,${enFinalAlpha})`

          ctx.font = `bold ${enFontSize}px 'Play', sans-serif`
          ctx.fillStyle = enColor
          ctx.shadowBlur = key.isRE ? 8 : (hovered ? 5 : 0)
          ctx.shadowColor = "rgba(255,90,15,0.9)"
          ctx.fillText(key.en, enX, enY)

          // RU label: lower-left quadrant
          if (hasRu) {
            const ruX = key.cx - key.w * 0.18
            const ruY = key.cy + key.h * 0.2
            const ruBaseAlpha = key.isRE ? 0.85 : 0.5
            const ruFinalAlpha = Math.min(ruBaseAlpha + hoverBoost * 0.2, 1) * easedAlpha
            const ruColor = key.isRE
              ? `rgba(255,120,30,${ruFinalAlpha})`
              : hovered
                ? `rgba(255,175,90,${ruFinalAlpha})`
                : `rgba(180,160,115,${ruFinalAlpha})`

            ctx.font = `${ruFontSize}px 'Play', sans-serif`
            ctx.fillStyle = ruColor
            ctx.shadowBlur = key.isRE ? 5 : 0
            ctx.fillText(key.ru, ruX, ruY)
          }

          ctx.shadowBlur = 0
        }

        ctx.textAlign = "left"
        ctx.textBaseline = "alphabetic"
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
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#06070a] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#06070a] to-transparent" />
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

        {/* CTA button */}
        <div className={`mt-10 pointer-events-auto transition-all duration-700 ${btnVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <button
            onClick={() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })}
            className="relative group font-orbitron font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 border border-primary/60 text-primary overflow-hidden transition-all duration-300 hover:border-primary hover:text-white"
          >
            {/* fill animation on hover */}
            <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10">Заказать сборку</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero3DWebGL