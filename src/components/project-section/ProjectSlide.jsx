import React from 'react'
import ProjectDescription from './ProjectDescription'
import ProjectMedia from './ProjectMedia'

const ProjectSlide = ({ project }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full pt-8 pb-2">
      <div className="w-full order-2 md:order-1 p-5 xl:p-0 relative bg-[#0c0c0c] md:bg-transparent z-20">
        <ProjectDescription project={project} />
      </div>
      <div className="w-full order-1 md:order-2">
        <ProjectMedia media={project.media} />
      </div>
    </div>
  )
}

export default ProjectSlide
