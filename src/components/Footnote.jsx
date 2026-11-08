import { useState, useEffect, useRef } from 'react'
import PixelFlare from '../motion/PixelFlare'
import { playMechanicalSound, playCrispClick, playWhoosh } from '../utils/sound'
import { DataHome } from '../data/dataHome'

/**
 * Footnote Component (Full Area / Edge-to-Edge)
 *
 * Kartu A & J tembus keluar (break out) melintasi garis batas atas section.
 */
const Footnote = ({
  className = "",
  lang = "en",
}) => {
  const footnoteData = DataHome?.footnote || {}
  const headlineTop = footnoteData.headline?.top || "Your"
  const headlineBottom = footnoteData.headline?.bottom || "Move"
  const email = footnoteData.email || "salmansetiawan88@gmail.com"
  const subtext = footnoteData.subtext?.[lang] || footnoteData.subtext?.en || "Got a project in mind, a role to fill, or just want to explore ideas together? The deck is shuffled and the move is yours."
  const copyrightText = footnoteData.copyright || "Salman Setiawan © 2026"
  const builtWithText = footnoteData.builtWith?.[lang] || footnoteData.builtWith?.en || "Built with React & Tailwind"
  const backToTopText = footnoteData.backToTop?.[lang] || footnoteData.backToTop?.en || "Back to top"

  const cardRef = useRef(null)
  const cardJWrapperRef = useRef(null)
  const cardJInnerRef = useRef(null)
  const [isLanded, setIsLanded] = useState(false)
  const isLandedRef = useRef(false)
  const hasPlayedLandSoundRef = useRef(false)
  const rafIdRef = useRef(null)

  // Track light/dark mode untuk adaptasi vignette & background
  const [isLight, setIsLight] = useState(
    () => typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  // Animasi Kartu J Jatuh selama scroll dari akhir ProjectsHorizontalScroll melintasi SeamlessSlider ke Footnote
  useEffect(() => {
    const updateCardFall = () => {
      const wrapper = cardJWrapperRef.current
      const inner = cardJInnerRef.current
      const card = cardRef.current
      if (!wrapper || !inner || !card) return

      const projectsContainer = document.getElementById('projects-scroll-container')
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      const windowHeight = window.innerHeight || 800
      const windowWidth = window.innerWidth || 1024

      // Jika container projects belum ada / gagal di-resolve, fallback kartu langsung mendarat
      if (!projectsContainer) {
        wrapper.style.visibility = 'visible'
        wrapper.style.opacity = '1'
        wrapper.style.transform = 'translate3d(0, 0, 0)'
        wrapper.style.pointerEvents = 'auto'
        inner.style.transform = ''
        inner.style.boxShadow = ''
        if (!isLandedRef.current) {
          isLandedRef.current = true
          setIsLanded(true)
        }
        return
      }

      // Koordinat piksel absolut akhir scroll horizontal di ProjectsHorizontalScroll
      const pRect = projectsContainer.getBoundingClientRect()
      const projectsStartScroll = pRect.top + currentScrollY
      const triggerEndScroll = projectsStartScroll + 1800 // Jarak SCROLL_DISTANCE_PX di ProjectsHorizontalScroll

      const cardRect = card.getBoundingClientRect()
      const cardDocY = cardRect.top + currentScrollY

      // Titik mendarat: saat kartu di Footnote sudah masuk sekitar 65% tinggi layar
      // Memastikan kartu sudah mendarat sempurna sebelum user fokus membaca Footnote
      const targetLandedScrollY = cardDocY - windowHeight * 0.65
      const endFallScrollY = Math.max(targetLandedScrollY, triggerEndScroll + 250)
      const fallDistance = endFallScrollY - triggerEndScroll

      let p = 0
      if (currentScrollY <= triggerEndScroll) {
        p = 0
      } else if (currentScrollY >= endFallScrollY) {
        p = 1
      } else {
        p = (currentScrollY - triggerEndScroll) / fallDistance
      }

      // ── Status 1: Belum mulai jatuh (User masih di Hero / scroll horizontal Projects) ──
      if (p <= 0) {
        wrapper.style.visibility = 'hidden'
        wrapper.style.opacity = '0'
        wrapper.style.pointerEvents = 'none'
        isLandedRef.current = false
        hasPlayedLandSoundRef.current = false
        setIsLanded(false)
        return
      }

      // ── Status 2: Sudah mendarat sempurna di atas kartu A (Footnote) ──
      if (p >= 1) {
        wrapper.style.visibility = 'visible'
        wrapper.style.opacity = '1'
        wrapper.style.transform = 'translate3d(0, 0, 0)'
        wrapper.style.pointerEvents = 'auto'
        inner.style.transform = ''
        inner.style.boxShadow = ''

        if (!isLandedRef.current) {
          isLandedRef.current = true
          setIsLanded(true)
          if (!hasPlayedLandSoundRef.current) {
            hasPlayedLandSoundRef.current = true
            playCrispClick(0.35)
          }
        }
        return
      }

      // ── Status 3: Sedang jatuh (Melayang turun melalui SeamlessSlider) ──
      if (isLandedRef.current) {
        isLandedRef.current = false
        hasPlayedLandSoundRef.current = false
        setIsLanded(false)
      }

      wrapper.style.visibility = 'visible'
      wrapper.style.pointerEvents = 'none'

      // Fade-in cepat di awal jatuh agar transisinya mulus
      const opacity = Math.min(1, p * 10)
      wrapper.style.opacity = String(opacity)

      const isDesktop = windowWidth >= 768

      // ── Kurva Lintasan Mengikuti Garis Kuning (Cubic Bézier Curve) ──
      // P0: Tepat di bawah "Explore All Projects ->" pada kartu Show More Projects
      const contentPadding = isDesktop ? 32 : 16
      const gridLeft = Math.max(contentPadding, (windowWidth - 920) / 2 + contentPadding)
      const gridRight = windowWidth - gridLeft
      const startX = isDesktop ? (gridRight - 250) : (windowWidth * 0.52)
      const startY = Math.max(windowHeight * 0.16, 130)

      // P3: Target Landing tepat di atas kartu A pada Footnote
      const targetX = cardRect.left
      const targetY = cardRect.top

      // P1: Mulai meluncur dari bawah kartu proyek, bergerak turun dan mulai mengarah ke kanan
      const p1X = startX + (isDesktop ? 75 : 30)
      const p1Y = startY + (targetY - startY) * 0.22

      // P2: Melengkung jauh ke kanan luar (melewati sisi kanan SeamlessSlider, mengitari tombol CTA di tengah)
      const p2X = isDesktop ? Math.max(gridRight + 65, targetX + 130) : (windowWidth * 0.84)
      const p2Y = startY + (targetY - startY) * 0.68

      // Formula Cubic Bézier B(t)
      const t = p
      const oneMinusT = 1 - t
      const c0 = oneMinusT * oneMinusT * oneMinusT
      const c1 = 3 * oneMinusT * oneMinusT * t
      const c2 = 3 * oneMinusT * t * t
      const c3 = t * t * t

      const desiredViewportX = c0 * startX + c1 * p1X + c2 * p2X + c3 * targetX
      const desiredViewportY = c0 * startY + c1 * p1Y + c2 * p2Y + c3 * targetY

      const translateX = desiredViewportX - targetX
      const translateY = desiredViewportY - targetY

      // Efek Rotasi 2D Halus mengikuti kurva (menukik miring saat melengkung ke kanan, lalu mendarat di +3deg):
      const pathBankAngle = Math.sin(t * Math.PI) * -16
      const landingAlignment = (1 - t) * -8
      const rotZ = 3 + landingAlignment + pathBankAngle

      // Sedikit membesar saat melayang di udara (mendekat ke kamera)
      const scale = 1 + (1 - p) * 0.05

      // Bayangan melayang lembut dan dalam
      const shadowAlpha = isLight ? 0.25 : 0.75
      const shadowSpread = Math.round(16 + (1 - p) * 20)
      const shadowBlur = Math.round(20 + (1 - p) * 30)

      wrapper.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0)`
      inner.style.transform = `rotate(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      inner.style.boxShadow = `0 ${shadowSpread}px ${shadowBlur}px -10px rgba(0, 0, 0, ${shadowAlpha})`
    }

    const onScroll = () => {
      if (rafIdRef.current) return
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        updateCardFall()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Inisialisasi awal
    updateCardFall()
    const timer = setTimeout(updateCardFall, 100)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearTimeout(timer)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [isLight])

  // Ambil link sosial dari dataHome jika ada, dengan fallback
  const ctaLinks = DataHome?.heroSection?.cta || [
    { label: 'GitHub', link: 'https://github.com/salman-setiawan' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/salman-setiawan' },
    { label: 'Instagram', link: 'https://instagram.com/eisenflux' },
  ]

  const handleBackToTop = () => {
    playCrispClick(0.5)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCardMouseEnter = () => {
    playWhoosh(0.18)
  }

  return (
    <footer
      className={`w-full relative overflow-visible ${isLight ? 'text-app-primary' : 'text-white'
        } ${className}`}
    >
      {/* ── Background Layer ── */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none z-0 border-t border-app-subtle transition-colors duration-300 ${isLight ? 'bg-app-primary' : 'bg-[#090302]'
          }`}
      >
        <PixelFlare speed={0.85} intensity={isLight ? 'subtle' : 'vibrant'} />

        {/* Theme-Aware Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: isLight
              ? 'radial-gradient(ellipse at 80% 25%, rgba(248, 249, 250, 0.15) 0%, rgba(248, 249, 250, 0.72) 60%, rgba(248, 249, 250, 0.98) 100%), linear-gradient(to top, rgba(248, 249, 250, 0.98) 0%, rgba(248, 249, 250, 0.35) 45%, rgba(248, 249, 250, 0.75) 100%)'
              : 'radial-gradient(ellipse at 80% 25%, rgba(9, 3, 2, 0.25) 0%, rgba(9, 3, 2, 0.72) 60%, rgba(9, 3, 2, 0.96) 100%), linear-gradient(to top, rgba(9, 3, 2, 0.98) 0%, rgba(9, 3, 2, 0.45) 45%, rgba(9, 3, 2, 0.75) 100%)',
          }}
        />

        {/* Dither pattern grid halus */}
        <div
          className={`absolute inset-0 pointer-events-none ${isLight ? 'opacity-[0.035] mix-blend-multiply' : 'opacity-[0.05] mix-blend-overlay'
            }`}
          style={{
            backgroundImage: `radial-gradient(circle, ${isLight ? '#000' : '#fff'} 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }}
        />
      </div>

      {/* ── Foreground Content Container (overflow-visible agar kartu tembus ke atas) ── */}
      <div className="relative z-10 max-w-[920px] mx-auto px-5 sm:px-8 md:px-12 py-8 flex flex-col justify-between">

        {/* ── Main Mid Section: Huge Typography & Interactive Playing Card ── */}
        <div className="flex md:items-center justify-between gap-8 md:gap-12">

          {/* Left: Headline & Subtext */}
          <div className="flex flex-col min-w-[300px] max-w-[580px]">
            <div className="text-[84px] md:text-[104px] font-crimson italic tracking-tighter text-app-primary select-none drop-shadow-sm -space-y-6 sm:-space-y-8 pl-2">
              <p className="leading-[1.1]">{headlineTop}</p>
              <p className="leading-[1.1]">
                {headlineBottom}
                <span className="inline-block text-app-accent ml-1 animate-pulse">.</span>
              </p>
            </div>
            <p className="mt-2 mb-8 text-[14px] text-app-secondary leading-relaxed max-w-[400px]">
              {subtext}
            </p>
          </div>

          {/* Right: Interactive 3D Stacked Playing Cards (A under J) - Tembus keluar ke atas */}
          <div className="flex items-center justify-start md:justify-end self-center md:self-auto w-full md:w-auto -mt-40 pt-0 pl-8 sm:pl-12 relative z-20">
            <a
              href={`mailto:${email}`}
              ref={cardRef}
              onMouseEnter={handleCardMouseEnter}
              onClick={() => playCrispClick(0.6)}
              className="group relative block w-[195px] sm:w-[225px] md:w-[250px] aspect-[1/1.42] cursor-pointer select-none"
            >
              {/* ── CARD A (Bawah / Belakang) ── */}
              <div
                className={`absolute inset-0 z-10 rounded-3xl overflow-hidden transition-all duration-500 ease-out transform -rotate-8 -translate-x-6 -translate-y-2 group-hover:-rotate-[20deg] group-hover:-translate-x-10 group-hover:-translate-y-4 pointer-events-none ${isLight
                  ? 'shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)]'
                  : 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.85)]'
                  }`}
              >
                <img
                  src="/A.png"
                  alt="Playing Card Ace"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* ── CARD J (Atas / Paling Depan - Kartu jatuh selama scroll) ── */}
              <div
                ref={cardJWrapperRef}
                className="absolute inset-0 z-20 will-change-transform"
              >
                <div
                  ref={cardJInnerRef}
                  className={`relative w-full h-full rounded-3xl overflow-hidden ${isLanded
                    ? `transition-all duration-500 ease-out transform rotate-3 group-hover:rotate-1 group-hover:scale-105 group-hover:rotate-[12deg] group-hover:-translate-y-2 ${isLight
                      ? 'shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)]'
                      : 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]'
                    }`
                    : 'will-change-transform'
                    }`}
                >
                  <img
                    src="/J.png"
                    alt="Playing Card Jack"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Subtle sheen highlight on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── Bottom Section: Direct Email & Socials ── */}
        <div className="pt-5 border-t border-app-subtle space-y-5">

          {/* Row: Email (Kiri) & CTA Socials (Kanan) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 group/email">
              <a
                href={`mailto:${email}`}
                onClick={() => playCrispClick(0.5)}
                className="text-app-primary hover:text-app-accent transition-colors flex items-center gap-1.5"
              >
                <span>{email}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block transition-transform duration-200 group-hover/email:translate-x-1 group-hover/email:-translate-y-1"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-start sm:self-auto">
              {ctaLinks.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playMechanicalSound((idx % 6) + 1, 0.15)}
                  className="text-sm font-medium text-app-secondary hover:text-app-accent transition-colors flex items-center gap-1 group/link"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Meta Bar: Copyright & Back to Top */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-app-subtle text-sm text-app-muted">

            {/* Center/Left Info */}
            <div className="flex items-center gap-2">
              <span>{copyrightText}</span>
              <span className='font-bold'>·</span>
              <span>{builtWithText}</span>
            </div>

            {/* Back to top */}
            <button
              type="button"
              onClick={handleBackToTop}
              onMouseEnter={() => playMechanicalSound(4, 0.2)}
              className="flex items-center gap-1.5 text-app-secondary hover:text-app-primary font-medium transition-colors cursor-pointer self-end sm:self-auto group/top"
            >
              <span>{backToTopText}</span>
              <span className="transition-transform duration-200 group-hover/top:-translate-y-1">↑</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footnote
