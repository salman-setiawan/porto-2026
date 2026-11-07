import { useState, useEffect } from 'react'
import Button from '../Button'

// All portfolio shots
const SHOTS = [
  '/shots/estore.webp',
  '/shots/halogbs.webp',
  '/shots/learnx.webp',
  '/shots/musplay.webp',
]

// Duplicate shots to ensure we have enough for 3 columns
const ALL_SHOTS = [...SHOTS, ...SHOTS, ...SHOTS]

// Split into columns (distribute evenly)
const splitIntoColumns = (items, numCols) => {
  const columns = Array.from({ length: numCols }, () => [])
  items.forEach((item, index) => {
    columns[index % numCols].push(item)
  })
  return columns
}

// Pre-computed columns (hanya dihitung 1x di level modul)
const COLUMNS_3 = splitIntoColumns(ALL_SHOTS, 3)
const COLUMNS_2 = splitIntoColumns(ALL_SHOTS, 2)

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

const SeamlessSlider = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="w-full pb-16 bg-app-primary overflow-hidden">
      <div className="max-w-[860px] mx-auto relative z-[110] top-12 pointer-events-none px-4 md:px-8">
        <h3 className="text-app-primary text-[80px] font-crimson h-[100px] italic tracking-tighter">Playground</h3>
        <p className="text-app-secondary text-sm mt-2">A collection of my other design explorations and shots.</p>
      </div>

      <div className="max-w-[860px] px-0 md:px-8 mx-auto relative flex justify-center h-[400px] -mt-[50px]">
        {/* Render adaptif: hanya me-render satu varian kolom yang sesuai breakpoint untuk menghindari duplikasi 48 node DOM & animasi tak henti */}
        {isDesktop ? (
          /* Desktop: 3 columns */
          <div className="flex gap-2 w-full">
            <Column shots={COLUMNS_3[0]} direction="up" duration={30} className="h-full" />
            <Column shots={COLUMNS_3[1]} direction="down" duration={35} className="h-full" />
            <Column shots={COLUMNS_3[2]} direction="up" duration={30} className="h-full" />
          </div>
        ) : (
          /* Mobile & Tablet: 2 columns */
          <div className="flex gap-2 w-fit mx-auto overflow-visible">
            <Column shots={COLUMNS_2[0]} direction="up" duration={30} className="h-full w-[440px]" />
            <Column shots={COLUMNS_2[1]} direction="down" duration={30} className="h-full w-[440px]" />
          </div>
        )}

        {/* Top Overlay Gradient */}
        <div
          className="absolute inset-x-0 top-0 h-[320px] z-[100] pointer-events-none"
          style={{ background: 'var(--slider-gradient-top)' }}
        />

        {/* Bottom Overlay Gradient & CTA Button */}
        <div
          className="absolute inset-x-0 bottom-0 h-[320px] z-[100] flex items-end justify-center pb-10 pointer-events-none"
          style={{ background: 'var(--slider-gradient-bottom)' }}
        >
          <div className="pointer-events-auto">
            <Button
              label="Click to See More"
              type="base"
              url="https://dribbble.com/eisenflux"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeamlessSlider
