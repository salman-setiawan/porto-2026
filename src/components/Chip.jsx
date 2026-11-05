import React from 'react'

const Chip = ({ label, className = '', ...props }) => {
  return (
    <div className={`px-1.5 py-0.5 border border-white/12 rounded-sm text-[12px] text-blue-200 pointer-events-none bg-white/4 ${className}`} {...props}>
      {label}
    </div>
  )
}

export default Chip