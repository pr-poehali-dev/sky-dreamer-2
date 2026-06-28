export function CTASection() {
  const openOrder = () => window.dispatchEvent(new CustomEvent("open-order-modal"))

  return (
    <section id="order" className="py-24 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <h2 className="text-5xl font-bold text-foreground mb-6 font-orbitron uppercase tracking-wide text-balance">Соберём вашу машину</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Расскажите о своих играх и бюджете — и мы соберём клавиатуру или ПК мечты под ваши задачи.
            Без переплат, с гарантией и тестами перед отправкой.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openOrder}
              className="font-orbitron font-bold text-lg px-8 py-4 bg-primary text-white hover:bg-primary/85 transition-all duration-300 tracking-wide"
            >
              Заказать сборку
            </button>
            <button
              onClick={() => document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" })}
              className="font-orbitron font-bold text-lg px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 tracking-wide bg-transparent"
            >
              Узнать цены
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}