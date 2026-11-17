import { useEffect, useRef, useState } from 'react'
import { useAppTheme } from '../utils/theme'

/**
 * useFlareScroll
 *
 * Custom hook yang menghitung opacity PixelFlare berdasarkan scroll position.
 * Flare terlihat penuh di puncak halaman dan memudar seiring scroll ke bawah.
 *
 * Identik dengan implementasi di Home.jsx:
 * - Hanya memperbarui state jika scroll masih dalam zona "hero" (0–450px)
 * - baseOpacity: 0.15 (dark mode) | 0.30 (light mode)
 * - fade selesai pada scrollY = 420px
 */
export function useFlareScroll(fadeEnd = 420) {
  const [scrollY, setScrollY] = useState(0)
  const lastScrollYRef = useRef(0)
  const isLight = useAppTheme()

  useEffect(() => {
    let rafId
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const sy = window.scrollY || window.pageYOffset || 0
        const prev = lastScrollYRef.current
        // Hanya update state saat di zona hero agar tidak memicu re-render tak berguna
        if (sy <= fadeEnd + 30 || prev <= fadeEnd + 30) {
          lastScrollYRef.current = sy
          setScrollY(sy)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fadeEnd])

  const baseOpacity = isLight ? 0.3 : 0.15
  const flareOpacity = Math.max(0, baseOpacity * (1 - scrollY / fadeEnd))
  const isFlareVisible = flareOpacity > 0

  return { flareOpacity, isFlareVisible }
}
