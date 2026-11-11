import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { playCrispClick, playMechanicalSound } from '../../utils/sound'
import EduworkData from '../../data/projects/eduwork'
import SeamlessSlider from '../../components/showcase-section/SeamlessSlider'
import CaseStudySection from '../../components/project-section/ProjectCaseStudyContent'
import ProjectMeta from '../../components/project-section/ProjectMeta'

const EDUWORK_GALLERY_SHOTS = [
  '/projects/eduwork/gallery/screen1.webp',
  '/projects/eduwork/gallery/screen2.webp',
  '/projects/eduwork/gallery/screen3.webp',
  '/projects/eduwork/gallery/screen4.webp',
  '/projects/eduwork/gallery/screen5.webp',
  '/projects/eduwork/gallery/screen6.webp',
  '/projects/eduwork/gallery/screen7.webp',
  '/projects/eduwork/gallery/screen8.webp',
  '/projects/eduwork/gallery/screen9.webp',
  '/projects/eduwork/gallery/screen10.webp',
  '/projects/eduwork/gallery/screen11.webp',
]

const Eduwork = () => {
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
    <div className="min-h-screen bg-app-primary text-app-primary font-sans transition-colors duration-300 relative selection:bg-orange-500/30 selection:text-orange-400 pb-24">
      <main className="max-w-[880px] mx-auto px-4 sm:px-6 space-y-12">

        {/* ── SECTION 1: HEADER TITLE & METADATA ── */}
        <section className="pt-8 pb-4 space-y-8">
          <h1 className="text-[40px] font-crimson italic tracking-tight text-app-primary">
            {EduworkData.title}
          </h1>
          <ProjectMeta data={EduworkData} />
        </section>

        {/* ── SECTION 1B: SEAMLESS SLIDER ── */}
        <section className="space-y-4">
          <div>
            <h2 className="text-[36px] font-crimson italic tracking-tighter text-app-primary leading-tight">
              Final User Interface
            </h2>
            <p className="text-sm text-app-muted">
              High-fidelity mentor website landing page layout
            </p>
          </div>
          <div className="relative w-full overflow-hidden border border-app-subtle bg-app-surface/40">
            <SeamlessSlider
              shots={EDUWORK_GALLERY_SHOTS}
              heightClass="h-[320px] sm:h-[360px]"
              showOverlayGradients={false}
              className="w-full"
              speedMultiplier={2}
            />
          </div>
        </section>

        {/* ── SECTION 2: OVERVIEW + PROBLEM ── */}
        <section className="space-y-8">
          <CaseStudySection title="Overview" accent="amber">
            <div className="space-y-3">
              {EduworkData.overview.map((para, idx) => <p key={idx}>{para.en}</p>)}
            </div>
          </CaseStudySection>

          <CaseStudySection title="Problem" accent="amber">
            <p>{EduworkData.problem.en}</p>
          </CaseStudySection>
        </section>

        {/* ── SECTION 3: PROCESS ── */}
        <section className="space-y-5">
          {/* Process flow diagram */}
          <div
            onClick={() => handleOpenImage(EduworkData.processImg)}
            className="group relative border border-app-subtle bg-app-surface/60 p-4 sm:p-6 overflow-hidden cursor-zoom-in flex items-center justify-center transition-all hover:border-app-accent shadow-sm"
          >
            <img
              src={EduworkData.processImg}
              alt="Eduwork Design Process Diagram"
              loading="lazy"
              className="w-full max-w-[760px] h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none text-white text-xs font-mono">
              <span>Click to enlarge diagram</span>
              <span>↗</span>
            </div>
          </div>

          <CaseStudySection title="Process" accent="yellow">
            <p>{EduworkData.process[0]?.overview?.en}</p>
          </CaseStudySection>

          <div className="space-y-3 leading-relaxed font-sans text-app-secondary">
            {EduworkData.process.slice(1).map((step, idx) => (
              <p key={idx}>
                <strong className="heading-accent-yellow font-bold mr-1">{step.label.en}</strong>
                <span>{step.desc.en}</span>
              </p>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: IMPACT + KEY LEARNINGS ── */}
        <section className="space-y-8">
          <CaseStudySection title="Impact" accent="emerald">
            <p>{EduworkData.impact.en}</p>
          </CaseStudySection>

          <CaseStudySection title="Key Learnings" accent="emerald">
            <p>{EduworkData.keyLearnings.en}</p>
          </CaseStudySection>
        </section>

        {/* ── Footer ── */}
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
      </main>

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

export default Eduwork
