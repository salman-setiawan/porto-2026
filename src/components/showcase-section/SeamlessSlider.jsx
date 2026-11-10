import { useState, useEffect } from 'react'

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

const Column = ({ shots, direction = 'up', duration = 20, className = "" }) => {
  const animationName = direction === 'up' ? 'scroll-up' : 'scroll-down'

  return (
    <div className={`flex-1 overflow-hidden relative ${className}`}>
      <div
        className="flex flex-col gap-2"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* First set */}
        {shots.map((shot, index) => (
          <div key={`a-${index}`} className="rounded-md overflow-hidden">
            <img
              src={shot}
              alt={`Portfolio shot ${index + 1}`}
              className="w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {shots.map((shot, index) => (
          <div key={`b-${index}`} className="rounded-md overflow-hidden">
            <img
              src={shot}
              alt={`Portfolio shot ${index + 1}`}
              className="w-full"
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
}) => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Siapkan data shots terduplikasi agar cukup untuk kolom
  const baseShots = shots && shots.length > 0 ? shots : SHOTS
  const effectiveShots = [...baseShots, ...baseShots, ...baseShots]
  const columns3 = splitIntoColumns(effectiveShots, 3)
  const columns2 = splitIntoColumns(effectiveShots, 2)

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className={`w-full relative flex justify-center ${heightClass}`}>
        {/* Render adaptif: hanya me-render satu varian kolom yang sesuai breakpoint */}
        {isDesktop ? (
          /* Desktop: 3 columns */
          <div className="flex gap-2 w-full">
            <Column shots={columns3[0]} direction="up" duration={30 * speedMultiplier} className="h-full" />
            <Column shots={columns3[1]} direction="down" duration={35 * speedMultiplier} className="h-full" />
            <Column shots={columns3[2]} direction="up" duration={30 * speedMultiplier} className="h-full" />
          </div>
        ) : (
          /* Mobile & Tablet: 2 columns */
          <div className="flex gap-2 w-fit mx-auto overflow-visible">
            <Column shots={columns2[0]} direction="up" duration={30 * speedMultiplier} className="h-full w-[440px]" />
            <Column shots={columns2[1]} direction="down" duration={30 * speedMultiplier} className="h-full w-[440px]" />
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
      </div>
    </div>
  )
}

export default SeamlessSlider
