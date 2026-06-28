import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const features = [
  {
    title: "Кастомные свитчи",
    description: "Линейные, тактильные или кликающие — подбираем механику под ваш стиль игры. Hot-swap сокеты для замены без пайки.",
    icon: "Keyboard",
    badge: "Hot-swap",
  },
  {
    title: "Сборка ПК под задачу",
    description: "Подбираем комплектующие под ваш бюджет и игры — от киберспорта на 240 FPS до 4K-ультра. Без переплат за лишнее.",
    icon: "Cpu",
    badge: "Под заказ",
  },
  {
    title: "Молниеносный отклик",
    description: "Полный N-key rollover и опрос 8000 Гц. Каждое нажатие регистрируется мгновенно — ни одного пропущенного клика в бою.",
    icon: "Zap",
    badge: "8000 Гц",
  },
  {
    title: "Премиум-материалы",
    description: "Алюминиевый корпус, PBT-кейкапы с двойной отливкой и звукоизоляция. Глубокий thock-звук и долговечность на годы.",
    icon: "Gem",
    badge: "Алюминий",
  },
  {
    title: "RGB и кастом-дизайн",
    description: "Программируемая подсветка по слоям, артизан-кейкапы и гравировка. Соберём клавиатуру в вашей цветовой схеме.",
    icon: "Palette",
    badge: "RGB",
  },
  {
    title: "Гарантия и поддержка",
    description: "3 года гарантии на сборку, бесплатная диагностика и апгрейды. Тестируем каждое устройство перед отправкой.",
    icon: "ShieldCheck",
    badge: "3 года",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-orbitron uppercase tracking-wide">Собрано для победы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Каждая деталь подобрана так, чтобы дать вам преимущество в игре
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary">
                    <Icon name={feature.icon} size={32} />
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground font-semibold">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}