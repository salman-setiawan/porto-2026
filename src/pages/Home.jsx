import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import HeroIntro from '../components/hero-section/Intro'
import TabSection from '../components/TabSection'
import SeamlessSlider from '../components/showcase-section/SeamlessSlider'
import MusicPlayer from '../components/MusicPlayer'
import PixelFlare from '../motion/PixelFlare'

const Home = () => {
  // Track scroll position untuk memudarkan flare saat di-scroll
  const [scrollY, setScrollY] = useState(0)

  // Inisialisasi Lenis Smooth Scroll untuk mengatur kecepatan dan kehalusan scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Durasi scroll inertia (makin besar makin lembut & lambat)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing eksponensial Apple-like
      smoothWheel: true,
      wheelMultiplier: 0.75, // Kecepatan scroll wheel diturunkan (0.75x dari kecepatan normal browser)
      touchMultiplier: 1.2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      setScrollY(window.scrollY)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Opacity flare: lalu perlahan memudar dan menghilang seiring scroll (dalam jarak 420px)
  const flareOpacity = Math.max(0, 0.19 * (1 - scrollY / 420))

  return (
    <div className='flex flex-col w-full overflow-x-hidden relative min-h-screen bg-[#141414]'>
      {/* ── Latar Flare di Seluruh Area (Fullscreen Width/Height) dengan Opacity 50% & Scroll Fade Out ── */}
      {flareOpacity > 0 && (
        <div
          className="fixed inset-x-0 top-0 h-[320px] md:h-[640px] pointer-events-none z-0 transition-opacity duration-75"
          style={{ opacity: flareOpacity }}
        >
          {/* Flare Background Component (Versi Pixel Buffer - Ultra Lightweight) */}
          <PixelFlare speed={1.0} intensity="vibrant" />

          {/* Layer Tambahan: Gradasi dari bawah ke atas transparan ke #141414 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #141414 0%, rgba(20,20,20,0.85) 30%, rgba(20,20,20,0.35) 65%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* Konten Halaman */}
      <div className="items-center mx-auto px-4 md:px-8 max-w-[860px] space-y-8 relative z-10">
        <HeroIntro scrollY={scrollY} />
        <TabSection />
      </div>
      <div className="md:mx-auto relative z-10">
        <SeamlessSlider />
      </div>

      {/* Floating Background Music Player */}
      <MusicPlayer />
    </div>
  )
}

export default Home