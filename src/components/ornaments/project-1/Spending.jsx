import React from 'react'

const Spending = () => {
  return (
    <div className="bg-neutral-900/40 backdrop-blur-sm border border-white/8 p-2.5 rounded-md shadow-xl shadow-black/30 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
        <span className="material-symbols-outlined text-red-400" style={{ fontSize: '20px' }}>payments</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Today Spending</span>
        <span className="text-[13px] font-bold text-red-300">-$450.00</span>
      </div>
    </div>
  )
}

export default Spending