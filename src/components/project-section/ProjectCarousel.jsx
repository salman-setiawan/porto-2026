import React, { useState, useEffect } from 'react'
import { DataHome } from '../../data/dataHome'
import ProjectSlide from './ProjectSlide'
import Button from '../Button'

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const projects = DataHome.projects

  const handleSlideChange = (newIndex) => {
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setIsVisible(true)
    }, 300) // Duration of fade out
  }

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % projects.length
    handleSlideChange(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length
    handleSlideChange(newIndex)
  }

  return (
    <div className="w-full relative lg:max-w-[1080px] mx-auto group py-8">
      <div className="flex flex-col items-center">
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/60 font-medium text-center">Project {currentIndex + 1}</p>
        </div>
        <div
          className={`w-full transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ProjectSlide project={projects[currentIndex]} />
        </div>
      </div>

      {/* Navigation Controls - Desktop Left/Right */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-10 z-30 hidden 2xl:block">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full border-2 border-white/10 hover:bg-white/10 transition-colors text-white -ml-16 2xl:-ml-24"
          aria-label="Previous Project"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-16 z-30 hidden 2xl:block">
        <button
          onClick={nextSlide}
          className="p-2 rounded-full border-2 border-white/10 hover:bg-white/10 transition-colors text-white -mr-16 2xl:-mr-24"
          aria-label="Next Project"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Navigation & Indicators - Mobile (Buttons at sides, indicators center) */}
      <div className="flex items-center justify-between 2xl:justify-center gap-4 p-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full border-2 border-white/10 hover:bg-white/10 transition-colors text-white 2xl:hidden"
          aria-label="Previous Project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-white w-6' : 'bg-white/30'
                }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full border-2 border-white/10 hover:bg-white/10 transition-colors text-white 2xl:hidden"
          aria-label="Next Project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProjectCarousel
