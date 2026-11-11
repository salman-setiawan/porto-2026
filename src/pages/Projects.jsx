import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { playCrispClick, playMechanicalSound } from '../utils/sound'
import ProjectCard from '../components/project-section/ProjectCard'
import { DataProject } from '../data/dataProject'

const TAG_FILTERS = DataProject.tag || [
  { id: 'all', name: 'All' },
  { id: 'uix', name: 'UI/UX Design' },
  { id: 'dev', name: 'Development' },
  { id: 'graphic', name: 'Graphic Design' },
]

const ALL_PROJECTS = DataProject.projects || []

const Projects = () => {
  const [activeTagId, setActiveTagId] = useState('all')

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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

  // Filter projects berdasarkan tag id aktif
  const filteredProjects = useMemo(() => {
    if (activeTagId === 'all') return ALL_PROJECTS

    return ALL_PROJECTS.filter((project) => {
      const tags = (project.tag || []).map((t) => (typeof t === 'string' ? t : t.en || t.id || '')).join(' ').toLowerCase()
      const stacks = (project.stack || []).map((s) => (typeof s === 'string' ? s : s.en || s.id || '')).join(' ').toLowerCase()
      const combined = `${tags} ${stacks}`

      if (activeTagId === 'uix') {
        return combined.includes('ui/ux') || combined.includes('product design') || combined.includes('ui') || combined.includes('ux')
      }
      if (activeTagId === 'dev') {
        return combined.includes('development') || combined.includes('web') || combined.includes('react') || combined.includes('javascript') || combined.includes('flutter') || combined.includes('dart')
      }
      if (activeTagId === 'graphic') {
        return combined.includes('graphic') || combined.includes('digital assets')
      }

      return true
    })
  }, [activeTagId])

  const handleTagClick = (tagId) => {
    playMechanicalSound(3, 0.25)
    setActiveTagId(tagId)
  }

  return (
    <div className="min-h-screen bg-app-primary text-app-primary font-sans transition-colors duration-300 relative selection:bg-orange-500/30 selection:text-orange-400 pb-24">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-app-primary/80 border-b border-app-subtle">
        <div className="max-w-[920px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => playCrispClick(0.5)}
            className="group flex items-center gap-2 text-sm text-app-secondary hover:text-app-primary transition-colors cursor-pointer"
          >
            <span className="text-base group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-app-muted hidden sm:inline-block">
              {filteredProjects.length} of {ALL_PROJECTS.length} Works
            </span>
            <a
              href="https://github.com/salman-setiawan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full text-xs font-medium border border-app-subtle text-app-secondary hover:text-app-primary hover:border-app-accent transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="max-w-[920px] mx-auto px-4 md:px-8 pt-10 space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-crimson italic tracking-tight text-app-primary">
                {DataProject.title?.en || 'All Featured Projects'}
              </h1>
              <p className="text-sm text-app-secondary mt-1 max-w-2xl leading-relaxed">
                {DataProject.desc?.en || 'A complete archive of web applications, mobile products, design systems, and digital assets crafted with focus on aesthetics and user impact.'}
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-app-surface border border-app-subtle text-app-accent self-start sm:self-auto">
              {ALL_PROJECTS.length} Total Projects
            </span>
          </div>

          {/* Category Filter Pills dari DataProject.tag */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagClick(tag.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  activeTagId === tag.id
                    ? 'bg-app-primary text-app-primary border-app-accent shadow-sm'
                    : 'bg-app-surface/40 text-app-muted border-app-subtle hover:text-app-secondary hover:border-app-medium'
                }`}
              >
                <span>{tag.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Projects Feed ── */}
        <section className="space-y-8">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-app-subtle rounded-2xl bg-app-surface/20">
              <p className="text-sm text-app-muted">No projects found for filter &ldquo;{TAG_FILTERS.find((t) => t.id === activeTagId)?.name}&rdquo;.</p>
              <button
                type="button"
                onClick={() => handleTagClick('all')}
                className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-app-surface border border-app-subtle text-app-accent hover:border-app-accent transition-colors"
              >
                Show all projects
              </button>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project.id || index}
                className="w-full mx-auto transform transition-transform duration-300"
              >
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </section>

        {/* ── Bottom Section ── */}
        <section className="pt-12 border-t border-app-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-app-muted">
            Salman Setiawan · Portfolio 2026
          </p>
          <button
            type="button"
            onClick={() => {
              playCrispClick(0.5)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-xs font-mono text-app-secondary hover:text-app-accent transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </section>
      </main>
    </div>
  )
}

export default Projects
