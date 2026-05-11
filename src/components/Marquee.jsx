import { useLang } from '../i18n/LanguageContext.jsx'

const items = [
  'Blender',
  'Sculpting',
  'Cycles',
  'Eevee',
  'Substance Painter',
  'Lighting',
  'Texturing',
  'Rigging',
  'Hard-Surface',
  'Stylized',
]

function Row({ reverse = false, muted = false }) {
  return (
    <div className="flex shrink-0 items-center gap-6 px-4 sm:gap-10 sm:px-5">
      {items.map((it, i) => (
        <span
          key={`${reverse ? 'r' : 'f'}-${it}-${i}`}
          className={`flex items-center gap-6 font-display text-2xl font-black tracking-tight sm:gap-10 sm:text-3xl lg:text-4xl ${
            muted ? 'text-ink/25' : 'text-ink/80'
          }`}
        >
          {it}
          <span className="h-1 w-1 rounded-full bg-primary/70 sm:h-1.5 sm:w-1.5" aria-hidden />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const { t } = useLang()

  return (
    <section aria-label={t('marqueeLabel')} className="relative py-8 sm:py-10 lg:py-14">
      <div className="marquee-mask flex flex-col gap-3 overflow-hidden sm:gap-4">
        <div className="flex w-max animate-marquee">
          <Row />
          <Row />
        </div>
        <div className="flex w-max animate-marquee-reverse">
          <Row reverse muted />
          <Row reverse muted />
        </div>
      </div>
    </section>
  )
}
