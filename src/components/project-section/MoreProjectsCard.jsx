import { Link } from 'react-router-dom'
import { playMechanicalSound, playCrispClick } from '../../utils/sound'

const MoreProjectsCard = ({ url = '/projects' }) => {
  const isExternal = url.startsWith('http')

  const handleClick = () => {
    playCrispClick()
  }

  const handleMouseEnter = () => {
    playMechanicalSound(4, 0.4)
  }

  return (
    <Link
      to={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className="relative block w-full h-full group cursor-pointer select-none"
    >
      <div className="relative py-4 px-3 border border-dashed border-app-subtle group-hover:border-app-accent/50 bg-app-surface/20 group-hover:bg-app-surface/40 transition-all duration-300 flex items-end h-[609px] md:h-[480px] w-[320px] md:w-[420px] shrink-0">
        {/* Crosshairs Sudut Kotak */}
        <span className="absolute -top-[5px] -left-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
        <span className="absolute -top-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
        <span className="absolute -bottom-[5px] -left-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
        <span className="absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>

        {/* Dot pattern latar */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='12' cy='12' r='1.2' fill='white'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

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

          <div className="pt-2 flex items-center gap-2 text-[14px] font-mono text-app-accent group-hover:translate-x-1 transition-transform">
            <span>Explore All Projects</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MoreProjectsCard

