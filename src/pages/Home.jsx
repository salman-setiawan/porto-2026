import React, { useEffect } from 'react'
import Lenis from 'lenis'
import HeroIntro from '../components/hero-section/Intro'
import TabSection from '../components/TabSection'
import SeamlessSlider from '../components/showcase-section/SeamlessSlider'
import MusicPlayer from '../components/MusicPlayer'

const Home = () => {
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
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className='flex flex-col w-full overflow-x-hidden relative min-h-screen'>
      <div className="items-center mx-auto px-4 md:px-8 max-w-[860px] bg-[#141414] space-y-8">
        <HeroIntro />
        <TabSection />
      </div>
      <div className="md:mx-auto">
        <SeamlessSlider />
      </div>

      {/* Floating Background Music Player */}
      <MusicPlayer />
    </div>
  )
}

export default Home