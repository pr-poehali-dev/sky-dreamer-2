import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Сколько времени занимает сборка?",
      answer:
        "Кастомная клавиатура — обычно 5-10 дней в зависимости от наличия свитчей и кейкапов. Сборка ПК — 3-7 дней после поступления всех комплектующих. Точные сроки называем при оформлении заказа.",
    },
    {
      question: "Можно ли выбрать свитчи и кейкапы самому?",
      answer:
        "Конечно. Вы выбираете тип свитчей (линейные, тактильные, кликающие), профиль и материал кейкапов, цвет и подсветку. Если не уверены — поможем подобрать под ваш стиль игры.",
    },
    {
      question: "Вы собираете ПК из моих комплектующих?",
      answer:
        "Да, можем собрать из ваших деталей или подобрать всё под ключ в рамках бюджета. Также делаем апгрейд существующих ПК и чистку с заменой термопасты.",
    },
    {
      question: "Какая гарантия на сборку?",
      answer:
        "На клавиатуры и ПК-сборки даём гарантию 3 года. Каждое устройство проходит стресс-тесты перед отправкой, а в течение гарантии — бесплатная диагностика.",
    },
    {
      question: "Доставляете в другие города?",
      answer:
        "Да, отправляем по всей России надёжными службами доставки в защитной упаковке. ПК фиксируем внутри корпуса, чтобы комплектующие не пострадали в пути.",
    },
    {
      question: "Что такое hot-swap и зачем он мне?",
      answer:
        "Hot-swap позволяет менять свитчи без пайки — просто вынимаете старый и вставляете новый. Это значит, что вы сможете экспериментировать со звуком и ощущениями в любой момент.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron uppercase tracking-wide">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Всё о сроках, выборе комплектующих, гарантии и доставке.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-primary/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-primary font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}