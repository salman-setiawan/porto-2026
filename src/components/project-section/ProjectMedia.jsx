import React from 'react'
import HalftoneGlow from '../../motion/HalftoneGlow'
import Savings from '../ornaments/Savings'
import Budget from '../ornaments/Budget'
import Spending from '../ornaments/Spending'
import Transactions from '../ornaments/Transactions'

const ProjectMedia = ({ media }) => {
  return (
    <div className="relative w-full md:w-auto flex justify-center z-10 transition-all duration-500">
      <style>
        {`
          @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes float-medium { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(2deg); } }
          @keyframes pulse-radial { 0%, 100% { mask-size: 80%; -webkit-mask-size: 80%; opacity: 0.5; } 50% { mask-size: 110%; -webkit-mask-size: 110%; opacity: 0.7; } }
          
          @media (min-width: 1280px) {
            .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
            .animate-float-slow-delayed { animation: float-slow 8s ease-in-out infinite 2s; }
            .animate-float-medium { animation: float-medium 5s ease-in-out infinite 0.5s; }
            .animate-float-medium-delayed { animation: float-medium 5s ease-in-out infinite 1s; }
          }
        `}
      </style>

      {/* Main Image - z-10 */}
      <img src={media.mobile} alt="heroimg" className="w-[400px] relative z-10 mx-auto md:hidden" />
      <img src={media.desktop} alt="heroimg" className="h-[480px] relative z-10 hidden md:block" />

      <div className="absolute bottom-0 -left-32 -right-32 h-full bg-gradient-to-t from-[3%] from-[#0c0c0c] via-[#0c0c0c]/30 to-transparent z-15 pointer-events-none"></div>

      <HalftoneGlow color="rgba(168, 85, 247, 0.5)" className="-top-6 md:-top-12 -right-28 w-[440px] h-[360px]" animation="pulse-radial 4s infinite" />
      <HalftoneGlow color="rgba(59, 130, 246, 0.5)" className="top-16 md:top-24 -left-40 w-[440px] h-[360px]" animation="pulse-radial 4s infinite" />

      {/* Ornaments - Front (z-30) */}
      <div className="absolute top-12 left-4 z-30 animate-float-slow">
        <Savings />
      </div>
      <div className="absolute top-36 right-4 z-30 animate-float-medium-delayed">
        <Spending />
      </div>
      <div className="absolute bottom-16 left-10 md:bottom-40 z-30 animate-float-slow-delayed">
        <Transactions />
      </div>
    </div>
  )
}

export default ProjectMedia
