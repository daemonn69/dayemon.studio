import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { X, ImageIcon, ArrowUpRight } from 'lucide-react'
import { works } from '../data/works.js'

function PreviewImage({ src, palette = ['#B57BFF', '#FFB4D9'], title }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div
        className="relative grid h-full w-full place-items-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
        }}
      >
        {/* decorative rings */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
        <div className="absolute -left-8 -bottom-8 h-28 w-28 rounded-full border border-white/20" />
        <div className="flex flex-col items-center gap-2 text-white/90">
          <ImageIcon size={28} />
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
        </div>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={title}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      loading="lazy"
    />
  )
}

function WorkCard({ w, index, onOpen }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 })
  const rY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 })

  // Detect touch device
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const onMove = (e) => {
    if (isTouch) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onClick={() => onOpen(w)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        rotateX: rX, 
        rotateY: rY, 
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      className="group relative text-left will-change-transform transition-transform duration-300 ease-spring hover:-translate-y-1 h-full"
    >
      <div className="h-full overflow-hidden rounded-3xl bg-card shadow-[0_1px_0_0_rgba(27,18,48,0.04),0_0_0_1px_rgba(27,18,48,0.05)] transition-shadow duration-300 ease-spring group-hover:shadow-[0_24px_60px_-28px_rgba(70,40,110,0.32),0_0_0_1px_rgba(27,18,48,0.05)] flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <PreviewImage src={w.image} palette={w.palette} title={w.title} />
          {/* gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          {/* shine sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -inset-y-10 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
          </div>
          {/* arrow badge */}
          <div className="absolute right-4 top-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-ink opacity-0 ring-1 ring-ink/5 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={16} strokeWidth={2.4} />
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {w.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted ring-1 ring-ink/8 transition group-hover:text-ink group-hover:ring-ink/20"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-3 font-display text-xl font-bold tracking-tight transition group-hover:text-primaryDark">
            {w.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {w.description}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="works" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="chip">Портфолио</span>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.025em]">
              Избранные <span className="gradient-text">работы</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-relaxed text-muted md:block">
            Стилизованные сцены, персонажи и продуктовые рендеры. Кликай по карточке,
            чтобы посмотреть подробнее.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <WorkCard key={w.id} w={w} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="card relative w-full max-w-5xl overflow-hidden"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink ring-1 ring-ink/10 hover:bg-white"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
              <div className="relative flex items-center justify-center bg-bg p-4 sm:p-8">
                <img
                  src={active.image}
                  alt={active.title}
                  className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span key={t} className="rounded-full bg-bg px-2.5 py-0.5 text-xs font-semibold text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold">{active.title}</h3>
                <p className="mt-2 text-muted">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
