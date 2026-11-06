import React, { useState } from 'react'
import { DataHome } from '../data/dataHome'
import ExperienceContent from './experience-section/ExperienceContent'
import ProjectCard from './project-section/ProjectCard'
import Button from './Button'

const ProjectsContent = () => {
  const projects = DataHome.projects || []
  return (
    <div className="space-y-1">
      {projects.map((project, index) => (
        <ProjectCard key={project.id || index} project={project} />
      ))}
    </div>
  )
}

const TabSection = () => {
  // Projects shown first by default
  const [activeTab, setActiveTab] = useState('Projects')

  const isProjects = activeTab === 'Projects'

  return (
    <div className="space-y-3">
      {/* Header row: title left, CTA right */}
      <div className="flex items-center justify-between">
        {/* Title — same spec as "About me . ." */}
        <h3 className="text-white text-[40px] font-crimson italic tracking-tighter leading-none">
          {isProjects ? 'Projects . .' : 'Experience . .'}
        </h3>

        {/* CTA toggle button — social style */}
        <Button
          type="social"
          width="w-fit"
          label={isProjects ? 'Show Experience →' : 'Show Projects →'}
          onClick={() => setActiveTab(isProjects ? 'Experience' : 'Projects')}
          octave={3}
        />
      </div>

      {/* Tab Content Display */}
      <div className="relative">
        <div
          key={activeTab}
          style={{ animation: 'tabFadeIn 0.22s ease-out both' }}
        >
          {isProjects ? <ProjectsContent /> : <ExperienceContent />}
        </div>
      </div>

      <style>{`
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default TabSection

