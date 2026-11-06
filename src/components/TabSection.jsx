import React, { useState, useRef, useEffect, useCallback } from 'react'
import { DataHome } from '../data/dataHome'
import ExperienceContent from './experience-section/ExperienceContent'
import ProjectCard from './project-section/ProjectCard'
import Button from './Button'

const ProjectsContent = () => {
  const projects = DataHome.projects || []
  return (
    <div className="space-y-1">
      {projects.map((project, index) => (
        <ProjectCard key={project.id || index} project={project} />
      ))}
    </div>
  )
}

const TabSection = () => {
  // Projects shown first by default
  const [activeTab, setActiveTab] = useState('Projects')
  const [isFloating, setIsFloating] = useState(false)

  const headerRef = useRef(null)
  const sectionRef = useRef(null)

  const isProjects = activeTab === 'Projects'

  // Scroll listener: selalu konsisten & instan mendeteksi saat header melewati batas atas
  useEffect(() => {
    const handleScroll = () => {
      const el = headerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      // Jika bagian bawah header sudah lewat ke atas viewport (misal rect.bottom <= 10)
      setIsFloating(rect.bottom <= 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Cek saat initial render / perubahan layout

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Switch tab: scroll smooth ke atas section dulu, lalu switch
  const handleSwitch = useCallback(() => {
    if (sectionRef.current) {
      // Hitung posisi absolut dengan offset ekstra ke atas agar tidak terpotong (misal 32px breathing room)
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - 36

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Tunggu scroll selesai lalu switch tab dengan fade
      setTimeout(() => {
        setActiveTab((prev) => (prev === 'Projects' ? 'Experience' : 'Projects'))
      }, 450)
    } else {
      setActiveTab((prev) => (prev === 'Projects' ? 'Experience' : 'Projects'))
    }
  }, [])

  const ctaLabel = isProjects ? 'Show Experience →' : 'Show Projects →'

  return (
    <div ref={sectionRef} className="space-y-3">
      {/* Header row: title left, CTA right */}
      <div ref={headerRef} className="flex items-center justify-between">
        {/* Title — same spec as "About me . ." */}
        <h3 className="text-white text-[40px] font-crimson italic tracking-tighter leading-none">
          {isProjects ? 'Projects . .' : 'Experience . .'}
        </h3>

        {/* CTA toggle button — social style */}
        <Button
          type="social"
          width="w-fit"
          label={ctaLabel}
          onClick={handleSwitch}
          octave={3}
        />
      </div>

      {/* Tab Content Display */}
      <div className="relative">
        <div
          key={activeTab}
          style={{ animation: 'tabFadeIn 0.22s ease-out both' }}
        >
          {isProjects ? <ProjectsContent /> : <ExperienceContent />}
        </div>
      </div>

      {/* ── Floating bar: slide in/out dari atas + fade in/out tipis ── */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isFloating
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div
          style={{
            display: 'flex',
            width: '760px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '8px 8px 8px 12px',
            background: 'rgba(22,22,22,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-crimson, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: '22px',
              color: 'rgba(255,255,255,1)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {isProjects ? 'Projects . .' : 'Experience . .'}
          </span>
          <Button
            type="social"
            width="w-fit"
            label={ctaLabel}
            onClick={handleSwitch}
            octave={3}
          />
        </div>
      </div>

      <style>{`
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default TabSection

