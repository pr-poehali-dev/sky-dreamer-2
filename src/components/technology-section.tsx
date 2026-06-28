import { useState } from "react"
import Icon from "@/components/ui/icon"

const KEYBOARDS = [
  {
    id: 1,
    name: "RE Entry",
    subtitle: "Старт в мире механики",
    price: "от 6 900 ₽",
    size: "TKL 87%",
    switch: "Gateron Red / Brown",
    material: "ABS пластик",
    polling: "1000 Гц",
    hotswap: false,
    rgb: true,
    tag: null,
    desc: "Идеальный вход в мир механических клавиатур. Тихий, быстрый, надёжный.",
  },
  {
    id: 2,
    name: "RE Pro 65",
    subtitle: "Компактная рабочая лошадь",
    price: "от 14 900 ₽",
    size: "65% 68 клавиш",
    switch: "Akko / Boba U4 / Kailh",
    material: "Алюминиевый корпус",
    polling: "1000 Гц",
    hotswap: true,
    rgb: true,
    tag: "Хит",
    desc: "Горячая замена свитчей, алюминий, прокладка — всё для ежедневной работы и игр.",
  },
  {
    id: 3,
    name: "RE Tactile 75",
    subtitle: "Тактильное удовольствие",
    price: "от 18 500 ₽",
    size: "75% 84 клавиши",
    switch: "Boba U4T / Holy Pandas",
    material: "Алюминий + пенная прокладка",
    polling: "1000 Гц",
    hotswap: true,
    rgb: false,
    tag: null,
    desc: "Глубокий тактильный отклик без шума. Для тех, кто ценит ощущение каждого нажатия.",
  },
  {
    id: 4,
    name: "RE Speed 60",
    subtitle: "Для киберспорта",
    price: "от 21 000 ₽",
    size: "60% 61 клавиша",
    switch: "Kailh Speed Silver / Gateron Optical",
    material: "Алюминий CNC",
    polling: "8000 Гц",
    hotswap: true,
    rgb: true,
    tag: "Топ скорость",
    desc: "8000 Гц поллинг, оптические свитчи, латентность до нуля. Конкурентное преимущество.",
  },
  {
    id: 5,
    name: "RE Silent Full",
    subtitle: "Тишина без компромиссов",
    price: "от 16 200 ₽",
    size: "Full 104 клавиши",
    switch: "Gateron Silent / Durock Shrimp",
    material: "Алюминий + foam",
    polling: "1000 Гц",
    hotswap: true,
    rgb: true,
    tag: null,
    desc: "Смазанные тихие свитчи + foam-прокладки. Офис, стрим, запись — ни один звук не просочится.",
  },
  {
    id: 6,
    name: "RE Custom",
    subtitle: "Полностью под вас",
    price: "от 35 000 ₽",
    size: "Любой форм-фактор",
    switch: "Ваш выбор из 60+ вариантов",
    material: "Латунная плита + алюминий",
    polling: "8000 Гц",
    hotswap: true,
    rgb: true,
    tag: "Премиум",
    desc: "Кастом-кейкапы, авторская покраска, индивидуальный дизайн. Ваша клавиатура — ваши правила.",
  },
]

export function TechnologySection() {
  const [active, setActive] = useState<number | null>(null)

  const openOrder = () => {
    window.dispatchEvent(new CustomEvent("open-order-modal"))
  }

  return (
    <section id="technology" className="py-24 px-6 bg-[#07080b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-space-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">Каталог</p>
          <h2 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white mb-5 tracking-wide">
            Механические <span className="text-primary">клавиатуры</span>
          </h2>
          <p className="text-white/50 font-space-mono max-w-xl mx-auto leading-relaxed">
            Каждая сборка — индивидуальна. Выберите модель как основу и мы подберём под вас свитчи, кейкапы и корпус.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {KEYBOARDS.map((kb) => (
            <div
              key={kb.id}
              className={`relative border rounded-sm p-6 cursor-pointer transition-all duration-300 group
                ${active === kb.id
                  ? "border-primary bg-primary/5 shadow-[0_0_24px_rgba(255,100,20,0.15)]"
                  : "border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-white/[0.04]"
                }`}
              onClick={() => setActive(active === kb.id ? null : kb.id)}
            >
              {/* Tag */}
              {kb.tag && (
                <span className="absolute top-4 right-4 font-space-mono text-[10px] tracking-widest uppercase text-primary border border-primary/50 px-2 py-0.5">
                  {kb.tag}
                </span>
              )}

              {/* Title */}
              <div className="mb-4">
                <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-primary transition-colors">
                  {kb.name}
                </h3>
                <p className="font-space-mono text-white/40 text-xs mt-1 tracking-wide">{kb.subtitle}</p>
              </div>

              {/* Price */}
              <p className="font-orbitron text-2xl font-extrabold text-primary mb-5">{kb.price}</p>

              {/* Specs */}
              <div className="space-y-2 mb-5">
                {[
                  { icon: "Keyboard", label: kb.size },
                  { icon: "Zap", label: kb.switch },
                  { icon: "Box", label: kb.material },
                  { icon: "Activity", label: kb.polling },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon name={icon as "Zap"} size={13} className="text-primary/70 flex-shrink-0" />
                    <span className="font-space-mono text-xs text-white/60">{label}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-5">
                {kb.hotswap && (
                  <span className="text-[10px] font-space-mono tracking-widest border border-white/20 text-white/50 px-2 py-0.5">
                    HOT-SWAP
                  </span>
                )}
                {kb.rgb && (
                  <span className="text-[10px] font-space-mono tracking-widest border border-white/20 text-white/50 px-2 py-0.5">
                    RGB
                  </span>
                )}
              </div>

              {/* Expandable desc */}
              <div className={`overflow-hidden transition-all duration-300 ${active === kb.id ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="font-space-mono text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4 mb-4">
                  {kb.desc}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); openOrder() }}
                  className="w-full font-orbitron text-xs font-bold tracking-widest uppercase py-3 bg-primary text-white hover:bg-primary/85 transition-colors"
                >
                  Заказать эту модель
                </button>
              </div>

              {/* Chevron */}
              <div className={`absolute bottom-4 right-4 transition-transform duration-300 ${active === kb.id ? "rotate-180" : ""}`}>
                <Icon name="ChevronDown" size={16} className="text-white/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-space-mono text-white/40 text-sm mb-5">Не нашли нужную конфигурацию?</p>
          <button
            onClick={openOrder}
            className="font-orbitron font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 border border-primary/60 text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Обсудить индивидуальный заказ
          </button>
        </div>
      </div>
    </section>
  )
}
