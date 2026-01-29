import React from 'react'
import HeroDescription from '../components/hero-section/Description'
import ProjectCarousel from '../components/project-section/ProjectCarousel'
import SeamlessSlider from '../components/showcase-section/SeamlessSlider'

const Home = () => {
  return (
    <div className='flex flex-col w-full overflow-x-hidden'>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between mx-auto items-center w-full max-w-[360px] lg:max-w-[480px] py-16 relative">
        <HeroDescription />
      </div>

      {/* Projects Carousel */}
      <div className="w-full">
        <ProjectCarousel />
      </div>

      {/* Seamless Slider */}
      <SeamlessSlider />

      {/* Contacts */}
    </div>
  )
}

export default Home