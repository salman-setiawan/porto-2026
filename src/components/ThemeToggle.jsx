import { useState, useEffect, useRef } from 'react'
import { playCrispClick } from '../utils/sound'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'
    }
    return 'dark'
  })

  const transitionTimeoutRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light')
      document.body.classList.add('light-theme')
    } else {
      root.removeAttribute('data-theme')
      document.body.classList.remove('light-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    playCrispClick(0.35)

    // Aktifkan transisi global halus ke seluruh DOM
    const root = document.documentElement
    root.classList.add('theme-transitioning')

    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 450)
  }

  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-3 right-3 z-50 w-10 h-10 rounded-lg bg-app-surface border border-app-subtle text-app-primary hover:border-app-medium transition-all shadow-md cursor-pointer active:scale-95 flex items-center justify-center backdrop-blur-md group"
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (Dark Mode View) */}
        <svg
          className={`absolute inset-0 w-5 h-5 text-amber-400 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${isLight ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Moon Icon (Light Mode View) */}
        <svg
          className={`absolute inset-0 w-5 h-5 text-orange-600 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${isLight ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
            }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  )
}

export default ThemeToggle
