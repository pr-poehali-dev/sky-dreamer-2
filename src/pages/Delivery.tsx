import { useRef, useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const GEOJSON_URL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/russia.geojson"

// Delivery data per region
const DELIVERY_DATA: Record<string, { days: string; price: string; cities: { name: string; days: string; price: string }[] }> = {
  "Москва": { days: "1-2 дня", price: "от 350 ₽", cities: [{ name: "Москва", days: "1 день", price: "350 ₽" }, { name: "Зеленоград", days: "1 день", price: "350 ₽" }] },
  "Санкт-Петербург": { days: "2-3 дня", price: "от 400 ₽", cities: [{ name: "Санкт-Петербург", days: "2 дня", price: "400 ₽" }, { name: "Петергоф", days: "2 дня", price: "400 ₽" }] },
  "Московская область": { days: "1-2 дня", price: "от 400 ₽", cities: [{ name: "Подольск", days: "1 день", price: "400 ₽" }, { name: "Балашиха", days: "1 день", price: "400 ₽" }, { name: "Химки", days: "1 день", price: "400 ₽" }, { name: "Королёв", days: "2 дня", price: "450 ₽" }] },
  "Краснодарский край": { days: "3-5 дней", price: "от 500 ₽", cities: [{ name: "Краснодар", days: "3 дня", price: "500 ₽" }, { name: "Сочи", days: "4 дня", price: "550 ₽" }, { name: "Новороссийск", days: "4 дня", price: "520 ₽" }] },
  "Свердловская область": { days: "3-4 дня", price: "от 500 ₽", cities: [{ name: "Екатеринбург", days: "3 дня", price: "500 ₽" }, { name: "Нижний Тагил", days: "4 дня", price: "550 ₽" }] },
  "Новосибирская область": { days: "4-5 дней", price: "от 550 ₽", cities: [{ name: "Новосибирск", days: "4 дня", price: "550 ₽" }, { name: "Бердск", days: "5 дней", price: "580 ₽" }] },
  "Республика Татарстан": { days: "2-3 дня", price: "от 480 ₽", cities: [{ name: "Казань", days: "2 дня", price: "480 ₽" }, { name: "Набережные Челны", days: "3 дня", price: "520 ₽" }] },
  "Нижегородская область": { days: "2-3 дня", price: "от 450 ₽", cities: [{ name: "Нижний Новгород", days: "2 дня", price: "450 ₽" }, { name: "Дзержинск", days: "3 дня", price: "480 ₽" }] },
  "Красноярский край": { days: "5-7 дней", price: "от 600 ₽", cities: [{ name: "Красноярск", days: "5 дней", price: "600 ₽" }, { name: "Норильск", days: "7 дней", price: "900 ₽" }] },
  "Иркутская область": { days: "5-7 дней", price: "от 620 ₽", cities: [{ name: "Иркутск", days: "5 дней", price: "620 ₽" }, { name: "Братск", days: "6 дней", price: "680 ₽" }] },
  "Ростовская область": { days: "3-4 дня", price: "от 490 ₽", cities: [{ name: "Ростов-на-Дону", days: "3 дня", price: "490 ₽" }, { name: "Таганрог", days: "4 дня", price: "520 ₽" }] },
  "Самарская область": { days: "2-3 дня", price: "от 470 ₽", cities: [{ name: "Самара", days: "2 дня", price: "470 ₽" }, { name: "Тольятти", days: "3 дня", price: "490 ₽" }] },
  "Челябинская область": { days: "3-4 дня", price: "от 500 ₽", cities: [{ name: "Челябинск", days: "3 дня", price: "500 ₽" }, { name: "Магнитогорск", days: "4 дня", price: "560 ₽" }] },
  "Омская область": { days: "4-5 дней", price: "от 540 ₽", cities: [{ name: "Омск", days: "4 дня", price: "540 ₽" }] },
  "Пермский край": { days: "3-4 дня", price: "от 510 ₽", cities: [{ name: "Пермь", days: "3 дня", price: "510 ₽" }] },
  "Волгоградская область": { days: "3-4 дня", price: "от 490 ₽", cities: [{ name: "Волгоград", days: "3 дня", price: "490 ₽" }] },
  "Саратовская область": { days: "2-3 дня", price: "от 470 ₽", cities: [{ name: "Саратов", days: "2 дня", price: "470 ₽" }] },
  "Тюменская область": { days: "4-5 дней", price: "от 560 ₽", cities: [{ name: "Тюмень", days: "4 дня", price: "560 ₽" }] },
  "Кемеровская область": { days: "5-6 дней", price: "от 580 ₽", cities: [{ name: "Кемерово", days: "5 дней", price: "580 ₽" }, { name: "Новокузнецк", days: "5 дней", price: "590 ₽" }] },
  "Алтайский край": { days: "5-6 дней", price: "от 590 ₽", cities: [{ name: "Барнаул", days: "5 дней", price: "590 ₽" }] },
  "Приморский край": { days: "7-10 дней", price: "от 750 ₽", cities: [{ name: "Владивосток", days: "7 дней", price: "750 ₽" }, { name: "Уссурийск", days: "8 дней", price: "780 ₽" }] },
  "Хабаровский край": { days: "7-10 дней", price: "от 730 ₽", cities: [{ name: "Хабаровск", days: "7 дней", price: "730 ₽" }] },
  "Воронежская область": { days: "2-3 дня", price: "от 450 ₽", cities: [{ name: "Воронеж", days: "2 дня", price: "450 ₽" }] },
  "Ульяновская область": { days: "2-3 дня", price: "от 460 ₽", cities: [{ name: "Ульяновск", days: "2 дня", price: "460 ₽" }] },
  "Республика Башкортостан": { days: "3-4 дня", price: "от 510 ₽", cities: [{ name: "Уфа", days: "3 дня", price: "510 ₽" }] },
  "Оренбургская область": { days: "3-4 дня", price: "от 520 ₽", cities: [{ name: "Оренбург", days: "3 дня", price: "520 ₽" }] },
  "Удмуртская Республика": { days: "3-4 дня", price: "от 500 ₽", cities: [{ name: "Ижевск", days: "3 дня", price: "500 ₽" }] },
  "Кировская область": { days: "3-4 дня", price: "от 500 ₽", cities: [{ name: "Киров", days: "3 дня", price: "500 ₽" }] },
  "Тверская область": { days: "1-2 дня", price: "от 400 ₽", cities: [{ name: "Тверь", days: "1 день", price: "400 ₽" }] },
  "Ярославская область": { days: "1-2 дня", price: "от 400 ₽", cities: [{ name: "Ярославль", days: "2 дня", price: "400 ₽" }] },
  "Томская область": { days: "5-6 дней", price: "от 580 ₽", cities: [{ name: "Томск", days: "5 дней", price: "580 ₽" }] },
  "Забайкальский край": { days: "6-8 дней", price: "от 680 ₽", cities: [{ name: "Чита", days: "6 дней", price: "680 ₽" }] },
  "Бурятия": { days: "6-7 дней", price: "от 650 ₽", cities: [{ name: "Улан-Удэ", days: "6 дней", price: "650 ₽" }] },
  "Сахалинская область": { days: "9-12 дней", price: "от 900 ₽", cities: [{ name: "Южно-Сахалинск", days: "9 дней", price: "900 ₽" }] },
  "Мурманская область": { days: "4-5 дней", price: "от 580 ₽", cities: [{ name: "Мурманск", days: "4 дня", price: "580 ₽" }] },
  "Архангельская область": { days: "4-5 дней", price: "от 560 ₽", cities: [{ name: "Архангельск", days: "4 дня", price: "560 ₽" }] },
  "Вологодская область": { days: "2-3 дня", price: "от 450 ₽", cities: [{ name: "Вологда", days: "2 дня", price: "450 ₽" }, { name: "Череповец", days: "2 дня", price: "460 ₽" }] },
}

// All cities flat list for search
const ALL_CITIES = Object.entries(DELIVERY_DATA).flatMap(([region, data]) =>
  data.cities.map(city => ({ ...city, region }))
)

type GeoFeature = {
  type: string
  properties: { name: string }
  geometry: { type: string; coordinates: number[][][] | number[][][][] }
}

type RegionPath = {
  name: string
  edges: { x1: number; y1: number; x2: number; y2: number }[]
  centroid: [number, number]
  path: Path2D
}

// Project lon/lat → screen coords (Mercator-lite, clipped for Russia)
function project(lon: number, lat: number, W: number, H: number, bbox: number[]): [number, number] {
  const [minLon, minLat, maxLon, maxLat] = bbox
  const pad = 0.04
  const x = ((lon - minLon) / (maxLon - minLon)) * W * (1 - pad * 2) + W * pad
  // Flip Y, slight mercator correction
  const latRad = (lat * Math.PI) / 180
  const minLatRad = (minLat * Math.PI) / 180
  const maxLatRad = (maxLat * Math.PI) / 180
  const merc = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
  const mercMin = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2))
  const mercMax = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2))
  const y = (1 - (merc - mercMin) / (mercMax - mercMin)) * H * (1 - pad * 2) + H * pad
  return [x, y]
}

export default function Delivery() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const regionsRef = useRef<RegionPath[]>([])
  const hoveredRef = useRef<string | null>(null)

  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<typeof ALL_CITIES>([])
  const [assembled, setAssembled] = useState(false)

  // Search
  useEffect(() => {
    if (search.trim().length < 2) { setSearchResults([]); return }
    const q = search.toLowerCase()
    setSearchResults(ALL_CITIES.filter(c =>
      c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
    ).slice(0, 8))
  }, [search])

  const selectedData = selected ? DELIVERY_DATA[selected] : null

  // Canvas map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let startTime: number | null = null
    const DRAW_DURATION = 3800

    type Edge = { x1: number; y1: number; x2: number; y2: number; region: string }
    let allEdges: Edge[] = []
    let built = false

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      if (built) buildPaths()
    }

    // Russia bbox (exclude far east wrap-around islands)
    const BBOX = [19.6, 41.2, 170, 82]

    const buildPaths = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      allEdges = []

      const regions: RegionPath[] = []
      for (const feat of (window as unknown as { __russiaGeo: { features: GeoFeature[] } }).__russiaGeo?.features || []) {
        const name = feat.properties.name
        const geom = feat.geometry
        const polys: number[][][] =
          geom.type === "Polygon"
            ? [geom.coordinates as number[][][]][0]
            : geom.type === "MultiPolygon"
            ? (geom.coordinates as number[][][][]).map((p: number[][][]) => p[0]).flat(1) as unknown as number[][][]
            : []

        // flatten MultiPolygon properly
        const rings: number[][][] =
          geom.type === "MultiPolygon"
            ? (geom.coordinates as number[][][][]).map((p) => p[0])
            : (geom.coordinates as number[][][])

        const edges: Edge[] = []
        let sumX = 0, sumY = 0, ptCount = 0
        const path = new Path2D()

        for (const ring of rings) {
          let first = true
          for (const [lon, lat] of ring) {
            if (lon < 19 || lon > 172) continue
            const [sx, sy] = project(lon, lat, W, H, BBOX)
            if (first) { path.moveTo(sx, sy); first = false }
            else path.lineTo(sx, sy)
            sumX += sx; sumY += sy; ptCount++
          }
          path.closePath()

          // edges for animation
          for (let i = 0; i < ring.length - 1; i++) {
            const [lon1, lat1] = ring[i]
            const [lon2, lat2] = ring[i + 1]
            if (lon1 < 19 || lon1 > 172 || lon2 < 19 || lon2 > 172) continue
            const [x1, y1] = project(lon1, lat1, W, H, BBOX)
            const [x2, y2] = project(lon2, lat2, W, H, BBOX)
            edges.push({ x1, y1, x2, y2, region: name })
            allEdges.push({ x1, y1, x2, y2, region: name })
          }
        }

        regions.push({
          name,
          edges,
          centroid: ptCount > 0 ? [sumX / ptCount, sumY / ptCount] : [0, 0],
          path,
        })
      }
      regionsRef.current = regions
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      // hit test
      const ctx2 = canvas.getContext("2d")
      if (!ctx2) return
      let found: string | null = null
      for (const r of regionsRef.current) {
        if (ctx2.isPointInPath(r.path, mouseRef.current.x, mouseRef.current.y)) {
          found = r.name; break
        }
      }
      if (found !== hoveredRef.current) {
        hoveredRef.current = found
        setHovered(found)
        canvas.style.cursor = found ? "pointer" : "default"
      }
    }

    const onClick = () => {
      if (hoveredRef.current) setSelected(hoveredRef.current)
    }

    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("click", onClick)
    window.addEventListener("resize", resize)
    resize()

    const draw = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const t = Math.min(elapsed / DRAW_DURATION, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const progress = Math.floor(eased * allEdges.length)
      const isAssembled = t >= 1

      if (isAssembled && !assembled) setAssembled(true)

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#06070a"
      ctx.fillRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Mouse ambient glow
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
      grd.addColorStop(0, "rgba(255,100,20,0.07)")
      grd.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      // After assembly: draw filled regions
      if (isAssembled) {
        for (const r of regionsRef.current) {
          const isSel = r.name === selected
          const isHov = r.name === hoveredRef.current
          const hasData = !!DELIVERY_DATA[r.name]

          if (isSel) {
            ctx.fillStyle = "rgba(255,100,20,0.22)"
            ctx.fill(r.path)
            ctx.strokeStyle = "rgba(255,100,20,0.9)"
            ctx.lineWidth = 1.2
            ctx.stroke(r.path)
          } else if (isHov && hasData) {
            ctx.fillStyle = "rgba(255,100,20,0.10)"
            ctx.fill(r.path)
            ctx.strokeStyle = "rgba(255,100,20,0.55)"
            ctx.lineWidth = 0.8
            ctx.stroke(r.path)
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.02)"
            ctx.fill(r.path)
            ctx.strokeStyle = hasData ? "rgba(185,165,125,0.35)" : "rgba(120,110,90,0.15)"
            ctx.lineWidth = 0.5
            ctx.stroke(r.path)
          }
        }

        // Labels for selected / hovered
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        for (const r of regionsRef.current) {
          if (r.name !== selected && r.name !== hoveredRef.current) continue
          if (!DELIVERY_DATA[r.name]) continue
          const [cx, cy] = r.centroid
          const data = DELIVERY_DATA[r.name]
          ctx.font = "bold 11px 'Play', sans-serif"
          ctx.fillStyle = "rgba(255,140,40,0.95)"
          ctx.shadowBlur = 8
          ctx.shadowColor = "rgba(255,80,10,0.8)"
          ctx.fillText(r.name, cx, cy - 8)
          ctx.font = "9px 'Play', sans-serif"
          ctx.fillStyle = "rgba(255,200,150,0.8)"
          ctx.shadowBlur = 0
          ctx.fillText(data.price, cx, cy + 6)
        }
        ctx.textAlign = "left"
        ctx.textBaseline = "alphabetic"
        ctx.shadowBlur = 0
      } else {
        // Animation: draw edges
        for (let i = 0; i < progress; i++) {
          const e = allEdges[i]
          const age = (progress - i) / Math.max(progress, 1)
          const baseAlpha = Math.max(0.05, 0.5 - age * 0.38)
          const isFront = i > progress - 80

          ctx.shadowBlur = isFront ? 10 : 0
          ctx.shadowColor = "rgba(255,110,20,0.9)"

          ctx.strokeStyle = isFront
            ? `rgba(255,140,30,${Math.min(baseAlpha + 0.45, 1)})`
            : `rgba(185,165,125,${baseAlpha})`
          ctx.lineWidth = isFront ? 1.5 : 0.5

          ctx.beginPath()
          ctx.moveTo(e.x1, e.y1)
          ctx.lineTo(e.x2, e.y2)
          ctx.stroke()
        }
        ctx.shadowBlur = 0
      }

      // Scanlines
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.05)"
        ctx.fillRect(0, y, W, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    fetch(GEOJSON_URL)
      .then(r => r.json())
      .then(data => {
        ;(window as unknown as { __russiaGeo: unknown }).__russiaGeo = data
        built = true
        buildPaths()
        animId = requestAnimationFrame(draw)
      })

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("click", onClick)
      window.removeEventListener("resize", resize)
    }
  }, [selected, assembled])

  const handleCityClick = useCallback((region: string) => {
    setSelected(region)
    setSearch("")
    setSearchResults([])
  }, [])

  return (
    <div className="min-h-screen bg-[#06070a] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#06070a]/95 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-orbitron text-white/60 hover:text-primary transition-colors text-sm"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
        <h1 className="font-orbitron font-extrabold text-base tracking-wide">
          <span className="text-primary">RE</span><span className="text-white">клава</span>
          <span className="text-white/40 font-normal text-sm ml-3">/ Доставка</span>
        </h1>
        <div className="w-16" />
      </div>

      <div className="flex flex-1 pt-[57px] h-screen overflow-hidden">
        {/* Left panel */}
        <div className="w-[340px] flex-shrink-0 border-r border-white/10 flex flex-col bg-[#07080b] overflow-hidden">
          {/* Search */}
          <div className="p-5 border-b border-white/10">
            <p className="font-space-mono text-primary text-[10px] tracking-[0.3em] uppercase mb-3">Найти город</p>
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Москва, Казань, Сочи…"
                className="w-full bg-white/[0.04] border border-white/15 focus:border-primary/60 outline-none pl-9 pr-4 py-2.5 font-space-mono text-sm text-white placeholder:text-white/25 transition-colors"
              />
            </div>
            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="mt-2 border border-white/10 bg-[#0a0b0e]">
                {searchResults.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleCityClick(c.region)}
                    className="w-full text-left px-4 py-2.5 hover:bg-primary/10 transition-colors border-b border-white/5 last:border-0"
                  >
                    <p className="font-space-mono text-sm text-white">{c.name}</p>
                    <p className="font-space-mono text-[10px] text-white/40 mt-0.5">{c.region} · {c.days} · {c.price}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Region info */}
          <div className="flex-1 overflow-y-auto p-5">
            {selected && selectedData ? (
              <>
                <div className="mb-5">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-1.5 font-space-mono text-[10px] text-white/40 hover:text-primary transition-colors mb-4"
                  >
                    <Icon name="X" size={11} />
                    Сбросить
                  </button>
                  <h2 className="font-orbitron font-bold text-white text-base mb-1">{selected}</h2>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="font-space-mono text-[10px] text-white/40 uppercase tracking-widest">Срок</p>
                      <p className="font-orbitron text-sm text-primary font-bold mt-1">{selectedData.days}</p>
                    </div>
                    <div>
                      <p className="font-space-mono text-[10px] text-white/40 uppercase tracking-widest">Стоимость</p>
                      <p className="font-orbitron text-sm text-primary font-bold mt-1">{selectedData.price}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="font-space-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">Города</p>
                  <div className="space-y-2">
                    {selectedData.cities.map((city, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-3 px-4 bg-white/[0.03] border border-white/8 hover:border-primary/30 transition-colors"
                      >
                        <div>
                          <p className="font-space-mono text-sm text-white">{city.name}</p>
                          <p className="font-space-mono text-[10px] text-white/40 mt-0.5">{city.days}</p>
                        </div>
                        <p className="font-orbitron text-sm font-bold text-primary">{city.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-order-modal"))}
                  className="w-full mt-6 font-orbitron font-bold text-xs tracking-widest uppercase py-3.5 bg-primary text-white hover:bg-primary/85 transition-all duration-300"
                >
                  Заказать доставку
                </button>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center py-10">
                <Icon name="MapPin" size={32} className="text-primary/30 mb-4" />
                <p className="font-orbitron text-white/40 text-sm font-bold mb-2">Выберите регион</p>
                <p className="font-space-mono text-white/25 text-xs leading-relaxed">
                  Кликните по региону на карте или найдите свой город через поиск
                </p>
                <div className="mt-8 space-y-2 w-full">
                  <p className="font-space-mono text-[10px] text-white/30 uppercase tracking-widest mb-3">Быстрый выбор</p>
                  {["Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань"].map(city => (
                    <button
                      key={city}
                      onClick={() => setSelected(city)}
                      className="w-full text-left px-4 py-2.5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all font-space-mono text-sm text-white/60 hover:text-white"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info block */}
          <div className="border-t border-white/10 p-5 space-y-3">
            {[
              { icon: "Package", text: "СДЭК / Почта России / курьер" },
              { icon: "ShieldCheck", text: "Страховка включена" },
              { icon: "RotateCcw", text: "Возврат 14 дней" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon name={icon as "Package"} size={13} className="text-primary/60 flex-shrink-0" />
                <span className="font-space-mono text-[11px] text-white/40">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative overflow-hidden">
          {/* Hint */}
          {assembled && !selected && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <p className="font-space-mono text-[11px] text-white/35 tracking-widest uppercase bg-[#06070a]/80 px-4 py-2 border border-white/10">
                Кликните по региону
              </p>
            </div>
          )}
          {/* Hovered region tooltip */}
          {hovered && DELIVERY_DATA[hovered] && (
            <div
              className="absolute z-20 pointer-events-none bg-[#0a0b0e]/95 border border-primary/40 px-4 py-2.5 shadow-lg"
              style={{ left: mouseRef.current.x + 16, top: mouseRef.current.y - 10 }}
            >
              <p className="font-orbitron font-bold text-white text-xs">{hovered}</p>
              <p className="font-space-mono text-primary text-[11px] mt-0.5">{DELIVERY_DATA[hovered].days} · {DELIVERY_DATA[hovered].price}</p>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: "block" }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#06070a]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#06070a]/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
