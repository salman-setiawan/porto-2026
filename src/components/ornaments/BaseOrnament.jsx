import React from 'react'

const BaseOrnament = ({ icon, label, value, type = 'default' }) => {
  // Define color schemes based on type
  const schemes = {
    savings: {
      bg: 'bg-green-500/20',
      iconColor: 'text-green-400',
      textColor: 'text-green-300'
    },
    spending: {
      bg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      textColor: 'text-red-300'
    },
    budget: {
      bg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      textColor: 'text-blue-300'
    },
    default: {
      bg: 'bg-neutral-500/20',
      iconColor: 'text-neutral-400',
      textColor: 'text-neutral-300'
    }
  }

  const scheme = schemes[type] || schemes.default

  return (
    <div className="bg-neutral-900/40 backdrop-blur-sm border border-white/8 p-2.5 rounded-md shadow-xl shadow-black/30 flex items-center gap-3 whitespace-nowrap">
      {icon && (
        <div className={`w-8 h-8 rounded-full ${scheme.bg} flex items-center justify-center flex-shrink-0`}>
          <span className={`material-symbols-outlined ${scheme.iconColor}`} style={{ fontSize: '20px' }}>
            {icon}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-[9px] text-neutral-400 uppercase tracking-wider">{label}</span>
        <span className={`text-[13px] font-bold ${scheme.textColor}`}>{value}</span>
      </div>
    </div>
  )
}

export default BaseOrnament
