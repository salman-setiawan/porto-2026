import { memo } from 'react'
import { getBrandIconPath } from '../utils/brandIcons'

const Chip = ({ label, icon, autoIcon = false, className = '', ...props }) => {
  const iconPath = autoIcon ? getBrandIconPath(label) : null

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 border border-app-subtle rounded-sm text-[12px] font-medium text-app-primary pointer-events-none bg-app-surface shadow-xs ${className}`}
      {...props}
    >
      {icon ? (
        <span className="shrink-0 flex items-center">{icon}</span>
      ) : iconPath ? (
        <img
          src={iconPath}
          alt={label}
          className="w-3 h-3 shrink-0 object-contain theme-icon-filter"
        />
      ) : null}
      <span>{label}</span>
    </div>
  )
}

export default memo(Chip)
