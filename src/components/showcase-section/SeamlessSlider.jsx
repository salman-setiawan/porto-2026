import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { playCrispClick, playMechanicalSound } from '../../utils/sound'

// All portfolio shots default
const SHOTS = [
  '/shots/estore.webp',
  '/shots/halogbs.webp',
  '/shots/learnx.webp',
  '/shots/musplay.webp',
]

// Split into columns (distribute evenly)
const splitIntoColumns = (items, numCols) => {
  const columns = Array.from({ length: numCols }, () => [])
  items.forEach((item, index) => {
    columns[index % numCols].push(item)
  })
  return columns
}

const Column = ({
  shots,
  direction = 'up',
  duration = 20,
  className = "",
}) => {
  const animationName = direction === 'up' ? 'scroll-up' : 'scroll-down'

  return (
    <div className={`flex-1 overflow-hidden relative ${className}`}>
      <div
        className="flex flex-col gap-2 group-hover/slider:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* First set */}
        {shots.map((item, index) => (
          <div
            key={`a-${index}`}
            data-index={item.originalIndex}
            className="rounded-md overflow-hidden shrink-0 select-none"
          >
            <img
              src={item.src}
              alt={item.title || `Portfolio shot ${item.originalIndex + 1}`}
              className="w-full block"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {shots.map((item, index) => (
          <div
            key={`b-${index}`}
            data-index={item.originalIndex}
            className="rounded-md overflow-hidden shrink-0 select-none"
          >
            <img
              src={item.src}
              alt={item.title || `Portfolio shot ${item.originalIndex + 1}`}
              className="w-full block"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const SeamlessSlider = ({
  shots = SHOTS,
  className = "",
  showOverlayGradients = true,
  heightClass = "h-[400px]",
  topOverlayHeight = "h-[320px]",
  bottomOverlayHeight = "h-[320px]",
  speedMultiplier = 1,
  enableEnlarge = false,
}) => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )
  const [activeIndex, setActiveIndex] = useState(null)
  const touchStartRef = useRef(null)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Normalisasi data shots: mendukung baik array of strings maupun array of objects { src, title, desc }
  const normalizedShots = useMemo(() => {
    const list = shots && shots.length > 0 ? shots : SHOTS
    return list.map((item, index) => {
      if (typeof item === 'string') {
        return {
          src: item,
          title: `Screenshot ${index + 1}`,
          desc: '',
          originalIndex: index,
        }
      }
      return {
        src: item.src,
        title: item.title || item.name || item.pageName || `Screenshot ${index + 1}`,
        desc: item.desc || item.description || '',
        originalIndex: index,
      }
    })
  }, [shots])

  // Siapkan data shots terduplikasi agar cukup untuk kolom
  const effectiveShots = useMemo(() => {
    return [...normalizedShots, ...normalizedShots, ...normalizedShots]
  }, [normalizedShots])

  const columns3 = useMemo(() => splitIntoColumns(effectiveShots, 3), [effectiveShots])
  const columns2 = useMemo(() => splitIntoColumns(effectiveShots, 2), [effectiveShots])

  // Handlers untuk Lightbox Modal
  const handleOpen = useCallback((idx) => {
    playMechanicalSound(2, 0.2)
    setActiveIndex(idx)
  }, [])

  const handleClose = useCallback(() => {
    playCrispClick(0.3)
    setActiveIndex(null)
  }, [])

  const handlePrev = useCallback(() => {
    playCrispClick(0.4)
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : normalizedShots.length - 1))
  }, [normalizedShots.length])

  const handleNext = useCallback(() => {
    playCrispClick(0.4)
    setActiveIndex((prev) => (prev < normalizedShots.length - 1 ? prev + 1 : 0))
  }, [normalizedShots.length])

  // Klik satu area slider langsung membuka modal (jika tepat di atas salah satu card, buka card tersebut)
  const handleContainerClick = (e) => {
    if (!enableEnlarge) return
    const card = e.target.closest('[data-index]')
    if (card && card.dataset.index !== undefined) {
      const idx = parseInt(card.dataset.index, 10)
      handleOpen(Number.isNaN(idx) ? 0 : idx)
    } else {
      handleOpen(0)
    }
  }

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, handleClose, handlePrev, handleNext])

  // Swipe gesture pada mobile
  const onTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartRef.current = e.touches[0].clientX
    }
  }

  const onTouchEnd = (e) => {
    if (touchStartRef.current === null || !e.changedTouches || !e.changedTouches[0]) return
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current
    if (deltaX > 45) {
      handlePrev()
    } else if (deltaX < -45) {
      handleNext()
    }
    touchStartRef.current = null
  }

  const currentShot = activeIndex !== null ? normalizedShots[activeIndex] : null

  return (
    <div
      onClick={enableEnlarge ? handleContainerClick : undefined}
      className={`w-full overflow-hidden relative group/slider ${
        enableEnlarge ? 'cursor-zoom-in' : ''
      } ${className}`}
    >
      <div className={`w-full relative flex justify-center ${heightClass}`}>
        {/* Render adaptif: hanya me-render satu varian kolom yang sesuai breakpoint */}
        {isDesktop ? (
          /* Desktop: 3 columns */
          <div className="flex gap-2 w-full">
            <Column
              shots={columns3[0]}
              direction="up"
              duration={30 * speedMultiplier}
              className="h-full"
            />
            <Column
              shots={columns3[1]}
              direction="down"
              duration={35 * speedMultiplier}
              className="h-full"
            />
            <Column
              shots={columns3[2]}
              direction="up"
              duration={30 * speedMultiplier}
              className="h-full"
            />
          </div>
        ) : (
          /* Mobile & Tablet: 2 columns */
          <div className="flex gap-2 w-fit mx-auto overflow-visible">
            <Column
              shots={columns2[0]}
              direction="up"
              duration={30 * speedMultiplier}
              className="h-full w-[440px]"
            />
            <Column
              shots={columns2[1]}
              direction="down"
              duration={30 * speedMultiplier}
              className="h-full w-[440px]"
            />
          </div>
        )}

        {/* Top Overlay Gradient */}
        {showOverlayGradients && (
          <div
            className={`absolute inset-x-0 top-0 ${topOverlayHeight} z-[100] pointer-events-none`}
            style={{ background: 'var(--slider-gradient-top)' }}
          />
        )}

        {/* Bottom Overlay Gradient */}
        {showOverlayGradients && (
          <div
            className={`absolute inset-x-0 bottom-0 ${bottomOverlayHeight} z-[100] pointer-events-none`}
            style={{ background: 'var(--slider-gradient-bottom)' }}
          />
        )}

        {/* Single Full-Area Hover Cue for Enlarge */}
        {enableEnlarge && (
          <div className="absolute inset-0 z-[105] pointer-events-none bg-black/20 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono shadow-2xl tracking-wide">
              <span>Click to enlarge gallery</span>
              <span className="text-orange-400 font-semibold">({normalizedShots.length} screens)</span>
              <span>↗</span>
            </div>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX MODAL DIALOG (CLICK TO ENLARGE) ── */}
      {typeof document !== 'undefined' && activeIndex !== null && currentShot && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/92 backdrop-blur-md p-3 sm:p-6 md:p-8 animate-fadeIn select-none"
          onClick={handleClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Header Bar */}
          <div
            className="w-full flex items-center justify-between z-10 shrink-0 max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs sm:text-sm text-neutral-300 tracking-widest bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                {String(activeIndex + 1).padStart(2, '0')} / {String(normalizedShots.length).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-neutral-400">
                Gallery Preview
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white transition-all text-xs font-mono border border-white/20 cursor-pointer active:scale-95 shadow-sm"
            >
              <span>Close</span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline">(Esc)</span>
              <span className="font-sans text-sm leading-none ml-0.5">✕</span>
            </button>
          </div>

          {/* Center Image Stage with Floating Arrows */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-auto min-h-0 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-1 sm:left-3 z-20 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-neutral-800 border border-white/20 hover:border-orange-500/80 text-white hover:text-orange-400 backdrop-blur-md transition-all cursor-pointer shadow-xl active:scale-90 flex items-center justify-center group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative max-w-full max-h-full flex items-center justify-center px-10 sm:px-16">
              <img
                key={currentShot.src}
                src={currentShot.src}
                alt={currentShot.title}
                className="max-h-[56vh] sm:max-h-[64vh] md:max-h-[70vh] w-auto max-w-full object-contain rounded-lg border border-white/10 shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-1 sm:right-3 z-20 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-neutral-800 border border-white/20 hover:border-orange-500/80 text-white hover:text-orange-400 backdrop-blur-md transition-all cursor-pointer shadow-xl active:scale-90 flex items-center justify-center group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Info Card: Nama Halaman + Deskripsi Singkat */}
          <div
            className="w-full max-w-2xl mx-auto shrink-0 z-10 px-4 py-3 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-white/15 text-center space-y-1 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-base sm:text-lg font-crimson italic font-semibold text-white tracking-tight">
                {currentShot.title}
              </h3>
              <span className="text-[11px] font-mono text-orange-400 bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 rounded-full">
                #{activeIndex + 1}
              </span>
            </div>
            {currentShot.desc && (
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-xl mx-auto">
                {currentShot.desc}
              </p>
            )}
            <div className="pt-1 flex items-center justify-center gap-3 text-[10px] font-mono text-neutral-400">
              <span>← / → Keyboard</span>
              <span>•</span>
              <span>Swipe on mobile</span>
              <span>•</span>
              <span>Click outside to close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default SeamlessSlider