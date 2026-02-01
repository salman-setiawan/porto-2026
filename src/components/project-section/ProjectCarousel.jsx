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

      {/* Navigation & Indicators */}
      <div className="flex items-center justify-between gap-4 px-4 xl:px-0 py-2 xl:py-4 max-w-[640px] mx-auto">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full border-2 border-white/10 hover:bg-white/10 transition-colors text-white cursor-pointer"
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
          className="p-2 rounded-full border-2 border-white/10 hover:bg-white/10 transition-colors text-white cursor-pointer"
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
