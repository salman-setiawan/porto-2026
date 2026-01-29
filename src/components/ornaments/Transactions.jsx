import React from 'react'

const Transactions = () => {
  return (
    <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/8 p-2.5 rounded-md shadow-xl shadow-black/30 flex items-center gap-3">
      <div className="flex flex-col">
        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Recent Transactions</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-[13px] font-bold text-white">Success</span>
        </div>
      </div>
    </div>
  )
}

export default Transactions