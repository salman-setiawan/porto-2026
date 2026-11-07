import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { playMechanicalSound, playCrispClick } from '../utils/sound'

const TYPE_STYLES = {
  base: 'px-3 py-1.5 rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-orange-600 hover:bg-orange-700 text-white',
  nav: 'px-3 h-[31px] flex items-center rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white',
  social: 'px-3 py-1.5 flex items-center rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors',
}

const getHashOctave = (str) => {
  if (!str) return 3
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return (Math.abs(hash) % 6) + 1
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
  const assignedOctave = useMemo(() => {
    return octave ?? getHashOctave(label)
  }, [octave, label])

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

  const combinedClasses = `${typeStyle} ${stateStyle} ${width} ${className} flex items-center gap-2 select-none`.trim()

  const childrenContent = (
    <>
      {icon && <span className="flex items-center">{icon}</span>}
      <span className={icon ? 'mt-0.5' : ''}>{label}</span>
    </>
  )

  if (url) {
    const isExternal = url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('//')
    if (isExternal) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          className={combinedClasses}
          {...props}
        >
          {childrenContent}
        </a>
      )
    }

    return (
      <Link
        to={url}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={combinedClasses}
        {...props}
      >
        {childrenContent}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={combinedClasses}
      {...props}
    >
      {childrenContent}
    </button>
  )
}

export default memo(Button)
