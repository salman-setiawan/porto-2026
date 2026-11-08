import { useRef, useEffect } from 'react'
import { playCrispClick, playWhoosh } from '../../utils/sound'

const FootnoteCards = ({ email, isLight }) => {
  const cardRef = useRef(null)
  const containerRef = useRef(null)
  const wrapperARef = useRef(null)
  const wrapperJRef = useRef(null)

  useEffect(() => {
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

    const updateCardPhysics = () => {
      const projectContainer = document.getElementById('projects-scroll-container')
      const footnoteEl = document.querySelector('footer')
      if (!projectContainer || !footnoteEl || !containerRef.current) return

      const scrollY = window.scrollY || window.pageYOffset || 0
      const windowHeight = window.innerHeight

      // 1. Titik Start: saat ProjectsHorizontalScroll selesai pin scroll (SCROLL_DISTANCE_PX = 1800)
      const projectRect = projectContainer.getBoundingClientRect()
      const projectDocTop = projectRect.top + scrollY
      const startScrollY = projectDocTop + 1800

      // 2. Titik Finish: saat tepi bawah footnote tepat menyentuh tepi bawah viewport (ujung bawah scroll)
      // Koordinat dokumen dasar footnote:
      const footnoteRect = footnoteEl.getBoundingClientRect()
      const footnoteDocBottom = footnoteRect.bottom + scrollY
      const finishScrollY = Math.max(
        footnoteDocBottom - windowHeight,
        startScrollY + 200
      )

      // Hitung progress linear [0 -> 1]
      let progress = 0
      if (scrollY <= startScrollY) {
        progress = 0
      } else if (scrollY >= finishScrollY) {
        progress = 1
      } else {
        progress = (scrollY - startScrollY) / (finishScrollY - startScrollY)
      }
      progress = clamp(progress, 0, 1)

      // Kurva linear ke kuadratik lembut agar kartu benar-benar terus bergerak sampai persis di finish
      // Menggunakan progress linear untuk posisi Y memastikan animasi tidak selesai prematur sebelum mentok
      const fallEaseA = Math.pow(progress, 1.1)
      const fallEaseJ = Math.pow(progress, 1.05)

      // Fall physics translation:
      // Tepat pada finishScrollY (ujung paling bawah footnote), fallEase = 1 dan sisa offset = 0
      const aY = -560 * (1 - fallEaseA)
      const aX = 90 * (1 - fallEaseA)
      const aRotate = 35 * (1 - fallEaseA)
      const aOpacity = clamp(progress / 0.2, 0, 1)

      const jY = -720 * (1 - fallEaseJ)
      const jX = -80 * (1 - fallEaseJ)
      const jRotate = -30 * (1 - fallEaseJ)
      const jOpacity = clamp(progress / 0.2, 0, 1)

      if (wrapperARef.current) {
        wrapperARef.current.style.transform = `translate3d(${aX}px, ${aY}px, 0) rotate(${aRotate}deg)`
        wrapperARef.current.style.opacity = aOpacity
      }

      if (wrapperJRef.current) {
        wrapperJRef.current.style.transform = `translate3d(${jX}px, ${jY}px, 0) rotate(${jRotate}deg)`
        wrapperJRef.current.style.opacity = jOpacity
      }
    }

    let rafId
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateCardPhysics)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateCardPhysics()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleCardMouseEnter = () => {
    playWhoosh(0.18)
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-start md:justify-end self-center md:self-auto w-full md:w-auto -mt-36 md:-mt-58 pt-0 sm:pl-12 relative z-20"
    >
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
        {/* ── CARD A WRAPPER (Scroll Falling Physics) ── */}
        <div
          ref={wrapperARef}
          className="absolute inset-0 pointer-events-none will-change-transform z-10"
        >
          {/* Card A Element (Base Stacking & Hover Interaction) */}
          <div
            className={`w-full h-full rounded-3xl overflow-hidden transition-all duration-500 ease-out transform -rotate-8 -translate-x-6 -translate-y-2 group-hover:-rotate-[20deg] group-hover:-translate-x-10 group-hover:-translate-y-4 ${isLight
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
        </div>

        {/* ── CARD J WRAPPER (Scroll Falling Physics) ── */}
        <div
          ref={wrapperJRef}
          className="relative w-full h-full pointer-events-none will-change-transform z-20"
        >
          {/* Card J Element (Base Stacking & Hover Interaction) */}
          <div
            className={`w-full h-full rounded-3xl overflow-hidden transition-all duration-500 ease-out transform rotate-3 group-hover:scale-105 group-hover:rotate-[12deg] group-hover:-translate-y-2 ${isLight
                ? 'shadow-[0_20px_45px_-10px_rgba(0,0,0,0.22)]'
                : 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]'
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
  )
}

export default FootnoteCards
