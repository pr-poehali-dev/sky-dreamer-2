import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"

const SERVICES = [
  "Механическая клавиатура",
  "Игровой ПК",
  "Офисный ПК",
  "Апгрейд / Ремонт",
  "Консультация",
]

export function OrderModal() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", contact: "", service: "", budget: "", comment: "" })

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("open-order-modal", handler)
    return () => window.removeEventListener("open-order-modal", handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Имитация отправки — здесь можно подключить реальный бэкенд
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => { setSent(false); setForm({ name: "", contact: "", service: "", budget: "", comment: "" }) }, 400)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0a0b0e] border border-primary/30 shadow-[0_0_60px_rgba(255,100,20,0.12)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
          <div>
            <h2 className="font-orbitron font-extrabold text-white text-lg tracking-wide">
              <span className="text-primary">RE</span> Заказать сборку
            </h2>
            <p className="font-space-mono text-white/40 text-xs mt-1">Ответим в течение 2 часов</p>
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-primary transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={28} className="text-primary" />
              </div>
              <h3 className="font-orbitron font-bold text-white text-lg mb-3">Заявка принята!</h3>
              <p className="font-space-mono text-white/50 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                Мы свяжемся с вами в течение 2 часов и обсудим все детали сборки.
              </p>
              <button
                onClick={handleClose}
                className="font-orbitron text-xs font-bold tracking-widest uppercase px-8 py-3 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Имя */}
              <div>
                <label className="font-space-mono text-xs text-white/50 tracking-widest uppercase block mb-2">Имя *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Как вас зовут?"
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-primary/60 outline-none px-4 py-3 font-space-mono text-sm text-white placeholder:text-white/25 transition-colors"
                />
              </div>

              {/* Контакт */}
              <div>
                <label className="font-space-mono text-xs text-white/50 tracking-widest uppercase block mb-2">Телефон или Telegram *</label>
                <input
                  required
                  value={form.contact}
                  onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                  placeholder="+7 999 000 00 00 или @username"
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-primary/60 outline-none px-4 py-3 font-space-mono text-sm text-white placeholder:text-white/25 transition-colors"
                />
              </div>

              {/* Услуга */}
              <div>
                <label className="font-space-mono text-xs text-white/50 tracking-widest uppercase block mb-2">Что нужно?</label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(s => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setForm(f => ({ ...f, service: s }))}
                      className={`font-space-mono text-xs px-3 py-1.5 border transition-all duration-200
                        ${form.service === s
                          ? "border-primary text-primary bg-primary/10"
                          : "border-white/15 text-white/50 hover:border-white/30"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Бюджет */}
              <div>
                <label className="font-space-mono text-xs text-white/50 tracking-widest uppercase block mb-2">Примерный бюджет</label>
                <input
                  value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  placeholder="например: 80 000 ₽"
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-primary/60 outline-none px-4 py-3 font-space-mono text-sm text-white placeholder:text-white/25 transition-colors"
                />
              </div>

              {/* Комментарий */}
              <div>
                <label className="font-space-mono text-xs text-white/50 tracking-widest uppercase block mb-2">Задачи / пожелания</label>
                <textarea
                  rows={3}
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Для каких игр, какой стиль работы, особые пожелания…"
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-primary/60 outline-none px-4 py-3 font-space-mono text-sm text-white placeholder:text-white/25 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full font-orbitron font-bold text-sm tracking-[0.2em] uppercase py-4 bg-primary text-white hover:bg-primary/85 disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Icon name="Loader" size={16} className="animate-spin" />
                    Отправляем…
                  </>
                ) : "Отправить заявку"}
              </button>

              <p className="font-space-mono text-white/25 text-[10px] text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
