import { useState, useRef, useEffect, useCallback } from 'react'
import { DataHome } from '../data/dataHome'
import ExperienceContent from './experience-section/ExperienceContent'
import ProjectCard from './project-section/ProjectCard'
import Button from './Button'

const ProjectsContent = () => {
  const projects = DataHome.projects || []
  return (
    <div className="space-y-3 md:space-y-1">
      {projects.map((project, index) => (
        <ProjectCard key={project.id || index} project={project} />
      ))}
    </div>
  )
}

const TabSection = () => {
  const [activeTab, setActiveTab] = useState('Projects')
  const [isFloating, setIsFloating] = useState(false)

  const headerRef = useRef(null)
  const sectionRef = useRef(null)
  const switchTimerRef = useRef(null)

  const isProjects = activeTab === 'Projects'
  const ctaLabel = isProjects ? 'Show Experience →' : 'Show Projects →'

  // Scroll listener: selalu konsisten & instan mendeteksi saat header melewati batas atas
  useEffect(() => {
    const handleScroll = () => {
      const el = headerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setIsFloating(rect.bottom <= 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (switchTimerRef.current) clearTimeout(switchTimerRef.current)
    }
  }, [])

  // Switch tab: scroll smooth ke atas section dulu, lalu switch
  const handleSwitch = useCallback(() => {
    if (sectionRef.current) {
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - 36

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      if (switchTimerRef.current) clearTimeout(switchTimerRef.current)
      switchTimerRef.current = setTimeout(() => {
        setActiveTab((prev) => (prev === 'Projects' ? 'Experience' : 'Projects'))
      }, 450)
    } else {
      setActiveTab((prev) => (prev === 'Projects' ? 'Experience' : 'Projects'))
    }
  }, [])

  return (
    <div ref={sectionRef} className="space-y-3">
      {/* Header row: title left, CTA right */}
      <div ref={headerRef} className="flex items-center justify-between">
        <h3 className="text-app-primary text-[36px] font-crimson h-[48px] italic tracking-tighter"> {isProjects ? 'Projects' : 'Experience'} </h3>
        <Button type="social" width="w-fit" label={ctaLabel} onClick={handleSwitch} octave={3} />
      </div>

      {/* Tab Content Display */}
      <div className="relative">
        <div key={activeTab} style={{ animation: 'tabFadeIn 0.22s ease-out both' }}>
          {isProjects ? <ProjectsContent /> : <ExperienceContent />}
        </div>
      </div>

      {/* ── Floating bar: slide in/out dari atas ── */}
      <div className={
        `fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-[800px] px-6 z-200 transition-all duration-300 ease-out ${isFloating
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '8px 8px 8px 12px',
            background: 'var(--bg-surface-glass)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-crimson, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: '20px',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {isProjects ? 'Projects . .' : 'Experience . .'}
          </span>
          <Button type="social" width="w-fit" label={ctaLabel} onClick={handleSwitch} octave={3} />
        </div>
      </div>
    </div>
  )
}

export default TabSection
