import { useEffect, useState } from 'react'

const links = [
  { href: '#home', label: 'Главная' },
  { href: '#works', label: 'Работы' },
  { href: '#about', label: 'Обо мне' },
  { href: '#contact', label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`flex items-center gap-0.5 rounded-full px-1.5 py-1.5 ring-1 ring-ink/5 transition-all duration-300 sm:gap-1 sm:px-2 sm:py-2 ${
          scrolled ? 'bg-white/85 shadow-soft backdrop-blur-xl' : 'bg-white/40 backdrop-blur'
        }`}
      >
        <a
          href="#home"
          className="group ml-1 mr-2 flex items-center gap-2 text-sm font-extrabold tracking-tight sm:ml-2 sm:mr-3"
        >
          <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-ink text-xs text-white transition-transform duration-500 group-hover:rotate-[20deg] sm:h-8 sm:w-8">
            <span className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/40 to-pink/40 opacity-0 transition group-hover:opacity-100" />
            <span className="relative">D</span>
          </span>
          <span className="hidden sm:inline">dayemon.studio</span>
        </a>
        <ul className="flex items-center gap-0.5">
          {links.map((l) => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 sm:py-2 sm:text-sm ${
                    isActive
                      ? 'text-ink'
                      : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-ink/5" />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
