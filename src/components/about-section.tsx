import Icon from "@/components/ui/icon"

const STATS = [
  { value: "340+", label: "Сборок выполнено" },
  { value: "4.9", label: "Рейтинг клиентов" },
  { value: "3 года", label: "Гарантия" },
  { value: "48 ч", label: "Среднее время сборки" },
]


const VALUES = [
  { icon: "ShieldCheck", title: "Честность", desc: "Говорим как есть: что реально нужно, а что переплата." },
  { icon: "Microscope", title: "Точность", desc: "Каждая сборка проходит 48-часовое тестирование под нагрузкой." },
  { icon: "HeartHandshake", title: "Забота", desc: "На связи после покупки. Решаем любые вопросы быстро." },
  { icon: "Trophy", title: "Результат", desc: "Не продаём коробку — решаем задачу. Гарантия на всё." },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-[#07080b]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-space-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">О нас</p>
          <h2 className="font-orbitron font-extrabold text-4xl md:text-5xl text-white mb-5 tracking-wide">
            Люди, которые <span className="text-primary">живут этим</span>
          </h2>
          <p className="text-white/50 font-space-mono max-w-2xl mx-auto leading-relaxed">
            REклава — это небольшая команда энтузиастов из Санкт-Петербурга. Мы не магазин, не завод.
            Мы сами пользуемся тем, что собираем — и собираем только то, чем гордимся.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-20">
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-[#07080b] py-10 px-6 text-center">
              <p className="font-orbitron font-extrabold text-3xl md:text-4xl text-primary mb-2">{value}</p>
              <p className="font-space-mono text-xs text-white/50 tracking-wide uppercase">{label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="border border-white/10 p-8 md:p-12">
          <p className="font-space-mono text-primary text-xs tracking-[0.3em] uppercase mb-8 text-center">Наши принципы</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start">
                <Icon name={icon as "Trophy"} size={20} className="text-primary mb-3" />
                <h5 className="font-orbitron font-bold text-white text-sm mb-2">{title}</h5>
                <p className="font-space-mono text-xs text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}