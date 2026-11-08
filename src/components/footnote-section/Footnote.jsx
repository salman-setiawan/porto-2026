import { useState, useEffect } from 'react'
import PixelFlare from '../../motion/PixelFlare'
import { playMechanicalSound, playCrispClick } from '../../utils/sound'
import { DataHome } from '../../data/dataHome'

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

  return (
    <footer
      className={`w-full relative overflow-hidden ${isLight ? 'text-app-primary' : 'text-white'
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
      <div className="relative z-10 max-w-[920px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col justify-between py-6">

        {/* ── Main Mid Section ── */}
        <div className="flex md:items-center">

          {/* Left: Headline & Subtext */}
          <div className="flex flex-col min-w-[300px] max-w-[580px]">
            <div className="text-[84px] md:text-[104px] font-crimson italic tracking-tighter text-app-primary select-none drop-shadow-sm -space-y-6 sm:-space-y-8 pl-2">
              <p className="leading-[1.1]">{headlineTop}</p>
              <p className="leading-[1.1]">
                {headlineBottom}
                <span className="inline-block text-app-accent ml-1 animate-pulse">.</span>
              </p>
            </div>
            <p className="mt-2 mb-5 text-[14px] text-app-secondary leading-relaxed max-w-[400px]">
              {subtext}
            </p>
          </div>
        </div>

        {/* ── Bottom Section: Direct Email & Socials ── */}
        <div className="pt-4 border-t border-app-subtle space-y-5">

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
