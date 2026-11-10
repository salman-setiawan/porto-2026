import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import HeroIntro from '../components/hero-section/Intro'
import About from '../components/About'
import ProjectsHorizontalScroll from '../components/project-section/ProjectsHorizontalScroll'
import SeamlessSlider from '../components/showcase-section/SeamlessSlider'
import Button from '../components/Button'
import PixelFlare from '../motion/PixelFlare'
import Footnote from '../components/footnote-section/Footnote'
import FootnoteCards from '../components/footnote-section/FootnoteCards'
import { DataHome } from '../data/dataHome'

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
    <div className='flex flex-col w-full relative min-h-screen bg-app-primary transition-colors duration-300 overflow-x-clip'>
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
        <About title='About me . .' />
      </div>

      {/* 2. Pinned Horizontal Projects Showcase Scroll with SeamlessSlider inside */}
      <ProjectsHorizontalScroll>
        <div className="w-full pb-24 bg-app-primary overflow-hidden md:mx-auto">
          {/* Header Playground Layer Terpisah */}
          <div className="max-w-[920px] mx-auto relative z-[110] top-12 pointer-events-none px-4 md:px-8">
            <h3 className="text-app-primary text-[80px] font-crimson h-[100px] italic tracking-tighter">
              Playground
            </h3>
            <p className="text-app-secondary text-sm mt-2">
              A collection of my other design explorations and shots.
            </p>
          </div>

          {/* Slider polosan dengan layer overlay terpisah */}
          <div className="max-w-[920px] px-0 md:px-8 mx-auto relative flex justify-center -mt-[50px]">
            <SeamlessSlider heightClass="h-[400px]" showOverlayGradients={true} />

            {/* CTA Button Layer Terpisah */}
            <div
              className="absolute inset-x-0 bottom-0 h-[140px] z-[110] flex items-end sm:justify-center pl-5 sm:pl-0 pb-10 pointer-events-none"
            >
              <div className="pointer-events-auto">
                <Button
                  label="Click to See More"
                  type="base"
                  url="https://dribbble.com/eisenflux"
                />
              </div>
            </div>
          </div>
        </div>
      </ProjectsHorizontalScroll>

      {/* 3. Footnote & Call-to-Action Section (Full Area) dengan Cards di layer atasnya */}
      <div className="relative w-full mt-14 overflow-visible">
        <Footnote className="z-10" />

        {/* Layer FootnoteCards berada di atas Footnote (z-30) dengan posisi container yang persis sama */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-visible -top-30 -right-12 max-w-[860px] flex justify-end mx-auto">
          <div className="pointer-events-auto">
            <FootnoteCards
              email={DataHome?.footnote?.email || 'salmansetiawan88@gmail.com'}
              isLight={isLight}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
