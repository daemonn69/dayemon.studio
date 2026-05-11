import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MousePointer2, Palette, Box } from 'lucide-react'
import CharacterScene from './CharacterScene.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100dvh-2rem)] items-center pb-8 pt-24 sm:pt-28 sm:pb-0 lg:pt-32"
    >
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <span className="chip">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t('hero.chip')}
            <span className="mx-1 h-3 w-px bg-ink/15" />
            <Sparkles size={12} className="text-primary" strokeWidth={2.4} />
            {t('hero.chipSep')}
          </span>

          <h1
            className="mt-6 font-display text-[clamp(3rem,7vw,5.75rem)] font-black leading-[0.9] tracking-[-0.035em] text-ink"
            style={{ textWrap: 'balance' }}
          >
            {t('hero.heading1')} <br />
            {t('hero.heading2')}{' '}
            <span className="relative inline-block">
              <span className="swash-underline italic">{t('hero.heading3')}</span>
            </span>
            <span className="gradient-text">.</span>
          </h1>

          <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            {t('hero.description')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#works" className="btn-primary group">
              {t('hero.cta')}
              <ArrowRight
                size={16}
                strokeWidth={2.2}
                className="relative transition-transform duration-300 ease-spring group-hover:translate-x-0.5"
              />
            </a>
            <a href="#contact" className="btn-text">
              {t('hero.ctaSecondary')}
            </a>
          </div>

          <div className="mt-12 hidden items-center gap-2 text-xs font-medium text-muted/80 sm:flex">
            <MousePointer2 size={13} strokeWidth={2} />
            {t('hero.hint')}
          </div>
        </motion.div>

        {/* Right — 3D character with orbiting decor */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative h-[50vh] min-h-[380px] sm:h-[60vh] sm:min-h-[460px] lg:h-[78vh]"
        >
          {/* soft circular glow backdrop */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 via-pink/15 to-cream/20 blur-3xl" />

          {/* rotating dashed orbit — hidden on mobile */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-ink/15 sm:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-ink/10 sm:block" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />

          {/* floating info bubbles — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute left-2 top-16 z-10 hidden animate-float-slow sm:block"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-ink/5 shadow-soft backdrop-blur">
              <Palette size={13} className="text-primary" />
              {t('hero.bubbleStyle')}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="absolute right-4 top-28 z-10 hidden animate-float-slow sm:block"
            style={{ animationDelay: '-3s' }}
          >
            <div className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-ink/5 shadow-soft backdrop-blur">
              <Box size={13} className="text-primaryDark" />
              Hard-Surface
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-24 right-6 z-10 hidden animate-float-slow sm:block"
            style={{ animationDelay: '-5s' }}
          >
            <div className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-ink/5 shadow-soft backdrop-blur">
              <Sparkles size={13} className="text-pink" />
              {t('hero.bubbleCycles')}
            </div>
          </motion.div>

          <CharacterScene />
        </motion.div>
      </div>
    </section>
  )
}
