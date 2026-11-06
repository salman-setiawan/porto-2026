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

// Icon: Briefcase (experience)
const IconBriefcase = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

// Icon: Folder (projects)
const IconFolder = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" />
  </svg>
)

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
          icon={isProjects ? IconBriefcase : IconFolder}
          label={isProjects ? 'Show Experience' : 'Show Projects'}
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

