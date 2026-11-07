import { useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import { playMechanicalSound, playCrispClick } from '../utils/sound'

let globalButtonCounter = 0

const TYPE_STYLES = {
  base: 'px-3 py-1.5 rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-orange-600 hover:bg-orange-700 text-white',
  nav: 'px-3 h-[31px] flex items-center rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white',
  social: 'px-3 py-1.5 flex items-center rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors',
}

const Button = ({
  label,
  width = '',
  type,
  active = false,
  onClick,
  onMouseEnter,
  url,
  icon,
  className = '',
  octave,
  volume,
  sound = true,
  ...props
}) => {
  // Setiap tombol yang tidak di-assign oktaf manual akan mendapat oktaf siklik 1-6
  const defaultOctaveRef = useRef(null)
  if (defaultOctaveRef.current === null) {
    defaultOctaveRef.current = (globalButtonCounter % 6) + 1
    globalButtonCounter += 1
  }

  const assignedOctave = octave ?? defaultOctaveRef.current

  const handleMouseEnter = (e) => {
    if (sound) playMechanicalSound(assignedOctave, volume)
    if (onMouseEnter) onMouseEnter(e)
  }

  const handleClick = (e) => {
    if (sound) playCrispClick()
    if (onClick) onClick(e)
  }

  const typeStyle = TYPE_STYLES[type] || ''
  const stateStyle = type === 'state'
    ? (active ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]')
    : ''

  const content = (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${typeStyle} ${stateStyle} ${width} ${className} flex items-center gap-2`}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span className={icon ? 'mt-0.5' : ''}>{label}</span>
    </button>
  )

  if (url) {
    const isExternal = url.startsWith('http')
    return (
      <Link
        to={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return content
}

export default memo(Button)
