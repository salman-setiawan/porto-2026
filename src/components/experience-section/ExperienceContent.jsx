import React, { useState } from 'react'
import { DataHome } from '../../data/dataHome'
import { playWhoosh } from '../../utils/sound'

const ExperienceCard = ({ experience, isHovered, isAnyHovered, onHover, onLeave }) => {
  const periodText = `${experience.dateStart || ''} — ${experience.dateEnd || ''}`

  return (
    <div
      onMouseEnter={() => {
        playWhoosh()
        onHover()
      }}
      onMouseLeave={onLeave}
      className={`
        relative p-5 border border-dashed transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer
        ${isHovered
          ? 'scale-102 z-30 opacity-100 bg-white/[0.045] border-white/40'
          : isAnyHovered
            ? 'opacity-20 border-white/10 bg-white/[0.01]'
            : 'scale-100 opacity-100 border-white/15 bg-white/[0.015] hover:border-white/30'
        }
      `}
    >
      {/* 4 Corner Crosshairs (+) khas grid arsitektural */}
      <span className={`absolute -top-[5px] -left-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-blue-400' : 'text-white/30'}`}>+</span>
      <span className={`absolute -top-[5px] -right-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-blue-400' : 'text-white/30'}`}>+</span>
      <span className={`absolute -bottom-[5px] -left-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-blue-400' : 'text-white/30'}`}>+</span>
      <span className={`absolute -bottom-[5px] -right-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-blue-400' : 'text-white/30'}`}>+</span>

      <div className="space-y-3">
        {/* Header: Company, Role & Period */}
        <div>
          <div className="flex flex-wrap items-center justify-between items-start">
            <div>
              <h4 className={`text-[15px] font-bold tracking-tight transition-colors ${isHovered ? 'text-blue-300' : 'text-white'}`}>
                {experience.role?.en || experience.role}
              </h4>
              <p className="text-blue-400 text-[13px] font-medium">
                {experience.title}
              </p>
            </div>
            <p className="text-[12px] text-white/40">
              {periodText}
            </p>
          </div>
        </div>

        {/* Jobdesc */}
        {experience.jobdesc && (
          <p className="text-white/60 text-[14px] leading-relaxed">
            {experience.jobdesc?.en || experience.jobdesc}
          </p>
        )}
      </div>

      {/* Keywords / Tech Stacks */}
      {experience.keyWord && experience.keyWord.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4">
          {experience.keyWord.map((item, idx) => (
            <span
              key={idx}
              className={`text-[11px] px-2 py-0.5 rounded transition-colors ${isHovered
                ? 'bg-white/[0.03] border border-white/20 text-white/70'
                : 'bg-white/[0.03] border border-white/10 text-white/50'
                }`}
            >
              {item.en || item}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const ExperienceContent = () => {
  const experiences = DataHome.experience || []
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="space-y-1">
      {experiences.map((exp, idx) => {
        const id = exp.uid || idx
        const isHovered = hoveredId === id
        const isAnyHovered = hoveredId !== null

        return (
          <ExperienceCard
            key={id}
            experience={exp}
            isHovered={isHovered}
            isAnyHovered={isAnyHovered}
            onHover={() => setHoveredId(id)}
            onLeave={() => setHoveredId(null)}
          />
        )
      })}
    </div>
  )
}

export default ExperienceContent
export { ExperienceCard }
