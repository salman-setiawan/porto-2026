import React from 'react'
import Button from '../Button'
import Chip from '../Chip'

const ProjectDescription = ({ project }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {project.tag.map((tag, index) => (
          <Chip key={index} label={tag.en} />
        ))}
      </div>
      <div className="space-y-2 pl-0.5">
        <h2 className='text-2xl font-bold'>{project.title.en}</h2>
        <p className='text-white/70'>{project.desc.en}</p>
      </div>
      <div className="flex gap-2.5 pt-4">
        {project.cta.map((cta, index) => (
          <Button
            key={index}
            width="w-fit"
            type='base'
            label={cta.en}
            link={cta.link}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectDescription
