import { useState, useRef, useMemo } from 'react'
import { DataHome } from '../../data/dataHome'
import Chip from '../Chip'
import Button from '../Button'
import HalftoneGlow from '../../motion/HalftoneGlow'
import ProjectVisualCard from './image/ProjectVisualCard'
import { HARMONIOUS_PALETTES } from './image/colorPalettes'

const ProjectCard = ({ project = DataHome.projects[0] }) => {
  const desktopImageRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!desktopImageRef.current) return
    const rect = desktopImageRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const projectTitle = project?.title?.en || project?.title || ''
  const imageSrc =
    (typeof project?.media === 'string' && project?.media) ||
    project?.media?.desktop ||
    project?.media?.mobile ||
    '/project-1/heroimg_desktop.webp'

  // Generate tema warna latar & inner effect berdasarkan project
  const colorTheme = useMemo(() => {
    if (!project) return HARMONIOUS_PALETTES[0]
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
  }, [project, projectTitle, imageSrc])

  if (!project) return null

  return (
    <div className='relative w-full group'>
      {/* Grid 2 kolom tanpa gap, border dashed saling terhubung */}
      <div className='flex flex-col md:flex-row'>

        {/* Kolom 2: Visual / Mockup Gambar Mobile (Tanpa glow kursor & tanpa mouse listener) */}
        <ProjectVisualCard
          project={project}
          showGlow={false}
          colorTheme={colorTheme}
          imageSrc={imageSrc}
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

        {/* Kolom 2: Visual / Mockup Gambar Desktop dengan Hover Glow Teroptimasi */}
        <ProjectVisualCard
          project={project}
          cardRef={desktopImageRef}
          showGlow={true}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          colorTheme={colorTheme}
          cursorPos={cursorPos}
          imageSrc={imageSrc}
          className="hidden md:block h-[460px] md:h-[480px]"
        />

      </div>
    </div>
  )
}

export default ProjectCard
