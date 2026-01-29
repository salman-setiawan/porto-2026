import React from 'react'
import { DataHome } from '../../data/dataHome'
import Button from '../Button'

const HeroDescription = () => {
  return (
    <div className="flex flex-col gap-4 text-center items-center">
      <div className="space-y-2">
        <h2 className='text-xl font-bold'>{DataHome.heroSection.title}</h2>
        <p className='text-white/70'>{DataHome.heroSection.desc.en}</p>
      </div>
      <div className="flex gap-2.5">
        <Button
          width="w-fit"
          type='social'
          label={DataHome.heroSection.cta[0].label}
          link={DataHome.heroSection.cta[0].link}
        />
        <Button
          width="w-fit"
          type='social'
          label={DataHome.heroSection.cta[1].label}
          link={DataHome.heroSection.cta[1].link}
        />
        <Button
          width="w-fit"
          type='social'
          label={DataHome.heroSection.cta[2].label}
          link={DataHome.heroSection.cta[2].link}
        />
      </div>
    </div>
  )
}

export default HeroDescription