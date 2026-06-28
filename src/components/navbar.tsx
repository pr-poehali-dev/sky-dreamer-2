import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-orbitron text-xl font-bold tracking-wider">
              <span className="text-primary">RE</span><span className="text-white">клава</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#technology"
                className="font-geist text-white hover:text-primary transition-colors duration-200"
              >
                Клавиатуры
              </a>
              <a href="#safety" className="font-geist text-white hover:text-primary transition-colors duration-200">
                Сборка ПК
              </a>
              <a href="#about" className="font-geist text-white hover:text-primary transition-colors duration-200">
                О нас
              </a>
              <button
                onClick={() => navigate("/delivery")}
                className="font-geist text-white hover:text-primary transition-colors duration-200"
              >
                Доставка
              </button>
              <a href="#faq" className="font-geist text-white hover:text-primary transition-colors duration-200">
                Вопросы
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-geist font-bold border-0"
              onClick={() => window.dispatchEvent(new CustomEvent("open-order-modal"))}
            >
              Заказать сборку
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/98 border-t border-primary/20">
              <a
                href="#technology"
                className="block px-3 py-2 font-geist text-white hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Клавиатуры
              </a>
              <a
                href="#safety"
                className="block px-3 py-2 font-geist text-white hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Сборка ПК
              </a>
              <a
                href="#about"
                className="block px-3 py-2 font-geist text-white hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                О нас
              </a>
              <button
                className="block w-full text-left px-3 py-2 font-geist text-white hover:text-primary transition-colors duration-200"
                onClick={() => { setIsOpen(false); navigate("/delivery") }}
              >
                Доставка
              </button>
              <a
                href="#faq"
                className="block px-3 py-2 font-geist text-white hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Вопросы
              </a>
              <div className="px-3 py-2">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-geist font-bold border-0"
                  onClick={() => { setIsOpen(false); window.dispatchEvent(new CustomEvent("open-order-modal")) }}
                >
                  Заказать сборку
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}