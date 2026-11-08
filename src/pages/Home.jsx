import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import HeroIntro from '../components/hero-section/Intro'
import About from '../components/hero-section/About'
import ProjectsHorizontalScroll from '../components/project-section/ProjectsHorizontalScroll'
import SeamlessSlider from '../components/showcase-section/SeamlessSlider'
import MusicPlayer from '../components/MusicPlayer'
import ThemeToggle from '../components/ThemeToggle'
import PixelFlare from '../motion/PixelFlare'
import Footnote from '../components/Footnote'

const Home = () => {
  // Track scroll position khusus zona Hero (0-450px) agar tidak memicu re-render tak berguna saat scroll ke bawah
  const [scrollY, setScrollY] = useState(0)
  const lastScrollYRef = useRef(0)

  const [isLight, setIsLight] = useState(
    () => typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  // Lenis Smooth Scroll dengan performa teroptimasi (decoupled dari React render tree)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Hanya update state jika berada di sekitar range aktif Hero (< 450px)
    // Mencegah ratusan re-render saat user sedang melihat project, showcase, atau footer
    const handleLenisScroll = ({ scroll }) => {
      const prev = lastScrollYRef.current
      if (scroll <= 450 || prev <= 450) {
        lastScrollYRef.current = scroll
        setScrollY(scroll)
      }
    }

    lenis.on('scroll', handleLenisScroll)

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', handleLenisScroll)
      lenis.destroy()
    }
  }, [])

  // Opacity flare: 0.15 dark mode, 0.3 light mode
  const baseOpacity = isLight ? 0.3 : 0.15
  const flareOpacity = Math.max(0, baseOpacity * (1 - scrollY / 420))
  const isFlareVisible = flareOpacity > 0

  return (
    <div className='flex flex-col w-full relative min-h-screen bg-app-primary transition-colors duration-300'>
      {/* PixelFlare tetap dimount dan hanya disembunyikan via display: none agar IntersectionObserver menjeda tanpa GC thrashing */}
      <div
        className="fixed inset-x-0 top-0 h-[320px] md:h-[640px] pointer-events-none z-0 transition-opacity duration-75"
        style={{
          opacity: flareOpacity,
          display: isFlareVisible ? 'block' : 'none',
        }}
      >
        <PixelFlare speed={1.0} intensity="vibrant" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--flare-mask)' }}
        />
      </div>

      {/* 1. Hero Intro & About Section */}
      <div className="items-center mx-auto px-4 md:px-8 max-w-[920px] space-y-4">
        <HeroIntro scrollY={scrollY} />
        <About />
      </div>

      {/* 2. Pinned Horizontal Projects Showcase Scroll with SeamlessSlider inside */}
      <ProjectsHorizontalScroll>
        <div className="md:mx-auto">
          <SeamlessSlider />
        </div>
      </ProjectsHorizontalScroll>

      {/* 3. Footnote & Call-to-Action Section (Full Area) */}
      <Footnote className="mt-14 z-20" />

      <MusicPlayer />
      <ThemeToggle />
    </div>
  )
}

export default Home
