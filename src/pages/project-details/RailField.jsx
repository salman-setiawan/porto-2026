import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { playCrispClick, playMechanicalSound } from '../../utils/sound'
import RailfieldData from '../../data/projects/railfield'
import ImagesHorizontalScroll from '../../components/project-section/ImagesHorizontalScroll'

const RAILFIELD_GALLERY_IMAGES = [
  {
    title: 'Dashboard & Assignment Selection',
    src: '/projects/railfield-app/gallery/dashboard.png',
  },
  {
    title: 'Daily Report Draft Entry',
    src: '/projects/railfield-app/gallery/draft-1.png',
  },
  {
    title: 'Checklist & Obstacle Details',
    src: '/projects/railfield-app/gallery/draft-2.png',
  },
  {
    title: 'Report Verification Review',
    src: '/projects/railfield-app/gallery/verifikasi-1.png',
  },
  {
    title: 'Submission Status & GPS Proof',
    src: '/projects/railfield-app/gallery/verifikasi-2.png',
  },
]

const RailField = () => {
  const [selectedImage, setSelectedImage] = useState(null)

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

  const handleOpenImage = (src) => {
    playMechanicalSound(2, 0.2)
    setSelectedImage(src)
  }

  return (
    <div className="min-h-screen bg-app-primary text-app-primary font-sans transition-colors duration-300 relative selection:bg-orange-500/30 selection:text-orange-400 pb-24">
      {/* ── Main Container ── */}
      <main className="max-w-[880px] mx-auto px-4 sm:px-6 space-y-12">

        {/* ── SECTION 1: HEADER TITLE & METADATA ── */}
        <section className="pt-8 pb-4 text-center space-y-8">
          <h1 className="text-[32px] h-[40px] font-crimson italic tracking-tight text-app-primary">
            {RailfieldData.title}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-y-7 gap-x-8 max-w-[560px] mx-auto text-center">
            {/* Kolom 1: Role */}
            <div className="space-y-1.5 text-[14px]">
              <p className="text-app-muted">Role :</p>
              <p className="font-medium text-app-primary">{RailfieldData.role.en}</p>
            </div>

            {/* Kolom 2: Duration */}
            <div className="space-y-1.5 text-[14px]">
              <p className="text-app-muted">Duration :</p>
              <p className="font-medium text-app-primary">
                {RailfieldData.duration?.en && RailfieldData.duration.en !== 'Not specified'
                  ? RailfieldData.duration.en
                  : 'Design Sprint'}
              </p>
            </div>

            {/* Kolom 3: Type */}
            <div className="space-y-1.5 text-[14px]">
              <p className="text-app-muted">Type :</p>
              <p className="font-medium text-app-primary">{RailfieldData.type.en}</p>
            </div>

            {/* Kolom 4: Tools */}
            <div className="space-y-1.5 text-[14px]">
              <p className="text-app-muted">Tools :</p>
              <p className="font-medium text-app-primary">
                {RailfieldData.tools && RailfieldData.tools.length > 0
                  ? RailfieldData.tools.join(', ')
                  : 'Figma, Miro'}
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 1B: HORIZONTAL SCROLL IMAGES SHOWCASE (Konsep ProjectsHorizontalScroll) ── */}
        <section className="relative w-full -mx-4 sm:-mx-6 px-0 overflow-visible">
          <ImagesHorizontalScroll
            images={RAILFIELD_GALLERY_IMAGES}
            title="Field Technician Workflow"
            subtitle="Panned showcase of 5-step daily site reporting flow"
            onImageClick={handleOpenImage}
            scrollDistance={1500}
            cardWidthClass="w-[260px] sm:w-[300px] md:w-[320px]"
            cardAspectClass="aspect-[9/19]"
          />
        </section>

        {/* ── SECTION 2: OVERVIEW, PROBLEM ── */}
        <section className="space-y-8 pt-4">
          {/* Overview */}
          <div className="space-y-3">
            <h2 className="text-[36px] font-crimson italic tracking-tighter heading-accent-amber leading-tight">
              Overview
            </h2>
            <div className="space-y-3 text-[15px] text-app-secondary leading-relaxed font-sans">
              {RailfieldData.overview.map((para, idx) => (
                <p key={idx}>{para.en}</p>
              ))}
            </div>
          </div>

          {/* Problem */}
          <div className="space-y-3">
            <h2 className="text-[36px] font-crimson italic tracking-tighter heading-accent-amber leading-tight">
              Problem
            </h2>
            <p className="text-[15px] text-app-secondary leading-relaxed font-sans">
              {RailfieldData.problem.en}
            </p>
          </div>
        </section>

        {/* ── SECTION 3: PROCESS & BREAKDOWN ── */}
        <section className="space-y-5">
          <div className="space-y-3">
            <h2 className="text-[36px] font-crimson italic tracking-tighter heading-accent-yellow leading-tight">
              Process
            </h2>
            <p className="text-[15px] text-app-secondary leading-relaxed font-sans">
              {RailfieldData.process[0]?.overview?.en}
            </p>
          </div>

          <div className="space-y-3 text-[15px] leading-relaxed font-sans text-app-secondary">
            {RailfieldData.process.slice(1).map((step, idx) => (
              <p key={idx}>
                <strong className="heading-accent-yellow font-bold mr-1">
                  {step.label.en}
                </strong>
                <span>{step.desc.en}</span>
              </p>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: IMPACT & KEY LEARNINGS ── */}
        <section className="space-y-8">
          {/* Impact */}
          <div className="space-y-3">
            <h2 className="text-[36px] font-crimson italic tracking-tighter heading-accent-emerald leading-tight">
              Impact
            </h2>
            <p className="text-[15px] text-app-secondary leading-relaxed font-sans">
              {RailfieldData.impact.en}
            </p>
          </div>

          {/* Key Learnings */}
          <div className="space-y-3">
            <h2 className="text-[36px] font-crimson italic tracking-tighter heading-accent-emerald leading-tight">
              Key Learnings
            </h2>
            <p className="text-[15px] text-app-secondary leading-relaxed font-sans">
              {RailfieldData.keyLearnings.en}
            </p>
          </div>
        </section>

        {/* ── Footer Navigation ── */}
        <section className="pt-12 border-t border-app-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/projects"
            onClick={() => playCrispClick(0.5)}
            className="text-xs font-mono text-app-muted hover:text-app-primary transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Back to All Projects</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              playCrispClick(0.5)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-xs font-mono text-app-muted hover:text-app-accent transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </section>
      </main>

      {/* ── LIGHTBOX MODAL PREVIEW ── */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center">
            <img
              src={selectedImage}
              alt="Enlarged Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-app-subtle"
            />
            <span className="text-xs text-white/70 mt-3 font-mono">
              Click anywhere to close
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RailField

