import { useState, memo } from 'react'
import { DataHome } from '../../data/dataHome'
import { playWhoosh } from '../../utils/sound'

const ExperienceCard = memo(({ experience, isHovered, isAnyHovered, onHover, onLeave }) => {
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
          ? 'scale-102 z-30 opacity-100 bg-app-surface border-app-accent shadow-lg shadow-orange-500/5'
          : isAnyHovered
            ? 'opacity-20 border-app-subtle bg-app-primary'
            : 'scale-100 opacity-100 border-app-subtle bg-app-surface/40 hover:border-app-medium'
        }
      `}
    >
      {/* 4 Corner Crosshairs (+) */}
      <span className={`absolute -top-[5px] -left-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-app-accent font-bold' : 'text-app-muted'}`}>+</span>
      <span className={`absolute -top-[5px] -right-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-app-accent font-bold' : 'text-app-muted'}`}>+</span>
      <span className={`absolute -bottom-[5px] -left-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-app-accent font-bold' : 'text-app-muted'}`}>+</span>
      <span className={`absolute -bottom-[5px] -right-[5px] text-[10px] leading-none font-mono select-none transition-colors ${isHovered ? 'text-app-accent font-bold' : 'text-app-muted'}`}>+</span>

      <div className="space-y-3">
        {/* Header: Company, Role & Period */}
        <div>
          <div className="flex flex-wrap items-center justify-between items-start">
            <div>
              <h4 className={`text-[15px] font-bold tracking-tight transition-colors ${isHovered ? 'text-app-accent' : 'text-app-primary'}`}>
                {experience.role?.en || experience.role}
              </h4>
              <p className="text-app-accent text-[13px] font-medium">
                {experience.title}
              </p>
            </div>
            <p className="text-[12px] text-app-muted">
              {periodText}
            </p>
          </div>
        </div>

        {/* Jobdesc */}
        {experience.jobdesc && (
          <p className="text-app-secondary text-[14px] leading-relaxed">
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
                ? 'bg-app-surface border border-app-accent text-app-primary'
                : 'bg-app-surface border border-app-subtle text-app-muted'
                }`}
            >
              {item.en || item}
            </span>
          ))}
        </div>
      )}
    </div>
  )
})

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
