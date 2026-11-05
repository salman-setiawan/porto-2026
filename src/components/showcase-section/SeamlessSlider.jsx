import React from 'react'
import Button from '../Button'

// All portfolio shots - add more as needed
const shots = [
  '/shots/estore.webp',
  '/shots/halogbs.webp',
  '/shots/learnx.webp',
  '/shots/musplay.webp',
]

// Duplicate shots to ensure we have enough for 3 columns
const allShots = [...shots, ...shots, ...shots]

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
          willChange: 'transform'
        }}
      >
        {/* First set */}
        {shots.map((shot, index) => (
          <div
            key={`a-${index}`}
            className="rounded-md overflow-hidden border border-white/10 flex-shrink-0"
          >
            <img
              src={shot}
              alt={`Portfolio shot ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {shots.map((shot, index) => (
          <div
            key={`b-${index}`}
            className="rounded-md overflow-hidden border border-white/10 flex-shrink-0"
          >
            <img
              src={shot}
              alt={`Portfolio shot ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const SeamlessSlider = () => {
  // Split shots into 3 columns for desktop
  const columns3 = splitIntoColumns(allShots, 3)
  const columns2 = splitIntoColumns(allShots, 2)

  return (
    <div className="w-full pb-16 bg-[#141414] overflow-hidden">
      <div className="relative z-[110] top-12 pointer-events-none px-4 md:px-8">
        <h3 className="text-white text-[80px] font-crimson h-[100px] italic tracking-tighter">Playground</h3>
        <p className="text-white/60 text-sm mt-2">A collection of my other design explorations and shots.</p>
      </div>

      <style>
        {`
          @keyframes scroll-up {
            from { transform: translateY(0); }
            to { transform: translateY(-50%); }
          }
          @keyframes scroll-down {
            from { transform: translateY(-50%); }
            to { transform: translateY(0); }
          }
        `}
      </style>

      <div className="max-w-[860px] px-0 md:px-8 mx-auto relative flex justify-center h-[420px]">
        {/* Mobile & Tablet: 2 columns */}
        <div className="flex md:hidden gap-2 w-fit mx-auto overflow-visible">
          <Column shots={columns2[0]} direction="up" duration={30} className="h-full w-[440px]" />
          <Column shots={columns2[1]} direction="down" duration={30} className="h-full w-[440px]" />
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:flex gap-2">
          <Column shots={columns3[0]} direction="up" duration={30} className="h-full" />
          <Column shots={columns3[1]} direction="down" duration={35} className="h-full" />
          <Column shots={columns3[2]} direction="up" duration={30} className="h-full" />
        </div>

        {/* Top Overlay Gradient */}
        <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-[#141414] via-[#141414]/40 to-transparent z-[100] pointer-events-none"></div>

        {/* Bottom Overlay Gradient & CTA Button */}
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent z-[100] flex items-end justify-center pb-10 pointer-events-none">
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

