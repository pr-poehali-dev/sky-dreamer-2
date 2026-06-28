import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-orbitron text-2xl font-bold mb-4 tracking-wider">
              <span className="text-primary">RE</span><span className="text-white">клава</span>
            </h2>
            <p className="font-space-mono text-gray-300 mb-6 max-w-md">
              Механические клавиатуры и игровые ПК на заказ. Собираем под ваш стиль игры — с тестами и гарантией.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Продукция</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#technology"
                  className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  Клавиатуры
                </a>
              </li>
              <li>
                <a
                  href="#applications"
                  className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  Сборка ПК
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  Апгрейд
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  Вопросы
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200">
                  О нас
                </a>
              </li>
              <li>
                <a href="#technology" className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="#faq" className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200">
                  Доставка
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-order-modal"))}
                  className="font-space-mono text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  Контакты
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-space-mono text-gray-400 text-sm">2025 REклава. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="font-space-mono text-gray-400 hover:text-primary text-sm transition-colors duration-200"
              >
                Конфиденциальность
              </a>
              <a
                href="#"
                className="font-space-mono text-gray-400 hover:text-primary text-sm transition-colors duration-200"
              >
                Условия использования
              </a>
              <a
                href="#"
                className="font-space-mono text-gray-400 hover:text-primary text-sm transition-colors duration-200"
              >
                Гарантия
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}