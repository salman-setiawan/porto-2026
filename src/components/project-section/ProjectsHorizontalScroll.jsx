import { useRef, useState, useEffect, useCallback } from 'react'
import { DataProject } from '../../data/dataProject'
import ProjectCard from './ProjectCard'
import MoreProjectsCard from './MoreProjectsCard'

// Jarak scroll vertikal tetap (dalam piksel) untuk menggerakkan seluruh kartu project di desktop
const SCROLL_DISTANCE_PX = 1800

const ProjectsHorizontalScroll = ({ projects: customProjects, highlightIds, children }) => {
  // Support custom projects list, seleksi via highlightIds, atau default 3 project pertama
  const allProjects = DataProject.projects || []
  const projects = customProjects && customProjects.length > 0
    ? customProjects
    : highlightIds && highlightIds.length > 0
      ? highlightIds.map((id) => allProjects.find((p) => p.id === id)).filter(Boolean)
      : allProjects.slice(0, 3)

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )

  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleCheckMobile)
    return () => window.removeEventListener('resize', handleCheckMobile)
  }, [])

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const firstCardRef = useRef(null)
  const showcaseRef = useRef(null)

  // 'before' | 'pinned' | 'after'
  const [pinMode, setPinMode] = useState('before')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [contentHeight, setContentHeight] = useState(560)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Ukur tinggi riil dari showcase wrapper agar container fit dengan card & header
  useEffect(() => {
    if (isMobile || !showcaseRef.current) return

    const updateHeight = () => {
      if (showcaseRef.current) {
        const height = showcaseRef.current.offsetHeight
        if (height > 0) {
          setContentHeight(height)
        }
      }
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(() => {
      updateHeight()
    })
    resizeObserver.observe(showcaseRef.current)

    return () => resizeObserver.disconnect()
  }, [isMobile])

  const updateScroll = useCallback(() => {
    if (isMobile) return

    const container = containerRef.current
    if (!container) return

    const currentScrollY = window.scrollY || window.pageYOffset || 0
    const rect = container.getBoundingClientRect()

    // Koordinat piksel absolut awal section project di dokumen
    const triggerStartPixel = rect.top + currentScrollY
    const triggerEndPixel = triggerStartPixel + SCROLL_DISTANCE_PX

    let progress = 0
    let nextPinMode = 'before'

    if (currentScrollY < triggerStartPixel) {
      // 1. Belum mencapai koordinat piksel awal (user masih di Hero/About me)
      nextPinMode = 'before'
      progress = 0
    } else if (currentScrollY > triggerEndPixel) {
      // 2. Sudah melewati jarak piksel scroll (user lanjut ke Experience)
      nextPinMode = 'after'
      progress = 1
    } else {
      // 3. TERTRIGGER: Berada di antara triggerStartPixel dan triggerEndPixel
      nextPinMode = 'pinned'
      progress = (currentScrollY - triggerStartPixel) / SCROLL_DISTANCE_PX
    }

    setPinMode(nextPinMode)
    setScrollProgress(progress)

    // Perhitungan pergeseran horizontal dalam piksel
    const windowWidth = window.innerWidth
    let cardWidth = firstCardRef.current?.offsetWidth
    if (!cardWidth || cardWidth <= 0) {
      cardWidth = windowWidth >= 768 ? Math.min(860, windowWidth - 64) : Math.min(380, windowWidth - 32)
    }

    const gap = windowWidth >= 768 ? 32 : 16

    // Sisi kiri dan kanan grid utama (max-w-[920px] mx-auto px-4 md:px-8)
    const contentPadding = windowWidth >= 768 ? 32 : 16
    const gridLeft = Math.max(contentPadding, (windowWidth - 920) / 2 + contentPadding)
    const gridRight = windowWidth - gridLeft
    const startX = gridLeft

    // Lebar kartu MoreProjectsCard
    const moreCardWidth = windowWidth >= 768 ? 420 : 320

    // Ending point sejajar persis dengan sisi kanan grid header (teks "01 / 03")
    const totalContentWidth = projects.length * (cardWidth + gap) + moreCardWidth
    const endingOffset = windowWidth >= 768 ? 50 : 0
    const totalTravel = Math.max(0, startX + totalContentWidth - gridRight - endingOffset)
    const currentTranslateX = startX - progress * totalTravel

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`
    }

    const computedIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.floor(progress * projects.length))
    )
    setActiveCardIndex(computedIndex)
  }, [projects.length, isMobile])

  useEffect(() => {
    if (isMobile) return

    let rafId
    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateScroll)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    // Initial trigger check via animation frame
    const initRaf = requestAnimationFrame(updateScroll)
    const timer = setTimeout(updateScroll, 100)

    return () => {
      cancelAnimationFrame(initRaf)
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      clearTimeout(timer)
    }
  }, [updateScroll, isMobile])

  // Style posisi container pinned berdasarkan status piksel di Desktop
  const getPinStyle = () => {
    if (pinMode === 'pinned') {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 30,
      }
    }
    if (pinMode === 'after') {
      return {
        position: 'absolute',
        top: `${SCROLL_DISTANCE_PX}px`,
        left: 0,
        width: '100%',
        zIndex: 10,
      }
    }
    // 'before' - berada tepat di posisi alaminya di bawah Hero section
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10,
    }
  }

  // Tampilan khusus Mobile: Scroll vertikal normal (tidak pinned / tidak horizontal)
  if (isMobile) {
    return (
      <section id="projects-scroll-container" className="w-full py-8 space-y-6">
        {/* Header Section */}
        <div className="w-full max-w-[920px] mx-auto px-4 flex items-center justify-between">
          <h3 className="text-app-primary text-[32px] font-crimson italic tracking-tighter">
            Projects . .
          </h3>
          <span className="text-[14px] text-app-muted font-mono">
            0{projects.length} / 0{projects.length}
          </span>
        </div>

        {/* Vertical Feed Cards */}
        <div className="w-full max-w-[920px] mx-auto px-4 space-y-6">
          {projects.map((project, index) => (
            <div key={project.id || index} className="w-full">
              <ProjectCard project={project} />
            </div>
          ))}

          {/* More Projects Card */}
          <div className="w-full pt-2">
            <MoreProjectsCard
              url="/projects"
              className="w-full !w-full h-auto min-h-[220px]"
            />
          </div>
        </div>

        {/* Playground / Children Section */}
        {children && (
          <div className="w-full mt-6">
            {children}
          </div>
        )}
      </section>
    )
  }

  // Tampilan Desktop (md ke atas): Tetap Pinned Horizontal Scroll
  return (
    <div
      ref={containerRef}
      id="projects-scroll-container"
      className="relative w-full"
      style={{
        // Total tinggi dalam piksel = tinggi konten riil + jarak scroll horizontal
        height: `${contentHeight + SCROLL_DISTANCE_PX}px`,
      }}
    >
      {/* Container Showcase */}
      <div
        ref={showcaseRef}
        style={getPinStyle()}
        className="overflow-hidden flex flex-col py-6 pointer-events-auto bg-app-primary"
      >
        {/* Header Section: Title "Projects" & Indikator Slide */}
        <div className="w-full max-w-[920px] mx-auto px-4 md:px-8 mb-2 flex items-center justify-between z-10 shrink-0">
          <h3 className="text-app-primary text-[32px] md:text-[36px] font-crimson italic tracking-tighter">
            Projects . .
          </h3>
          <span className="text-[14px]">
            0{activeCardIndex + 1} / 0{projects.length}
          </span>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex items-center gap-4 will-change-transform"
          >
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                ref={index === 0 ? firstCardRef : null}
                className="w-full max-w-[400px] md:max-w-[860px] shrink-0"
              >
                <ProjectCard project={project} />
              </div>
            ))}

            {/* Ending Slide: Box "Show More Project" */}
            <MoreProjectsCard url="/projects" scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* Section Bawah (SeamlessSlider Playground) yang langsung muncul saat scroll horizontal */}
        {children && (
          <div className="w-full mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsHorizontalScroll
