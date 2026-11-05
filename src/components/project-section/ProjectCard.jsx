import React from 'react'
import { DataHome } from '../../data/dataHome'
import Chip from '../Chip'
import Button from '../Button'
import HalftoneGlow from '../../motion/HalftoneGlow'

const ProjectCard = ({ project = DataHome.projects[0] }) => {
  if (!project) return null

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
        `}
      </style>

      {/* Grid 2 kolom tanpa gap, border dashed saling terhubung */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-0 relative'>
        
        {/* Kolom 1: Informasi Project */}
        <div className='relative p-6 md:p-7 border border-dashed border-white/15 md:border-r-0 bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-300 flex flex-col justify-between overflow-hidden'>
          {/* Crosshairs Sudut Kolom Informasi */}
          <span className="absolute -top-[5px] -left-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -top-[5px] -right-[5px] md:hidden text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -left-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] md:hidden text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          {/* Crosshair Persimpangan Atas & Bawah Tengah (MD screen) */}
          <span className="hidden md:block absolute -top-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="hidden md:block absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          <div className="flex flex-wrap gap-2 z-10">
            {project.tag?.map((tag, index) => (
              <Chip key={index} label={tag.en || tag} />
            ))}
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
        <div className='relative aspect-square w-full border border-dashed border-white/15 bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-300 overflow-hidden'>
          {/* Crosshairs Sudut Kolom Gambar */}
          <span className="absolute -top-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-white/30 font-mono select-none group-hover:text-blue-400 transition-colors z-20">+</span>

          <img
            className="top-24 left-32 relative h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            src={imageSrc}
            alt={project.title?.en || 'Project Thumbnail'}
          />
        </div>

      </div>
    </div>
  )
}

export default ProjectCard
