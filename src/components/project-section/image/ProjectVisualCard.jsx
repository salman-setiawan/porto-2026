import { HARMONIOUS_PALETTES } from './colorPalettes'

// Komponen Visual Mockup Gambar reusable untuk Mobile & Desktop
const ProjectVisualCard = ({
  cardRef,
  isHovered = false,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  colorTheme = HARMONIOUS_PALETTES[0],
  cursorPos = { x: 50, y: 50 },
  imageSrc,
  showGlow = false,
  className = '',
  project,
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

    {/* Cahaya glow kursor khusus Desktop */}
    {showGlow && (
      <div
        className="absolute top-0 left-0 pointer-events-none transition-opacity duration-300 ease-out z-0 will-change-transform"
        style={{
          transform: `translate3d(${cursorPos.x - 200}px, ${cursorPos.y - 200}px, 0)`,
          opacity: isHovered ? 1 : 0.25,
        }}
      >
        <div
          className="w-[400px] h-[400px] rounded-full"
          style={{
            background: colorTheme.conicLight,
            filter: 'blur(48px)',
          }}
        />
      </div>
    )}

    {project?.imageFit === 'contain' ? (
      <img
        className="top-40 left-18 relative w-[135%] max-w-none h-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-out z-10"
        src={imageSrc}
        alt={project?.title?.en || project?.title || 'Project screenshot'}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <img
        className="top-24 left-32 relative h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out z-10"
        src={imageSrc}
        alt={project?.title?.en || project?.title || 'Project screenshot'}
        loading="lazy"
        decoding="async"
      />
    )}
  </div>
)

export default ProjectVisualCard
