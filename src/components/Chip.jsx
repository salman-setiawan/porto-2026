import { memo } from 'react'
import { getBrandIconPath } from '../utils/brandIcons'

const Chip = ({ label, icon, autoIcon = false, className = '', ...props }) => {
  const iconPath = autoIcon ? getBrandIconPath(label) : null

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 border border-white/15 rounded-sm text-[12px] text-white pointer-events-none bg-[#141414] ${className}`}
      {...props}
    >
      {icon ? (
        <span className="shrink-0 flex items-center">{icon}</span>
      ) : iconPath ? (
        <img src={iconPath} alt={label} className="w-3 h-3 shrink-0 object-contain brightness-0 invert" />
      ) : null}
      <span>{label}</span>
    </div>
  )
}

export default memo(Chip)
