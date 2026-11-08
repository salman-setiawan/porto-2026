import { useRef } from 'react'
import { playCrispClick, playWhoosh } from '../../utils/sound'

const FootnoteCards = ({ email, isLight }) => {
  const cardRef = useRef(null)

  const handleCardMouseEnter = () => {
    playWhoosh(0.18)
  }

  return (
    <div className="flex items-center justify-start md:justify-end self-center md:self-auto w-full md:w-auto -mt-40 pt-0 pl-8 sm:pl-12 relative z-20">
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

        {/* ── CARD J (Atas / Paling Depan) ── */}
        <div
          className={`relative z-20 w-full h-full rounded-3xl overflow-hidden transition-all duration-500 ease-out transform rotate-3 group-hover:scale-105 group-hover:rotate-[12deg] group-hover:-translate-y-2 ${isLight
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
      </a>
    </div>
  )
}

export default FootnoteCards

