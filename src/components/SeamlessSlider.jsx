import React from 'react'
import Button from './Button'

const shots = [
  '/shots/estore.webp',
  '/shots/halogbs.webp',
  '/shots/learnx.webp',
  '/shots/musplay.webp',
]

const SeamlessSlider = () => {
  return (
    <div className="w-full py-16 overflow-hidden bg-[#0c0c0c] relative">
      <div className="max-w-[1080px] mx-auto px-4 mb-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Other Exploration</h3>
        <p className="text-white/60 text-sm">A collection of my other design explorations and shots.</p>
      </div>

      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Container to mask overflow */}
      <div className="flex w-full overflow-hidden relative group h-[200px] md:h-[400px]">

        {/* Gradients for smooth edges - Sides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none"></div>

        {/* Sliding Track - Duplicate content for seamless loop */}
        <div
          className="flex w-max animate-[slide_8s_linear_infinite] lg:animate-[slide_30s_linear_infinite]"
        >
          {/* First Set (Doubled shots to ensure width > viewport) */}
          {[...shots, ...shots].map((shot, index) => (
            <div key={`original-${index}`} className="relative h-[200px] md:h-[400px] w-fit flex-shrink-0 mr-3 md:mr-6 rounded-xl overflow-hidden border border-white/10 transition-colors">
              <img
                src={shot}
                alt={`Design exploration ${index + 1}`}
                className="h-full w-auto"
              />
            </div>
          ))}

          {/* Duplicate Set (Doubled shots) */}
          {[...shots, ...shots].map((shot, index) => (
            <div key={`duplicate-${index}`} className="relative h-[200px] md:h-[400px] w-fit flex-shrink-0 mr-3 md:mr-6 rounded-xl overflow-hidden border border-white/10 transition-colors">
              <img
                src={shot}
                alt={`Design exploration ${index + 1}`}
                className="h-full w-auto"
              />
            </div>
          ))}
        </div>

        {/* Bottom Overlay Gradient & CTA Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[60%] via-[#0c0c0c]/60 to-transparent z-20 flex items-end justify-center">
          <Button
            label="See More"
            type="base"
            url="https://dribbble.com/eisenflux"
          />
        </div>
      </div>
    </div>
  )
}

export default SeamlessSlider
