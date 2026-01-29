import React from 'react'

const Budget = () => {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/8 px-2 py-1.5 rounded-md shadow-xl shadow-black/30 flex items-center gap-2">
      <span className="text-sm text-white font-medium">Monthly Budget:</span>
      <span className="text-sm text-green-400 font-semibold">Safe</span>
    </div>
  )
}

export default Budget