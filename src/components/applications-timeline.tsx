import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline() {
  const data = [
    {
      title: "1. Обсуждаем задачу",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Узнаём, во что вы играете и какой бюджет. Подбираем тип клавиатуры и конфигурацию ПК
            под ваши цели — без переплат за то, что вам не нужно.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Анализ ваших игр и сценариев использования
            </div>
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Подбор форм-фактора: 60%, TKL или фулл-сайз
            </div>
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Расчёт сборки под бюджет и FPS-цели
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. Собираем под вас",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Заказываем комплектующие, смазываем свитчи и стабилизаторы, собираем корпус и кабель-менеджмент.
            Каждая деталь — на ваш вкус, от цвета кейкапов до подсветки.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Смазка свитчей и тюнинг стабилизаторов
            </div>
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Аккуратный кабель-менеджмент в ПК
            </div>
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Кастомная RGB-подсветка и кейкапы
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. Тест и доставка",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Прогоняем стресс-тесты, проверяем каждую клавишу и температуры под нагрузкой.
            Упаковываем и отправляем готовое устройство с гарантией.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Стресс-тест ПК и проверка стабильности
            </div>
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Тест всех клавиш и подсветки
            </div>
            <div className="flex items-center gap-3 text-primary text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Доставка по РФ и гарантия 3 года
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="applications" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide">Как мы работаем</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            От первой заявки до готового устройства у вас на столе — прозрачный процесс из трёх шагов,
            где каждая деталь под вашим контролем.
          </p>
        </div>

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}