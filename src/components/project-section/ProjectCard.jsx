import React, { useState, useRef } from 'react'
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
          className='relative aspect-square w-full border border-dashed border-white/15 bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-300 overflow-hidden'
        >
          {/* Crosshairs Sudut Kolom Gambar */}
          <span className="absolute -top-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          {/* Cahaya putar biru muda yang bergerak mengikuti kursor */}
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
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(26, 39, 158, 0.45) 90deg, rgba(59, 79, 255, 0.6) 180deg, transparent 270deg)',
                filter: 'blur(38px)',
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
