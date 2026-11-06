import React, { useState, useRef, useMemo } from 'react'
import { DataHome } from '../../data/dataHome'
import Chip from '../Chip'
import Button from '../Button'
import HalftoneGlow from '../../motion/HalftoneGlow'

const ProjectCard = ({ project = DataHome.projects[0] }) => {
  if (!project) return null

  const imageCardRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!imageCardRef.current) return
    const rect = imageCardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCursorPos({ x, y })
  }

  const imageSrc =
    (typeof project.media === 'string' && project.media) ||
    project.media?.desktop ||
    project.media?.mobile ||
    '/project-1/heroimg_desktop.webp'

  // Palet warna terkurasi berdasarkan teori harmoni warna (Analogous & Tonal Harmony)
  // Menjamin setiap kartu memiliki warna latar yang berbeda & inner glow yang selaras tanpa tabrakan.
  const HARMONIOUS_PALETTES = [
    {
      // 1. Deep Cyber Sapphire (Blue -> Cyan glow)
      baseHue: 228,
      bg: '#0a0f1d',
      ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.45) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(14, 116, 144, 0.25) 0%, transparent 55%)',
      conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.4) 90deg, rgba(59, 130, 246, 0.65) 180deg, transparent 270deg)',
    },
    {
      // 2. Deep Aurora Emerald (Green -> Mint/Teal glow)
      baseHue: 158,
      bg: '#081712',
      ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(13, 148, 136, 0.25) 0%, transparent 55%)',
      conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(20, 184, 166, 0.4) 90deg, rgba(52, 211, 153, 0.65) 180deg, transparent 270deg)',
    },
    {
      // 3. Royal Velvet Amethyst (Violet -> Fuchsia glow)
      baseHue: 276,
      bg: '#140b1d',
      ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(192, 38, 211, 0.25) 0%, transparent 55%)',
      conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(217, 70, 239, 0.4) 90deg, rgba(168, 85, 247, 0.65) 180deg, transparent 270deg)',
    },
    {
      // 4. Sunset Bronze & Amber (Warm Amber -> Gold glow)
      baseHue: 32,
      bg: '#1b1207',
      ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(234, 88, 12, 0.25) 0%, transparent 55%)',
      conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(245, 158, 11, 0.4) 90deg, rgba(251, 191, 36, 0.65) 180deg, transparent 270deg)',
    },
    {
      // 5. Deep Ruby Crimson (Crimson -> Rose Coral glow)
      baseHue: 345,
      bg: '#1a0910',
      ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(225, 29, 72, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.25) 0%, transparent 55%)',
      conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(251, 113, 133, 0.4) 90deg, rgba(244, 63, 94, 0.65) 180deg, transparent 270deg)',
    },
  ]

  // Generate tema warna latar & inner effect berdasarkan project
  const colorTheme = useMemo(() => {
    // Gunakan project.id jika berupa angka, atau hash string jika custom
    const numId = typeof project.id === 'number' ? project.id : null
    if (numId !== null && numId > 0) {
      const paletteIndex = (numId - 1) % HARMONIOUS_PALETTES.length
      return HARMONIOUS_PALETTES[paletteIndex]
    }

    // Fallback hashing terdistribusi untuk id/title dinamis lainnya
    const key = String(project.id || project.title?.en || imageSrc)
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash)
    }
    const paletteIndex = Math.abs(hash) % HARMONIOUS_PALETTES.length
    return HARMONIOUS_PALETTES[paletteIndex]
  }, [project.id, project.title, imageSrc])

  return (
    <div className='relative w-full group'>
      <style>
        {`
          @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes pulse-radial { 0%, 100% { mask-size: 80%; -webkit-mask-size: 80%; opacity: 0.2; } 50% { mask-size: 110%; -webkit-mask-size: 110%; opacity: 0.5; } }
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>

      {/* Grid 2 kolom tanpa gap, border dashed saling terhubung */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0 relative'>

        {/* Kolom 1: Informasi Project */}
        <div className='relative py-4 px-3 border border-dashed border-white/15 md:border-r-0 bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-300 flex flex-col justify-between overflow-hidden'>
          {/* Crosshairs Sudut Kolom Informasi */}
          <span className="absolute -top-[5px] -left-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -top-[5px] -right-[5px] md:hidden text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -left-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] md:hidden text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          {/* Crosshair Persimpangan Atas & Bawah Tengah (MD screen) */}
          <span className="hidden md:block absolute -top-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="hidden md:block absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          <div className="space-y-2 relative z-10">
            <div className="flex flex-wrap gap-2">
              {project.tag?.map((tag, index) => (
                <Chip key={index} label={tag.en || tag} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((stack, index) => (
                <Chip key={index} label={stack.en || stack} autoIcon={true} />
              ))}
            </div>
          </div>

          <HalftoneGlow color="rgba(59, 79, 255, 1)" className="-top-48 left-16 w-[420px] h-[420px]" animation="pulse-radial 4s infinite" />

          <div className="space-y-5 pt-8 z-10">
            <div className='space-y-3'>
              <h3 className='text-white text-[38px] md:text-[40px] font-crimson h-[48px] italic tracking-tighter'>
                {project.title?.en || project.title}
              </h3>
              {project.desc && (
                <p className="text-white/70 text-[14px] leading-relaxed">
                  {project.desc?.en || project.desc}
                </p>
              )}
            </div>

            {project.cta && project.cta.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {project.cta.map((cta, index) => (
                  <Button
                    key={index}
                    width="w-fit"
                    type='base'
                    label={cta.en || cta.label}
                    url={cta.link}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Kolom 2: Visual / Mockup Gambar */}
        <div
          ref={imageCardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='relative aspect-square w-full border border-dashed border-white/15 transition-colors duration-300 overflow-hidden'
          style={{
            backgroundColor: colorTheme.bg,
            backgroundImage: colorTheme.ambientGlow,
          }}
        >
          {/* Crosshairs Sudut Kolom Gambar */}
          <span className="absolute -top-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          {/* Dot grid pattern latar (SVG crisp dots seperti HalftoneGlow tanpa mask/fading) */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='12' cy='12' r='1.2' fill='white'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Cahaya putar yang bergerak mengikuti kursor (warna komplementer) */}
          <div
            className="absolute pointer-events-none transition-opacity duration-500 ease-out z-0"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: isHovered ? 1 : 0.25,
            }}
          >
            {/* Inner element yang berputar 360 derajat */}
            <div
              className="w-72 h-72 rounded-full"
              style={{
                animation: 'spin-slow 6s linear infinite',
                background: colorTheme.conicLight,
                filter: 'blur(128px)',
              }}
            />
          </div>

          <img
            className="top-24 left-32 relative h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-10"
            src={imageSrc}
            alt={project.title?.en || 'Project Thumbnail'}
          />
        </div>

      </div>
    </div>
  )
}

export default ProjectCard
