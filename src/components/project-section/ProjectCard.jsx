import { useState, useRef, useMemo } from 'react'
import { DataHome } from '../../data/dataHome'
import Chip from '../Chip'
import Button from '../Button'
import HalftoneGlow from '../../motion/HalftoneGlow'

// Palet warna terkurasi berdasarkan teori harmoni warna (Analogous & Tonal Harmony)
// Didefinisikan di luar komponen agar tidak di-recreate setiap render
const HARMONIOUS_PALETTES = [
  {
    // 1. Deep Cyber Sapphire (Blue -> Cyan glow)
    baseHue: 228,
    bg: '#0a0f1d',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.45) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(14, 116, 144, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.4) 90deg, rgba(59, 130, 246, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 2. Deep Aurora Emerald (Green -> Mint/Teal glow)
    baseHue: 158,
    bg: '#081712',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(13, 148, 136, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(20, 184, 166, 0.4) 90deg, rgba(52, 211, 153, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 3. Royal Velvet Amethyst (Violet -> Fuchsia glow)
    baseHue: 276,
    bg: '#140b1d',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(192, 38, 211, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(217, 70, 239, 0.4) 90deg, rgba(168, 85, 247, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 4. Sunset Bronze & Amber (Warm Amber -> Gold glow)
    baseHue: 32,
    bg: '#1b1207',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(234, 88, 12, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(245, 158, 11, 0.4) 90deg, rgba(251, 191, 36, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 5. Deep Ruby Crimson (Crimson -> Rose Coral glow)
    baseHue: 345,
    bg: '#1a0910',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(225, 29, 72, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(251, 113, 133, 0.4) 90deg, rgba(244, 63, 94, 0.65) 180deg, transparent 270deg)',
  },
]

// Komponen Visual Mockup Gambar reusable untuk Mobile & Desktop
const ProjectVisualCard = ({
  cardRef,
  isHovered,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  colorTheme,
  cursorPos,
  imageSrc,
  title,
  className = '',
}) => (
  <div
    ref={cardRef}
    onMouseMove={onMouseMove}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`relative w-full border border-dashed border-white/15 transition-colors duration-300 overflow-hidden ${className}`}
    style={{
      backgroundColor: colorTheme.bg,
      backgroundImage: colorTheme.ambientGlow,
    }}
  >
    {/* Crosshairs Sudut Kolom Gambar */}
    <span className="absolute -top-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
    <span className="absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>

    {/* Dot grid pattern latar */}
    <div
      className="absolute inset-0 z-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='12' cy='12' r='1.2' fill='white'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />

    {/* Cahaya putar yang bergerak mengikuti kursor */}
    <div
      className="absolute pointer-events-none transition-opacity duration-500 ease-out z-0"
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isHovered ? 1 : 0.25,
      }}
    >
      <div
        className="w-72 h-72 rounded-full"
        style={{
          animation: 'spin-slow 6s linear infinite',
          animationPlayState: isHovered ? 'running' : 'paused',
          background: colorTheme.conicLight,
          filter: 'blur(128px)',
        }}
      />
    </div>

    <img
      className="top-24 left-32 relative h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-10"
      src={imageSrc}
    />
  </div>
)

const ProjectCard = ({ project = DataHome.projects[0] }) => {
  if (!project) return null

  const mobileImageRef = useRef(null)
  const desktopImageRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const imageSrc =
    (typeof project.media === 'string' && project.media) ||
    project.media?.desktop ||
    project.media?.mobile ||
    '/project-1/heroimg_desktop.webp'

  const projectTitle = project.title?.en || project.title

  // Generate tema warna latar & inner effect berdasarkan project
  const colorTheme = useMemo(() => {
    const numId = typeof project.id === 'number' ? project.id : null
    if (numId !== null && numId > 0) {
      return HARMONIOUS_PALETTES[(numId - 1) % HARMONIOUS_PALETTES.length]
    }

    const key = String(project.id || projectTitle || imageSrc)
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash)
    }
    return HARMONIOUS_PALETTES[Math.abs(hash) % HARMONIOUS_PALETTES.length]
  }, [project.id, projectTitle, imageSrc])

  const visualProps = {
    isHovered,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    colorTheme,
    cursorPos,
    imageSrc,
    title: projectTitle,
  }

  return (
    <div className='relative w-full group'>
      {/* Grid 2 kolom tanpa gap, border dashed saling terhubung */}
      <div className='flex flex-col md:flex-row'>

        {/* Kolom 2: Visual / Mockup Gambar Mobile */}
        <ProjectVisualCard
          {...visualProps}
          cardRef={mobileImageRef}
          onMouseMove={(e) => handleMouseMove(e, mobileImageRef)}
          className="md:hidden aspect-[4/3]"
        />

        {/* Kolom 1: Informasi Project */}
        <div className='relative py-4 px-3 border border-dashed border-app-subtle md:border-r-0 bg-app-surface/20 hover:bg-app-surface/40 transition-colors duration-300 flex flex-col justify-between overflow-hidden'>
          {/* Crosshairs Sudut Kolom Informasi */}
          <span className="absolute -top-[5px] -left-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
          <span className="absolute -top-[5px] -right-[5px] md:hidden text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -left-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] md:hidden text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>

          {/* Crosshair Persimpangan Atas & Bawah Tengah (MD screen) */}
          <span className="hidden md:block absolute -top-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>
          <span className="hidden md:block absolute -bottom-[5px] -right-[5px] text-[10px] leading-none text-app-muted font-mono select-none group-hover:text-app-accent transition-colors z-20">+</span>

          <div className="space-y-2 relative z-10">
            <div className="flex flex-wrap gap-2">
              {project.tag?.map((tag, index) => (
                <Chip key={index} label={tag.en || tag} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((stack, index) => (
                <Chip key={index} label={stack.en || stack} autoIcon={true} />
              ))}
            </div>
          </div>

          <HalftoneGlow color="rgba(249, 115, 22, 0.85)" className="-top-48 left-16 w-[420px] h-[420px]" animation="pulse-radial 4s infinite" />

          <div className="space-y-5 pt-8 z-10">
            <div className='space-y-3'>
              <h3 className='text-app-primary text-[38px] md:text-[40px] font-crimson h-[48px] italic tracking-tighter'>
                {projectTitle}
              </h3>
              {project.desc && (
                <p className="text-app-secondary text-[14px] leading-relaxed">
                  {project.desc?.en || project.desc}
                </p>
              )}
            </div>

            {project.cta && project.cta.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {project.cta.map((cta, index) => (
                  <Button
                    key={index}
                    width="w-fit"
                    type='base'
                    label={cta.en || cta.label}
                    url={cta.link}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Kolom 2: Visual / Mockup Gambar Desktop*/}
        <ProjectVisualCard
          {...visualProps}
          cardRef={desktopImageRef}
          onMouseMove={(e) => handleMouseMove(e, desktopImageRef)}
          className="hidden md:block h-[460px] md:h-[480px]"
        />

      </div>
    </div>
  )
}

export default ProjectCard
