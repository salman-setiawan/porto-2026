import { useRef, useState, useEffect, useCallback } from 'react'
import { playMechanicalSound } from '../../utils/sound'

// Jarak scroll vertikal tetap (dalam piksel) untuk menggerakkan seluruh gambar
const SCROLL_DISTANCE_PX = 1800

const ImagesHorizontalScroll = ({
  images = [],
  title = "Interface Showcase . .",
  subtitle,
  onImageClick,
  scrollDistance = SCROLL_DISTANCE_PX,
  maxWidth = 880,
  children,
}) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const firstCardRef = useRef(null)
  const showcaseRef = useRef(null)

  // 'before' | 'pinned' | 'after'
  const [pinMode, setPinMode] = useState('before')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [contentHeight, setContentHeight] = useState(560)

  // Ukur tinggi riil dari showcase wrapper agar container fit dengan card & header
  useEffect(() => {
    if (!showcaseRef.current) return

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
  }, [])

  const updateScroll = useCallback(() => {
    const container = containerRef.current
    if (!container || images.length === 0) return

    const currentScrollY = window.scrollY || window.pageYOffset || 0
    const rect = container.getBoundingClientRect()

    // Koordinat piksel absolut awal section di dokumen
    const triggerStartPixel = rect.top + currentScrollY
    const triggerEndPixel = triggerStartPixel + scrollDistance

    let progress = 0
    let nextPinMode = 'before'

    if (currentScrollY < triggerStartPixel) {
      // 1. Belum mencapai koordinat piksel awal
      nextPinMode = 'before'
      progress = 0
    } else if (currentScrollY > triggerEndPixel) {
      // 2. Sudah melewati jarak piksel scroll
      nextPinMode = 'after'
      progress = 1
    } else {
      // 3. TERTRIGGER: Berada di antara triggerStartPixel dan triggerEndPixel
      nextPinMode = 'pinned'
      progress = (currentScrollY - triggerStartPixel) / scrollDistance
    }

    setPinMode(nextPinMode)

    // Perhitungan pergeseran horizontal dalam piksel
    const windowWidth = window.innerWidth
    let cardWidth = firstCardRef.current?.offsetWidth
    if (!cardWidth || cardWidth <= 0) {
      cardWidth = windowWidth >= 768 ? 280 : 240
    }

    const gap = windowWidth >= 768 ? 24 : 16

    // Sisi kiri dan kanan grid utama (max-w-[maxWidth] mx-auto px-4 sm:px-6 md:px-8)
    const contentPadding = windowWidth >= 640 ? 24 : 16
    const gridLeft = Math.max(contentPadding, (windowWidth - maxWidth) / 2 + contentPadding)
    const gridRight = windowWidth - gridLeft
    const startX = gridLeft

    // Total content width dari seluruh kartu gambar
    const totalContentWidth = images.length * cardWidth + (images.length - 1) * gap

    // Ending point sejajar persis dengan sisi kanan grid header
    // Pada saat progress = 1:
    // startX - progress * totalTravel + totalContentWidth = gridRight
    // => totalTravel = startX + totalContentWidth - gridRight
    const totalTravel = Math.max(0, startX + totalContentWidth - gridRight)
    const currentTranslateX = startX - progress * totalTravel

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`
    }

    const computedIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(progress * images.length))
    )
    setActiveCardIndex(computedIndex)
  }, [images.length, scrollDistance, maxWidth])

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateScroll)
    }

    const handleScroll = () => {
      requestAnimationFrame(updateScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    // Initial trigger check via animation frame
    const initRaf = requestAnimationFrame(updateScroll)
    const timer = setTimeout(updateScroll, 100)

    return () => {
      cancelAnimationFrame(initRaf)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [updateScroll])

  // Style posisi container pinned berdasarkan status piksel
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
        top: `${scrollDistance}px`,
        left: 0,
        width: '100%',
        zIndex: 10,
      }
    }
    // 'before' - berada tepat di posisi alaminya di bawah Header section
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10,
    }
  }

  return (
    <div
      ref={containerRef}
      id="images-scroll-container"
      className="relative w-full"
      style={{
        // Total tinggi dalam piksel = tinggi konten riil + jarak scroll horizontal
        height: `${contentHeight + scrollDistance}px`,
      }}
    >
      {/* Container Showcase */}
      <div
        ref={showcaseRef}
        style={getPinStyle()}
        className="overflow-hidden flex flex-col py-6 pointer-events-auto bg-app-primary"
      >
        {/* Header Section: Title & Indikator Slide */}
        <div
          className="w-full mx-auto px-4 sm:px-6 md:px-8 mb-4 flex items-center justify-between z-10 shrink-0"
          style={{ maxWidth: `${maxWidth}px` }}
        >
          <div>
            <h3 className="text-app-primary text-[32px] md:text-[36px] font-crimson italic tracking-tighter">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-app-muted font-mono mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-[14px] font-mono text-app-secondary">
            0{activeCardIndex + 1} / 0{images.length}
          </span>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex items-center gap-4 md:gap-6 will-change-transform"
          >
            {images.map((item, index) => {
              const src = typeof item === 'string' ? item : item.src
              const itemTitle = typeof item === 'object' ? item.title || item.label : null
              const isCurrent = activeCardIndex === index

              return (
                <div
                  key={index}
                  ref={index === 0 ? firstCardRef : null}
                  onClick={() => {
                    playMechanicalSound(index + 1, 0.2)
                    if (onImageClick) onImageClick(src)
                  }}
                  className={`group relative h-[440px] md:h-[480px] w-[240px] sm:w-[260px] md:w-[280px] shrink-0 cursor-zoom-in rounded-2xl border transition-all duration-300 p-2.5 sm:p-3 overflow-hidden flex flex-col justify-between ${
                    isCurrent
                      ? 'border-app-accent bg-app-surface/60 shadow-lg shadow-orange-500/10'
                      : 'border-app-subtle bg-app-surface/20 hover:border-app-medium hover:bg-app-surface/40'
                  }`}
                >
                  {/* Visual Image Screen */}
                  <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
                    <img
                      src={src}
                      alt={itemTitle || `Screenshot ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 pointer-events-none text-white text-xs font-mono">
                      <span>Click to enlarge</span>
                      <span>↗</span>
                    </div>
                  </div>

                  {/* Caption & Indicator */}
                  {itemTitle && (
                    <div className="pt-2.5 px-1 flex items-center justify-between shrink-0">
                      <span className="text-xs font-medium text-app-primary truncate">
                        {itemTitle}
                      </span>
                      <span className="text-[10px] font-mono text-app-muted">
                        #{index + 1}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Section Bawah jika ada slot children */}
        {children && (
          <div className="w-full mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImagesHorizontalScroll
