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
  const cardActionText = footnoteData.cardAction?.[lang] || footnoteData.cardAction?.en || "Say hello."
  const copyrightText = footnoteData.copyright || "Salman Setiawan © 2026"
  const builtWithText = footnoteData.builtWith?.[lang] || footnoteData.builtWith?.en || "Built with React & Tailwind"
  const backToTopText = footnoteData.backToTop?.[lang] || footnoteData.backToTop?.en || "Back to top"

  const cardRef = useRef(null)

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
      <div className="relative z-10 max-w-[920px] mx-auto px-5 sm:px-8 md:px-12 py-8 flex flex-col justify-between min-h-[480px]">

        {/* ── Main Mid Section: Huge Typography & Interactive Playing Card ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">

          {/* Left: Headline & Subtext */}
          <div className="flex flex-col max-w-[580px]">
            <div className="text-[64px] sm:text-[84px] md:text-[104px] font-crimson italic tracking-tighter text-app-primary select-none drop-shadow-sm -space-y-6 sm:-space-y-8 pl-2">
              <p className="leading-[1.1]">{headlineTop}</p>
              <p className="leading-[1.1]">
                {headlineBottom}
                <span className="inline-block text-app-accent ml-1 animate-pulse">.</span>
              </p>
            </div>
            <p className="mt-2 text-sm sm:text-base text-app-secondary leading-relaxed max-w-[400px]">
              {subtext}
            </p>
          </div>

          {/* Right: Interactive 3D Stacked Playing Cards (A under J) - Tembus keluar ke atas */}
          <div className="flex items-center justify-start md:justify-end self-center md:self-auto w-full md:w-auto -mt-16 sm:-mt-24 md:-mt-32 pt-0 pl-8 sm:pl-12 relative z-20">
            <a
              href={`mailto:${email}`}
              ref={cardRef}
              onMouseEnter={handleCardMouseEnter}
              onClick={() => playCrispClick(0.6)}
              className="group relative block w-[195px] sm:w-[225px] md:w-[250px] aspect-[1/1.42] cursor-pointer select-none"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* ── CARD A (Bawah / Belakang) ── */}
              <div
                className={`absolute inset-0 z-10 bg-[#f8f4ea] text-[#1c1917] rounded-2xl p-4 sm:p-5 border-2 transition-all duration-500 ease-out transform -rotate-8 -translate-x-6 -translate-y-2 group-hover:-rotate-[14deg] group-hover:-translate-x-10 group-hover:-translate-y-4 pointer-events-none ${isLight
                  ? 'shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)] border-[#e2d5bc]'
                  : 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.85)] border-[#e4d8bf]'
                  }`}
              >
                {/* Playing Card Inner Border */}
                <div className="absolute inset-2.5 rounded-xl border border-[#d6cbaf]/60 pointer-events-none" />

                {/* Top-Left Index: A */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col items-center leading-none text-[#1c1917]">
                  <span className="text-[17px] sm:text-[20px] font-bold font-serif">A</span>
                  <span className="text-[13px] sm:text-[15px] mt-0.5">♠</span>
                </div>

                {/* Center Ace Spade Motif */}
                <div className="w-full h-full flex flex-col items-center justify-center opacity-65">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" className="text-[#1c1917]/75">
                    <path d="M12 2C10.5 4.5 6 9.5 6 13c0 3 2.5 5 5 5 .5 0 1-.1 1-.1v2.1h-2v1h4v-1h-2v-2.1s.5.1 1 .1c2.5 0 5-2 5-5 0-3.5-4.5-8.5-6-11z" />
                  </svg>
                  <span className="font-serif text-[11px] tracking-widest text-[#1c1917]/50 mt-1 uppercase font-semibold">Ace</span>
                </div>

                {/* Bottom-Right Index (Inverted): A */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex flex-col items-center leading-none text-[#1c1917] rotate-180">
                  <span className="text-[17px] sm:text-[20px] font-bold font-serif">A</span>
                  <span className="text-[13px] sm:text-[15px] mt-0.5">♠</span>
                </div>
              </div>

              {/* ── CARD J (Atas / Paling Depan) ── */}
              <div
                className={`relative z-20 w-full h-full bg-[#fdfbf7] text-[#1c1917] rounded-2xl p-4 sm:p-5 border-2 transition-all duration-500 ease-out transform rotate-3 group-hover:rotate-1 group-hover:scale-105 group-hover:-translate-y-2 ${isLight
                  ? 'shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)] border-[#e2d5bc]'
                  : 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] border-[#eee6d3]'
                  }`}
              >
                {/* Playing Card Inner Border */}
                <div className="absolute inset-2.5 rounded-xl border border-[#d6cbaf]/60 pointer-events-none" />

                {/* Top-Left Index: J */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col items-center leading-none text-[#1c1917]">
                  <span className="text-[17px] sm:text-[20px] font-bold font-serif">J</span>
                  <span className="text-[13px] sm:text-[15px] mt-0.5">♠</span>
                </div>

                {/* Bottom-Right Index (Inverted): J */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex flex-col items-center leading-none text-[#1c1917] rotate-180">
                  <span className="text-[17px] sm:text-[20px] font-bold font-serif">J</span>
                  <span className="text-[13px] sm:text-[15px] mt-0.5">♠</span>
                </div>

                {/* Center Content: Circular Arrow & "Say hello." */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-4 relative z-10">
                  {/* Circle with Arrow */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#dbe8d8] flex items-center justify-center text-[#1c1917] shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#cde0c9]">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>

                  {/* Say hello text */}
                  <span className="font-crimson italic text-[20px] sm:text-[23px] text-[#1c1917] tracking-tight group-hover:text-app-accent transition-colors">
                    {cardActionText}
                  </span>
                </div>

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
