import { useState, useEffect } from 'react'

// Singleton MutationObserver agar hanya ada 1 observer DOM untuk seluruh aplikasi
let isLightGlobal = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
const listeners = new Set()

if (typeof document !== 'undefined') {
  const observer = new MutationObserver(() => {
    const next = document.documentElement.getAttribute('data-theme') === 'light'
    if (next !== isLightGlobal) {
      isLightGlobal = next
      listeners.forEach((fn) => fn(next))
    }
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
}

export const useAppTheme = () => {
  const [isLight, setIsLight] = useState(isLightGlobal)

  useEffect(() => {
    listeners.add(setIsLight)
    return () => listeners.delete(setIsLight)
  }, [])

  return isLight
}
