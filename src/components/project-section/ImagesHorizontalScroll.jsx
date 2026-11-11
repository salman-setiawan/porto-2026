import { useRef, useState, useEffect, useCallback } from 'react'
import { playMechanicalSound } from '../../utils/sound'

// Jarak scroll vertikal default untuk menyelesaikan transisi horizontal slide gambar
const DEFAULT_SCROLL_DISTANCE_PX = 1400

const ImagesHorizontalScroll = ({
  images = [],
  title = "Interface Showcase",
  subtitle = "Horizontal gallery preview",
  onImageClick,
  scrollDistance = DEFAULT_SCROLL_DISTANCE_PX,
  cardWidthClass = "w-[280px] sm:w-[320px] md:w-[360px]",
  cardAspectClass = "aspect-[9/19]", // Default rasio layar smartphone mobile
}) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const firstCardRef = useRef(null)
  const showcaseRef = useRef(null)

  const [pinMode, setPinMode] = useState('before')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [contentHeight, setContentHeight] = useState(620)

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
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(showcaseRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const updateScroll = useCallback(() => {
    const container = containerRef.current
    if (!container || images.length === 0) return

    const currentScrollY = window.scrollY || window.pageYOffset || 0
    const rect = container.getBoundingClientRect()

    const triggerStartPixel = rect.top + currentScrollY
    const triggerEndPixel = triggerStartPixel + scrollDistance

    let progress = 0
    let nextPinMode = 'before'

    if (currentScrollY < triggerStartPixel) {
      nextPinMode = 'before'
      progress = 0
    } else if (currentScrollY > triggerEndPixel) {
      nextPinMode = 'after'
      progress = 1
    } else {
      nextPinMode = 'pinned'
      progress = (currentScrollY - triggerStartPixel) / scrollDistance
    }

    setPinMode(nextPinMode)

    const windowWidth = window.innerWidth
    let cardWidth = firstCardRef.current?.offsetWidth
    if (!cardWidth || cardWidth <= 0) {
      cardWidth = windowWidth >= 768 ? 360 : 300
    }

    const gap = windowWidth >= 768 ? 24 : 16
    const contentPadding = windowWidth >= 768 ? 32 : 16
    const gridLeft = Math.max(contentPadding, (windowWidth - 880) / 2 + contentPadding)
    const gridRight = windowWidth - gridLeft
    const startX = gridLeft

    const totalContentWidth = images.length * cardWidth + (images.length - 1) * gap
    const totalTravel = Math.max(0, startX + totalContentWidth - gridRight + contentPadding)
    const currentTranslateX = startX - progress * totalTravel

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`
    }

    const computedIndex = Math.min(
      images.length - 1,
      Math.max(0, Math.floor(progress * images.length))
    )
    setActiveImageIndex(computedIndex)
  }, [images.length, scrollDistance])

  useEffect(() => {
    const handleResize = () => requestAnimationFrame(updateScroll)
    const handleScroll = () => requestAnimationFrame(updateScroll)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    const initRaf = requestAnimationFrame(updateScroll)
    const timer = setTimeout(updateScroll, 120)

    return () => {
      cancelAnimationFrame(initRaf)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [updateScroll])

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
      className="relative w-full"
      style={{
        height: `${contentHeight + scrollDistance}px`,
      }}
    >
      <div
        ref={showcaseRef}
        style={getPinStyle()}
        className="overflow-hidden flex flex-col py-8 pointer-events-auto bg-app-primary"
      >
        {/* Header Section */}
        <div className="w-full max-w-[880px] mx-auto px-4 sm:px-6 mb-4 flex items-baseline justify-between z-10 shrink-0">
          <div>
            <h2 className="text-[32px] md:text-[36px] font-crimson italic tracking-tighter text-app-primary leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-app-muted font-mono mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-[14px] font-mono text-app-accent">
            0{activeImageIndex + 1} / 0{images.length}
          </span>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full overflow-visible py-2">
          <div
            ref={trackRef}
            className="flex items-center gap-4 sm:gap-6 will-change-transform"
          >
            {images.map((item, index) => {
              const src = typeof item === 'string' ? item : item.src
              const itemTitle = typeof item === 'object' ? item.title || item.label : null
              const isCurrent = activeImageIndex === index

              return (
                <div
                  key={index}
                  ref={index === 0 ? firstCardRef : null}
                  onClick={() => {
                    playMechanicalSound(index + 1, 0.2)
                    if (onImageClick) onImageClick(src)
                  }}
                  className={`group relative ${cardWidthClass} shrink-0 cursor-zoom-in rounded-2xl border transition-all duration-300 p-2 sm:p-3 overflow-hidden shadow-lg ${
                    isCurrent
                      ? 'border-app-accent bg-app-surface/60'
                      : 'border-app-subtle bg-app-surface/30 hover:border-app-medium'
                  }`}
                >
                  <div className={`relative w-full ${cardAspectClass} rounded-xl overflow-hidden bg-black/20 flex items-center justify-center`}>
                    <img
                      src={src}
                      alt={itemTitle || `Showcase screenshot ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none text-white text-xs font-mono">
                      <span>Click to enlarge</span>
                      <span>↗</span>
                    </div>
                  </div>

                  {itemTitle && (
                    <div className="pt-2.5 px-1 flex items-center justify-between">
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
      </div>
    </div>
  )
}

export default ImagesHorizontalScroll

