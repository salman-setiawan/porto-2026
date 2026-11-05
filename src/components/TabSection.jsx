import React, { useState } from 'react'
import { DataHome } from '../data/dataHome'
import ExperienceContent from './experience-section/ExperienceContent'
import ProjectCard from './project-section/ProjectCard'
import { playMechanicalSound, playCrispClick } from '../utils/sound'

const TABS = ['Experience', 'Projects']

const ProjectsContent = () => {
  const projects = DataHome.projects || []
  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.id || index} project={project} />
      ))}
    </div>
  )
}

const TabSection = () => {
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <div className="space-y-3">
      {/* Tab Switch Buttons */}
      <div className="flex gap-1 p-1 bg-white/[0.04] border border-white/[0.07] rounded-lg w-fit">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => {
                playCrispClick()
                setActiveTab(tab)
              }}
              onMouseEnter={() => playMechanicalSound(index === 0 ? 2 : 4)}
              className={`
                relative px-2.5 py-1 rounded text-[13px] font-medium
                transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'text-white bg-white/10 shadow-sm'
                  : 'text-white/40 hover:text-white/70'
                }
              `}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Tab Content Display */}
      <div className="relative">
        <div
          key={activeTab}
          style={{
            animation: 'tabFadeIn 0.22s ease-out both',
          }}
        >
          {activeTab === 'Experience' && <ExperienceContent />}
          {activeTab === 'Projects' && <ProjectsContent />}
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

