import { useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { playWhoosh } from '../utils/sound'
import { PageTransitionContext } from '../utils/pageTransition'
import MusicPlayer from './MusicPlayer'
import ThemeToggle from './ThemeToggle'

export default function PageTransitionLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  // Transition state: 'idle' | 'sweeping' | 'revealing'
  const [status, setStatus] = useState('idle')
  const [lineY, setLineY] = useState(-300)
  const [curtainHeight, setCurtainHeight] = useState(0)
  const [revealOpacity, setRevealOpacity] = useState(1)

  const animationFrameRef = useRef(null)
  const targetPathRef = useRef(null)
  const isNavigatingRef = useRef(false)

  const startTransition = useCallback(
    (to) => {
      // Prevent multiple concurrent transitions
      if (isNavigatingRef.current) return
      if (to === location.pathname) return

      isNavigatingRef.current = true
      targetPathRef.current = to

      // Audio feedback (whoosh saat kartu mulai meluncur)
      playWhoosh(0.2)

      const viewportH = window.innerHeight || 800
      const cardOffset = 240
      const startY = -cardOffset
      const endY = viewportH + cardOffset
      const duration = 1250 // ms (1.25s)

      // Tetapkan koordinat awal SEKETIKA di state (mencegah frame kedip)
      setLineY(startY)
      setCurtainHeight(0)
      setRevealOpacity(1)
      setStatus('sweeping')

      // Cegah scrolling selama transisi tanpa menghapus scrollbar body (mencegah layout shift 17px)
      const preventScroll = (e) => {
        e.preventDefault()
      }
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: false })

      const startTime = performance.now()

      const animate = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Smooth easeInOutCubic curve
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

        const currentY = startY + ease * (endY - startY)
        setLineY(currentY)
        setCurtainHeight(Math.max(0, Math.min(viewportH, currentY)))

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          // ── PHASE 1 COMPLETE ──
          // Lepas scroll lock event listener
          window.removeEventListener('wheel', preventScroll)
          window.removeEventListener('touchmove', preventScroll)

          // Pindah rute di bawah tirai solid bg-app-primary
          navigate(targetPathRef.current)
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

          // ── PHASE 2: REVEAL WITH FADE IN ──
          setStatus('revealing')

          requestAnimationFrame(() => {
            setRevealOpacity(0)
          })

          setTimeout(() => {
            setStatus('idle')
            isNavigatingRef.current = false
          }, 480)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    },
    [location.pathname, navigate]
  )

  // Global click interceptor for internal links
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      const target = anchor.getAttribute('target')

      // Only intercept internal application routes
      if (
        !href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('#') ||
        target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return
      }

      // Ignore modifier key clicks (open in new tab/window)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }

      // Ignore click on current route
      if (href === window.location.pathname) {
        e.preventDefault()
        return
      }

      // Intercept navigation & launch card transition
      e.preventDefault()
      startTransition(href)
    }

    document.addEventListener('click', handleLinkClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleLinkClick, { capture: true })
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      document.body.style.overflow = ''
    }
  }, [startTransition])

  return (
    <PageTransitionContext.Provider
      value={{
        navigateWithTransition: startTransition,
        isTransitioning: status !== 'idle',
      }}
    >
      <Outlet />

      {/* Persistent global audio player & theme toggle: tetap aktif & berputar meski ganti halaman */}
      <MusicPlayer />
      <ThemeToggle />

      {/* ── CARD TRANSITION OVERLAY (Tetap mounted agar texture GPU & image siap seketika tanpa jeda decode) ── */}
      <div
        className={`fixed inset-0 z-[9999] overflow-hidden select-none transition-none ${
          status === 'idle'
            ? 'pointer-events-none invisible opacity-0'
            : 'pointer-events-auto visible opacity-100'
        }`}
      >
        {/* 1. Latar Curtain: Sisi atas tertutup bg-app-primary */}
        <div
          className={`fixed top-0 left-0 right-0 bg-app-primary ${
            status === 'revealing' ? 'transition-opacity duration-450 ease-out' : ''
          }`}
          style={{
            height: status === 'revealing' ? '100vh' : `${curtainHeight}px`,
            opacity: status === 'revealing' ? revealOpacity : 1,
            willChange: status === 'sweeping' ? 'height' : 'auto',
          }}
        />

        {/* 2. Garis Horizontal: Persis di tengah kartu width full */}
        <div
          className={`fixed left-0 right-0 pointer-events-none z-10 ${
            status === 'sweeping' ? 'block' : 'hidden'
          }`}
          style={{
            top: `${lineY}px`,
            transform: 'translateY(-50%)',
            willChange: 'top',
          }}
        >
          <div className="w-full h-[1.5px] bg-white/40 dark:bg-white/25 shadow-[0_0_12px_var(--accent-glow)] border-b border-app-medium" />
        </div>

        {/* 3. Kartu J.png: Bergerak dari atas ke bawah, tengah kartu tepat di garis */}
        <div
          className={`fixed left-1/2 pointer-events-none z-20 ${
            status === 'sweeping' ? 'block' : 'hidden'
          }`}
          style={{
            top: `${lineY}px`,
            transform: 'translate(-50%, -50%)',
            willChange: 'top',
          }}
        >
          <div className="w-[185px] sm:w-[215px] md:w-[240px] aspect-[1/1.42] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] border border-app-subtle bg-app-surface flex items-center justify-center">
            <img
              src="/J.png"
              alt="Transition Card Jack"
              className="w-full h-full object-contain pointer-events-none"
              decoding="sync"
            />
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}
