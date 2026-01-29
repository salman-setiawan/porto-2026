import React from 'react'

const Chip = ({ label, className = '', ...props }) => {
  return (
    <div className={`px-1.5 py-0.5 border-2 border-white/14 rounded-md text-[12px] text-blue-200 pointer-events-none bg-neutral-900 ${className}`} {...props}>
      {label}
    </div>
  )
}

export default Chip