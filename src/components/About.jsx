import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'

const skills = [
  'Blender',
  'Sculpting',
  'Hard-Surface',
  'Texturing',
  'Lighting',
  'Rigging',
  'Animation',
  'Substance Painter',
  'Cycles',
  'Eevee',
]

function AnimatedNumber({ value, duration = 1200 }) {
  const match = String(value).match(/(\d+)(.*)/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) { setN(target); return }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, reduceMotion])

  return <span ref={ref}>{n}{suffix}</span>
}

export default function About() {
  const { t } = useLang()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="card relative overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-pink/40 blur-2xl hidden sm:block animate-blob" />
          <div className="absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-primary/30 blur-2xl hidden sm:block animate-blob-2" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-pink/30 blur-2xl sm:hidden" />
          <div className="absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-primary/20 blur-2xl sm:hidden" />

          <span className="chip">{t('about.chip')}</span>
          <h3 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1] tracking-[-0.02em]">
            {t('about.heading1')} <span className="gradient-text">{t('about.heading2')}</span>
          </h3>
          <p className="mt-4 text-sm text-muted sm:text-base">
            {t('about.bio1')}
          </p>
          <p className="mt-3 text-sm text-muted sm:text-base">
            {t('about.bio2')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: isMobile ? 0 : 0.1 }}
          className="grid gap-5"
        >
          <div className="card p-5 sm:p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted sm:text-[11px]">
              {t('about.skillsLabel')}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {skills.map((s, i) => (
                isMobile ? (
                  <span
                    key={s}
                    className="cursor-default rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink ring-1 ring-ink/8 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    {s}
                  </span>
                ) : (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="cursor-default rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink ring-1 ring-ink/8 transition hover:-translate-y-0.5 hover:bg-primary/10 hover:ring-primary/30 sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    {s}
                  </motion.span>
                )
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-ink/10 px-2 py-2">
            <Stat value="2+" label={t('about.stat1Label')} />
            <Stat value="20+" label={t('about.stat2Label')} />
            <Stat value="2+" label={t('about.stat3Label')} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className="px-2 text-center sm:px-3">
      <div className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl">
        <AnimatedNumber value={value} />
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted sm:mt-1.5 sm:text-[11px] sm:tracking-[0.16em]">
        {label}
      </div>
    </div>
  )
}
