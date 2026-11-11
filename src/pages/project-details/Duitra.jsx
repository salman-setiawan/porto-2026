import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { playCrispClick, playMechanicalSound } from '../../utils/sound'
import DuitraData from '../../data/projects/duitra'
import ImagesHorizontalScroll from '../../components/project-section/ImagesHorizontalScroll'
import CaseStudySection from '../../components/project-section/ProjectCaseStudyContent'
import ProjectMeta from '../../components/project-section/ProjectMeta'

const DUITRA_GALLERY_IMAGES = [
  { title: 'Dashboard Screen',                src: '/projects/duitra-app/gallery/dashboard.png' },
  { title: 'Add Transaction & Voice Input',   src: '/projects/duitra-app/gallery/add-transaction.png' },
  { title: 'Transaction History & Filters',   src: '/projects/duitra-app/gallery/history.png' },
  { title: 'Budget & Categories Breakdown',   src: '/projects/duitra-app/gallery/categories.png' },
  { title: 'Analytics & Monthly Trends',      src: '/projects/duitra-app/gallery/analytics.png' },
]

const Duitra = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })
    let rafId
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  const handleOpenImage = (src) => { playMechanicalSound(2, 0.2); setSelectedImage(src) }

  return (
    <div className="flex flex-col w-full relative min-h-screen bg-app-primary text-app-primary font-sans transition-colors duration-300 selection:bg-orange-500/30 selection:text-orange-400 pb-24 overflow-x-clip">

      {/* ── SECTION 1: HEADER TITLE & METADATA ── */}
      <section className="pt-8 pb-4 max-w-[820px] px-4 sm:px-0 space-y-8 mx-auto w-full">
        <h1 className="text-[40px] font-crimson italic tracking-tight text-app-primary">
          {DuitraData.title}
        </h1>
        <ProjectMeta data={DuitraData} />
      </section>

      {/* ── SECTION 1B: HORIZONTAL SCROLL IMAGES SHOWCASE ── */}
      <ImagesHorizontalScroll
        images={DUITRA_GALLERY_IMAGES}
        title="Mobile Application Flow . ."
        subtitle="Panned showcase of core screens:"
        onImageClick={handleOpenImage}
        scrollDistance={1800}
        maxWidth={880}
      >
        <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 space-y-12">

          {/* Overview + Problem */}
          <section className="space-y-8 pt-4">
            <CaseStudySection title="Overview" accent="amber">
              <div className="space-y-3">
                {DuitraData.overview.map((para, idx) => <p key={idx}>{para.en}</p>)}
              </div>
            </CaseStudySection>

            <CaseStudySection title="Problem" accent="amber">
              <p>{DuitraData.problem.en}</p>
            </CaseStudySection>
          </section>

          {/* Process */}
          <section className="space-y-5">
            <CaseStudySection title="Process" accent="yellow">
              <p>{DuitraData.process[0]?.overview?.en}</p>
            </CaseStudySection>

            <div className="space-y-3 leading-relaxed font-sans text-app-secondary">
              {DuitraData.process.slice(1).map((step, idx) => (
                <p key={idx}>
                  <strong className="heading-accent-yellow font-bold mr-1">{step.label.en}</strong>
                  <span>{step.desc.en}</span>
                </p>
              ))}
            </div>
          </section>

          {/* Impact + Key Learnings */}
          <section className="space-y-8">
            <CaseStudySection title="Impact" accent="emerald">
              <p>{DuitraData.impact.en}</p>
            </CaseStudySection>

            <CaseStudySection title="Key Learnings" accent="emerald">
              <p>{DuitraData.keyLearnings.en}</p>
            </CaseStudySection>
          </section>

          {/* Footer */}
          <section className="pt-8 border-t border-app-subtle w-full flex justify-center">
            <button
              type="button"
              onClick={() => { playCrispClick(0.5); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="text-app-muted hover:text-app-accent transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
          </section>
        </div>
      </ImagesHorizontalScroll>

      {/* ── LIGHTBOX ── */}
      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center cursor-zoom-out animate-fadeIn">
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center">
            <img src={selectedImage} alt="Enlarged Preview" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-app-subtle" />
            <span className="text-xs text-white/70 mt-3 font-mono">Click anywhere to close</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Duitra
