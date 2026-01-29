import React from 'react'
import HalftoneGlow from '../../motion/HalftoneGlow'
import Savings from '../ornaments/project-1/Savings'
import Spending from '../ornaments/project-1/Spending'
import Transactions from '../ornaments/project-1/Transactions'

// Mapping for project-1 ornaments
const OrnamentComponents = {
  savings: Savings,
  spending: Spending,
  transactions: Transactions
}

const ProjectMedia = ({ media }) => {
  return (
    <div className="relative w-full md:w-auto flex justify-center z-10 transition-all duration-500">
      <style>
        {`
          @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes pulse-radial { 0%, 100% { mask-size: 80%; -webkit-mask-size: 80%; opacity: 0.5; } 50% { mask-size: 110%; -webkit-mask-size: 110%; opacity: 0.7; } }
        `}
      </style>

      {/* Main Image - z-10 */}
      <img src={media.mobile} alt="heroimg" className="w-[400px] relative z-10 mx-auto md:hidden" />
      <img src={media.desktop} alt="heroimg" className="h-[480px] relative z-10 hidden md:block" />

      <div className="absolute bottom-0 -left-32 -right-32 h-full bg-gradient-to-t from-[3%] from-[#0c0c0c] via-[#0c0c0c]/30 to-transparent z-15 pointer-events-none"></div>

      <HalftoneGlow color="rgba(198, 76, 255, 1)" className="-top-6 md:-top-24 -right-12 sm:right-4 md:-right-12 xl:-right-6 w-[440px] h-[440px]" animation="pulse-radial 4s infinite" />
      <HalftoneGlow color="rgba(59, 173, 255, 1)" className="top-8 md:top-14 -left-12 sm:left-4 md:-left-18 lg:-left-14 xl:-left-12 w-[440px] h-[440px]" animation="pulse-radial 4s infinite" />

      {/* Dynamic Ornaments */}
      {media.ornaments && media.ornaments.map((ornament, index) => {
        const OrnamentComponent = OrnamentComponents[ornament.type]
        if (!OrnamentComponent) return null

        return (
          <div
            key={index}
            className={ornament.position}
            style={{ animation: ornament.animation }}
          >
            <OrnamentComponent />
          </div>
        )
      })}
    </div>
  )
}

export default ProjectMedia
