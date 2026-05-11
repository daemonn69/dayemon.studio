import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contacts } from '../data/contacts.js'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Contacts() {
  const { t } = useLang()

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-cream/60 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="chip">{t('contacts.chip')}</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[0.95] tracking-[-0.025em]">
                {t('contacts.heading1')}{' '}
                <span className="swash-underline italic">{t('contacts.heading2')}</span>?
              </h2>
              <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
                {t('contacts.subtitle')}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contacts.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group flex items-center justify-between rounded-2xl bg-bg p-3.5 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft sm:p-4"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white sm:h-10 sm:w-10">
                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-[11px] font-semibold text-muted sm:text-xs">{c.label}</div>
                        <div className="text-xs font-bold sm:text-sm">{c.value}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:w-[18px] sm:h-[18px]" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
