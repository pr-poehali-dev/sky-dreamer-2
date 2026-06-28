import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Артём Соколов",
    role: "Стример, шутеры от первого лица",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Заказал кастомную TKL со смазанными свитчами — звук и отклик нереальные. После апгрейда реакция в перестрелках стала заметно быстрее.",
  },
  {
    name: "Дмитрий Орлов",
    role: "Киберспортсмен, CS",
    avatar: "/professional-woman-scientist.png",
    content:
      "Собрали ПК под 360 FPS строго в бюджет, ничего лишнего. Тесты прошли при мне, температуры в норме. Рекомендую за честный подход.",
  },
  {
    name: "Кристина Власова",
    role: "Контент-мейкер и геймер",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "Хотела клавиатуру в своей цветовой схеме с артизан-кейкапом — сделали точь-в-точь по референсу. Выглядит как из игры, печатать одно удовольствие.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-orbitron uppercase tracking-wide">Что говорят игроки</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Стримеры, киберспортсмены и геймеры о своих сборках от нас
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}