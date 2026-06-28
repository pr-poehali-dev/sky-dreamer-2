import Icon from "@/components/ui/icon"

const PC_BUILDS = [
  {
    name: "RE Office",
    tag: null,
    price: "от 35 000 ₽",
    cpu: "Intel Core i3 / Ryzen 5",
    gpu: "Встроенная / GTX 1650",
    ram: "16 GB DDR4",
    storage: "512 GB NVMe SSD",
    use: "Офис, браузер, Zoom, документы",
    icon: "Monitor",
  },
  {
    name: "RE Game",
    tag: "Популярный",
    price: "от 75 000 ₽",
    cpu: "Ryzen 5 7600X / i5-13600K",
    gpu: "RTX 4060 / RX 7700 XT",
    ram: "32 GB DDR5",
    storage: "1 TB NVMe SSD",
    use: "1080p / 1440p игры, 144+ FPS",
    icon: "Gamepad2",
  },
  {
    name: "RE Pro",
    tag: "Хит",
    price: "от 130 000 ₽",
    cpu: "Ryzen 7 7800X3D / i7-14700K",
    gpu: "RTX 4070 Ti / RX 7900 XT",
    ram: "32 GB DDR5",
    storage: "2 TB NVMe SSD",
    use: "4K игры, стриминг, монтаж",
    icon: "Cpu",
  },
  {
    name: "RE Ultra",
    tag: "Максимум",
    price: "от 220 000 ₽",
    cpu: "Ryzen 9 7950X / i9-14900K",
    gpu: "RTX 4090",
    ram: "64 GB DDR5",
    storage: "4 TB NVMe SSD",
    use: "4K+, 3D, AI, рендер, всё",
    icon: "Zap",
  },
]

const UPGRADE_SERVICES = [
  { icon: "HardDrive", title: "Замена на SSD", desc: "Ваш ПК начнёт загружаться за 10 секунд", price: "от 2 000 ₽" },
  { icon: "MemoryStick", title: "Апгрейд RAM", desc: "Добавим памяти — прощай тормоза в браузере", price: "от 3 500 ₽" },
  { icon: "Monitor", title: "Новая видеокарта", desc: "Подберём GPU под ваши игры и бюджет", price: "от 5 000 ₽" },
  { icon: "Wind", title: "Чистка и термопаста", desc: "Снизим температуру на 10–20°C, шум уйдёт", price: "от 1 500 ₽" },
  { icon: "Power", title: "Замена БП", desc: "Надёжный блок питания — основа стабильности", price: "от 4 000 ₽" },
  { icon: "Wrench", title: "Диагностика", desc: "Найдём и устраним любую проблему с ПК", price: "от 1 000 ₽" },
]

export function SafetySection() {
  const openOrder = () => {
    window.dispatchEvent(new CustomEvent("open-order-modal"))
  }

  return (
    <section id="safety" className="py-24 px-6 bg-[#06070a]">
      <div className="max-w-7xl mx-auto">

        {/* ── Сборка ПК ── */}
        <div className="text-center mb-16">
          <p className="font-space-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">Сборка под ключ</p>
          <h2 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white mb-5 tracking-wide">
            Игровые <span className="text-primary">ПК</span>
          </h2>
          <p className="text-white/50 font-space-mono max-w-xl mx-auto leading-relaxed">
            Собираем ПК под ваши задачи и бюджет. Тестируем каждый компонент перед отправкой. Гарантия 1 год.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-24">
          {PC_BUILDS.map((pc) => (
            <div
              key={pc.name}
              className="relative border border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300 p-6 group"
            >
              {pc.tag && (
                <span className="absolute top-4 right-4 font-space-mono text-[10px] tracking-widest uppercase text-primary border border-primary/50 px-2 py-0.5">
                  {pc.tag}
                </span>
              )}
              <div className="mb-5">
                <Icon name={pc.icon as "Monitor"} size={28} className="text-primary mb-3" />
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-primary transition-colors">{pc.name}</h3>
                <p className="font-orbitron text-xl font-extrabold text-primary mt-1">{pc.price}</p>
              </div>
              <div className="space-y-2 mb-6">
                {[
                  { label: "CPU", val: pc.cpu },
                  { label: "GPU", val: pc.gpu },
                  { label: "RAM", val: pc.ram },
                  { label: "SSD", val: pc.storage },
                ].map(({ label, val }) => (
                  <div key={label} className="flex gap-2">
                    <span className="font-space-mono text-[10px] text-primary/70 w-8 flex-shrink-0 mt-0.5">{label}</span>
                    <span className="font-space-mono text-xs text-white/60 leading-relaxed">{val}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mb-5">
                <p className="font-space-mono text-xs text-white/40 leading-relaxed">{pc.use}</p>
              </div>
              <button
                onClick={openOrder}
                className="w-full font-orbitron text-xs font-bold tracking-widest uppercase py-3 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Заказать
              </button>
            </div>
          ))}
        </div>

        {/* ── Апгрейд ── */}
        <div className="text-center mb-16">
          <p className="font-space-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">Сервис</p>
          <h2 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white mb-5 tracking-wide">
            Апгрейд <span className="text-primary">и ремонт</span>
          </h2>
          <p className="text-white/50 font-space-mono max-w-xl mx-auto leading-relaxed">
            Дышим вторую жизнь в ваш старый ПК. Диагностика, замена компонентов, чистка — всё быстро и с гарантией.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {UPGRADE_SERVICES.map((svc) => (
            <div
              key={svc.title}
              onClick={openOrder}
              className="flex gap-4 items-start border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-300 p-5 cursor-pointer group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-primary/30 flex-shrink-0 group-hover:border-primary transition-colors">
                <Icon name={svc.icon as "Wrench"} size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-orbitron font-bold text-sm text-white group-hover:text-primary transition-colors">{svc.title}</h4>
                  <span className="font-space-mono text-xs text-primary ml-2 flex-shrink-0">{svc.price}</span>
                </div>
                <p className="font-space-mono text-xs text-white/50 mt-1 leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
