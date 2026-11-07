import React, { useState, useEffect } from 'react'
import { DataHome } from '../../data/dataHome'
import Button from '../Button'
import { playMechanicalSound, playCrispClick, playWhoosh } from '../../utils/sound'

// Greeting multi-bahasa diambil dari dataHome.js → heroSection.greetings

const HeroIntro = () => {
  const positions = Array.isArray(DataHome.heroSection.position)
    ? DataHome.heroSection.position
    : [DataHome.heroSection.position].filter(Boolean)

  const [currentPositionIndex, setCurrentPositionIndex] = useState(0)
  const [fadeState, setFadeState] = useState('visible') // 'visible' | 'exit' | 'enter'
  const [showAll, setShowAll] = useState(false)

  // State cycling greeting multi-bahasa
  const [greetingIndex, setGreetingIndex] = useState(0)

  // Track scroll position untuk animasi transisi kontinu (scroll-driven scrubbing)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Jarak scroll transisi dari Gambar 1 (Intro) ke Gambar 2 (Description)
  const SCROLL_DISTANCE = 420
  const progress = Math.min(1, Math.max(0, scrollY / SCROLL_DISTANCE))
  // Hero tertahan di atas viewport selama proses scroll transisi
  const heroOffsetY = Math.min(scrollY, SCROLL_DISTANCE)

  useEffect(() => {
    if (positions.length <= 1) return

    let timeoutExit
    let timeoutEnter

    const interval = setInterval(() => {
      setFadeState('exit')

      timeoutExit = setTimeout(() => {
        setCurrentPositionIndex((prev) => (prev + 1) % positions.length)
        setFadeState('enter')

        timeoutEnter = setTimeout(() => {
          setFadeState('visible')
        }, 50)
      }, 300)
    }, 2800)

    return () => {
      clearInterval(interval)
      clearTimeout(timeoutExit)
      clearTimeout(timeoutEnter)
    }
  }, [positions.length])

  // Cycling greeting
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % DataHome.heroSection.greetings.length)
    }, 1300)
    return () => clearInterval(interval)
  }, [])

  const getFadeClasses = () => {
    if (fadeState === 'exit') {
      return 'opacity-0 -translate-y-2 duration-300 ease-in'
    }
    if (fadeState === 'enter') {
      return 'opacity-0 translate-y-2 duration-0'
    }
    return 'opacity-100 translate-y-0 duration-300 ease-out'
  }

  const renderPosition = (text) => {
    if (!text) return null
    const match = text.match(/^(a|an)\s+(.*)$/i)
    if (match) {
      return (
        <>
          <span>{match[1]} </span>
          <span className="text-white">{match[2]}</span>
        </>
      )
    }
    return <span className="text-white">{text}</span>
  }
  const socialIcons = [
    // Instagram (Filled)
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.981-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.981 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
    // LinkedIn (Filled)
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>,
    // GitHub (Filled)
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
  ]


  return (
    <div className="flex flex-col gap-4">
      {/* Scroll Track: Menahan hero di viewport selagi About me naik ke atas menempel ke hero */}
      <div
        className="relative w-full h-[650px]"
      >
        {/* Pinned Hero Container: Bergerak bersama scroll hingga About me menempel */}
        <div
          className="w-full relative h-[140px] pointer-events-auto"
          style={{
            transform: `translate3d(0, ${heroOffsetY}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* ── AVATAR: Meluncur fisik dari tengah ke kiri atas TANPA FADE ── */}
          <div
            className="absolute top-0 pointer-events-auto"
            style={{
              left: `${(1 - progress) * 50}%`,
              transform: `translate3d(-${(1 - progress) * 50}%, ${95 + (1 - progress) * 140}px, 0)`,
              willChange: 'transform, left',
            }}
          >
            <div className="w-20 h-20 shrink-0 overflow-hidden border-[3px] border-blue-500/80 rounded-lg hover:scale-105 hover:rotate-[-8deg] transition-transform">
              <img src={DataHome.heroSection.avatar} className="scale-110 object-cover" alt="avatar" />
            </div>
          </div>

          {/* ── TEKS INFO: Meluncur fisik dari bawah avatar ke samping kanan avatar TANPA FADE ── */}
          <div
            className={`absolute top-0 flex flex-col space-y-0.5 pointer-events-auto ${progress > 0.4 ? 'items-start text-left' : 'items-center text-center'
              }`}
            style={{
              left: `calc(${progress * 96}px + ${(1 - progress) * 50}%)`,
              transform: `translate3d(-${(1 - progress) * 50}%, ${98 + (1 - progress) * 240}px, 0)`,
              width: progress > 0.4 ? 'auto' : '320px',
              maxWidth: progress > 0.4 ? 'calc(100% - 100px)' : '320px',
              willChange: 'transform, left',
            }}
          >
            <div className="flex gap-x-1">
              <h2 lang={DataHome.heroSection.greetings[greetingIndex].lang} className='text-xl font-bold text-blue-300'>
                {DataHome.heroSection.greetings[greetingIndex].text}
              </h2>
              <h2 className='text-xl font-bold'>{DataHome.heroSection.title}</h2>
            </div>
            <div className={`overflow-hidden flex flex-wrap gap-x-1 items-center ${progress > 0.4 ? 'justify-start' : 'justify-center'} text-white/70 text-[14px]`}>
              <p>i'm</p>
              <p className={`transition-all transform ${getFadeClasses()}`}>
                {renderPosition(positions[currentPositionIndex])}
              </p>
              <p>based in</p>
              <p className='text-white'>🇮🇩</p>
              <p>Indonesia.</p>
            </div>
            <div className="flex gap-1 items-center text-[14px]">
              <p className='text-white/70'>and i'm also</p>
              <p className='text-green-300 text-[14px] font-medium'>Available to Work</p>
            </div>
          </div>

          {/* ── SOCIAL BUTTONS: Meluncur fisik dari tengah bawah ke kiri bawah TANPA FADE ── */}
          <div
            className="absolute top-0 flex gap-2.5 pointer-events-auto"
            style={{
              left: `${(1 - progress) * 50}%`,
              transform: `translate3d(-${(1 - progress) * 50}%, ${192 + (1 - progress) * 240}px, 0)`,
              willChange: 'transform, left',
            }}
          >
            <Button
              width="w-fit"
              type='social'
              label={DataHome.heroSection.cta[0].label}
              url={DataHome.heroSection.cta[0].link}
              icon={socialIcons[0]}
              octave={1}
            />
            <Button
              width="w-fit"
              type='social'
              label={DataHome.heroSection.cta[1].label}
              url={DataHome.heroSection.cta[1].link}
              icon={socialIcons[1]}
              octave={2}
            />
            <Button
              width="w-fit"
              type='social'
              label={DataHome.heroSection.cta[2].label}
              url={DataHome.heroSection.cta[2].link}
              icon={socialIcons[2]}
              octave={3}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className='text-white text-[36px] font-crimson h-[40px] italic tracking-tighter'>About me . .</h3>

        {/* Always show first paragraph */}
        <p className='text-white/70 text-[15px] mt-3'>
          {DataHome.heroSection.desc[0]?.en}
        </p>

        {/* Paragraphs 1 & 2 — animated expand/collapse via grid trick */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: showAll ? '1fr' : '0fr',
            opacity: showAll ? 1 : 0,
            transition: 'grid-template-rows 0.4s ease-out, opacity 0.35s ease-out',
          }}
        >
          <div className="overflow-hidden">
            {DataHome.heroSection.desc.slice(1).map((item, index) => (
              <p key={index} className='text-white/70 text-[15px] mt-3'>
                {item.en}
              </p>
            ))}
          </div>
        </div>

        {/* Show More / Show Less CTA */}
        <button
          onClick={() => {
            playCrispClick(0.4)
            playWhoosh(0.15)
            setShowAll((prev) => !prev)
          }}
          onMouseEnter={() => playMechanicalSound(3, 0.3)}
          className="flex justify-center w-full gap-1 pt-3 text-[14px] text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer"
        >
          {showAll ? 'Show less ↑' : 'Show more ↓'}
        </button>
      </div>
    </div>
  )
}

export default HeroIntro