import React from 'react'
import HeroDescription from '../components/hero-section/Description'
import TabSection from '../components/TabSection'
import SeamlessSlider from '../components/showcase-section/SeamlessSlider'
import MusicPlayer from '../components/MusicPlayer'

const Home = () => {
  return (
    <div className='flex flex-col w-full overflow-x-hidden relative min-h-screen'>
      <div className="items-center mx-auto px-4 md:px-8 py-8 max-w-[860px] bg-[#141414] space-y-8">
        <HeroDescription />
        <TabSection />
      </div>
      <div className="md:mx-auto">
        <SeamlessSlider />
      </div>

      {/* Floating Background Music Player */}
      <MusicPlayer />
    </div>
  )
}

export default Home