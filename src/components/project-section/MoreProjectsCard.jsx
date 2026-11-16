import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { playMechanicalSound, playCrispClick } from '../../utils/sound'

const MoreProjectsCard = ({ url = '/projects', className = '', scrollProgress = 0 }) => {
  const isExternal = url.startsWith('http') || url.startsWith('//')
  const imgWrapperRef = useRef(null)

  // Animasi sliding kartu 4 via DOM direct seperti FootnoteCards
  // Posisi akhir (progress = 1): translate3d(0, 0, 0) rotate(0deg) opacity(1),
  // tepat di posisi Tailwind yang sudah ditentukan oleh user (-top-20 -right-4 -rotate-42)
  useEffect(() => {
    const el = imgWrapperRef.current
    if (!el) return

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
    const progress = clamp(scrollProgress, 0, 1)

    // Easing kuadratik lembut
    const ease = Math.pow(progress, 1.1)

    // Jarak luncur dari arah kanan atas di luar kartu
    const distY = -420 // meluncur turun dari atas
    const distX = 240  // meluncur dari arah kanan
    const distRotate = 35 // rotasi tambahan saat meluncur

    const curY = distY * (1 - ease)
    const curX = distX * (1 - ease)
    const curRotate = distRotate * (1 - ease)
    const curOpacity = clamp(progress / 0.5, 0, 1) // awalnya tidak nampak, perlahan muncul lalu nampak penuh

    el.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${curRotate}deg)`
    el.style.opacity = curOpacity
  }, [scrollProgress])

  const handleClick = () => {
    playCrispClick()
  }

  const handleMouseEnter = () => {
    playMechanicalSound(4, 0.4)
  }

  const cardContent = (
    <div
      className={`relative py-4 px-3 border border-dashed border-app-subtle group-hover:border-app-accent group-hover:shadow-[inset_0_0_40px_rgba(249,115,22,0.18)] bg-app-surface/20 group-hover:bg-app-surface/50 group-hover:scale-[1.015] active:scale-[0.99] transition-all duration-300 ease-out flex items-end h-[609px] md:h-[480px] w-[320px] md:w-[420px] shrink-0 bg-app-primary overflow-hidden ${className}`}
    >
      {/* Inner ambient glow di dalam kartu saat hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-app-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Crosshairs Sudut Kotak */}
      <span className="absolute -top-[5px] -left-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
      <span className="absolute -top-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
      <span className="absolute -bottom-[5px] -left-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
      <span className="absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>

      {/* Dot pattern latar */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='12' cy='12' r='1.2' fill='white'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* === Kartu 4 — meluncur masuk dari luar kartu ke posisi aslinya === */}
      <div
        className="absolute -top-20 -right-4 z-30 -rotate-42 pointer-events-none will-change-transform"
        ref={imgWrapperRef}
        style={{
          opacity: 0,
          transform: 'translate3d(240px, -320px, 0) rotate(35deg)',
        }}
      >
        <img
          src="/4.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-24 md:w-52 h-auto select-none drop-shadow-2xl"
        />
      </div>

      {/* Bagian Bawah: Heading, Deskripsi & Indikator CTA */}
      <div className="space-y-4 pt-12 relative z-10">
        <div className="space-y-2">
          <h3 className="text-app-primary text-[36px] md:text-[42px] font-crimson italic tracking-tighter leading-tight group-hover:text-app-accent transition-colors">
            Show More Projects . .
          </h3>
          <p className="text-app-secondary text-[14px] leading-relaxed max-w-[320px]">
            Explore the complete collection of web apps, mobile UI, design systems, and client works.
          </p>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[14px] font-mono text-app-accent group-hover:translate-x-2 transition-transform duration-300">
          <span className="underline underline-offset-4 decoration-app-accent/40 group-hover:decoration-app-accent">Explore All Projects</span>
          <span className="text-base">→</span>
        </div>
      </div>
    </div>
  )

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className="relative block w-full h-full group cursor-pointer select-none"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link
      to={url}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className="relative block w-full h-full group cursor-pointer select-none"
    >
      {cardContent}
    </Link>
  )
}

export default MoreProjectsCard
