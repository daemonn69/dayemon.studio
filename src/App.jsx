import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Gallery from './components/Gallery.jsx'
import About from './components/About.jsx'
import Contacts from './components/Contacts.jsx'
import Footer from './components/Footer.jsx'
import { LanguageProvider, useLang } from './i18n/LanguageContext.jsx'

function AppInner() {
  const { t } = useLang()
  return (
    <div className="grain relative min-h-[100dvh] overflow-x-hidden">
      {/* ambient layers — blobs только на десктопе, dot grid везде */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px] hidden sm:block animate-blob" />
        <div className="absolute top-[30%] left-[-15%] h-[480px] w-[480px] rounded-full bg-pink/30 blur-[130px] hidden sm:block animate-blob-2" />
        <div className="absolute bottom-[-10%] right-[20%] h-[420px] w-[420px] rounded-full bg-mint/40 blur-[120px] hidden sm:block animate-blob" style={{ animationDelay: '-6s' }} />
        <div className="absolute top-[55%] right-[-5%] h-[360px] w-[360px] rounded-full bg-cream/50 blur-[110px] hidden sm:block animate-blob-2" style={{ animationDelay: '-10s' }} />

        {/* на мобиле — статичные блобы без анимации */}
        <div className="absolute -top-40 right-[-10%] h-[400px] w-[400px] rounded-full bg-primary/15 blur-[100px] sm:hidden" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-pink/20 blur-[100px] sm:hidden" />

        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(27,18,48,0.10) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 80%)',
          }}
        />
      </div>

      <a
        href="#works"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('skipLink')}
      </a>

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <About />
        <Contacts />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
