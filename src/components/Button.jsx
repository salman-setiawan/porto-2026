import { Link } from 'react-router-dom'

const Button = ({ label, width = '', type, active = false, onClick, url, icon, className = '', ...props }) => {

  const baseStyle = type === 'base'
    ? 'px-3 py-1.5 rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-blue-700 hover:bg-blue-800'
    : ''

  const navStyle = type === 'nav'
    ? 'px-3 h-[31px] flex items-center rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-blue-600 hover:bg-blue-800'
    : ''

  const socialStyle = type === 'social'
    ? 'px-3 py-1.5 flex items-center rounded-md text-[13px] font-medium shadow-lg shadow-black/10 cursor-pointer bg-[#292929] hover:bg-[#1d1d1d]'
    : ''

  const stateStyle = type === 'state'
    ? active ? 'bg-blue-600 hover:bg-blue-800 text-white' : 'bg-[#202020] hover:bg-[#141414] text-white/80'
    : ''

  const content = (
    <button
      onClick={onClick}
      className={`${baseStyle} ${navStyle} ${socialStyle} ${stateStyle} ${width} ${className} flex items-center gap-2`}
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

export default Button
