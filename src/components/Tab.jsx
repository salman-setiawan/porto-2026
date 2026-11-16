import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { playMechanicalSound, playCrispClick } from '../utils/sound'

/**
 * Tab - Vertical Interactive Project Timeline / Milestone Navigation
 *
 * Mengadopsi konsep dan fisika dari TimelineSlider.jsx dalam orientasi vertikal:
 * - Ruler track vertikal dengan tick presisi (major & minor ticks) sejajar persis dengan item teks
 * - Proximity zoom animation: tick di sekitar indikator memanjang dan bertambah terang
 * - Jarum vertikal oranye (accent indicator) dengan glow khas tema sejajar presisi dengan tick putih
 * - Responsif terhadap filter: tidak ada tick berceceran atau melorot saat jumlah project berubah
 * - Scroll-spy otomatis mendeteksi card proyek yang sedang aktif di viewport
 * - Klik otomatis scroll ke ProjectCard yang bersangkutan
 */
export default function Tab({
  projects = [],
  onProjectChange,
  ticksPerInterval = 8,
  className = '',
}) {
  const rulerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [prevProjects, setPrevProjects] = useState(projects)
  const activeIndexRef = useRef(0)

  // Array ref untuk mengukur posisi tengah (Y) dari setiap tombol teks project
  const itemRefs = useRef([])
  const [itemCenterPositions, setItemCenterPositions] = useState([])

  const totalCount = projects.length

  // Pola resmi React: Sesuaikan state saat prop berubah saat render
  if (projects !== prevProjects) {
    setPrevProjects(projects)
    setSliderPosition(0)
  }

  // Ukur posisi tengah Y dari tiap tombol project relatif terhadap kontainer ruler
  const measurePositions = useCallback(() => {
    if (!rulerRef.current || totalCount === 0) return
    const rulerRect = rulerRef.current.getBoundingClientRect()

    const centers = []
    for (let i = 0; i < totalCount; i++) {
      const el = itemRefs.current[i]
      if (el) {
        const rect = el.getBoundingClientRect()
        centers.push(rect.top + rect.height / 2 - rulerRect.top)
      } else {
        // Estimasi pixel fallback (padding top ~4px, height ~32px, gap ~8px)
        centers.push(4 + i * 40 + 16)
      }
    }

    setItemCenterPositions(centers)
  }, [totalCount])

  useEffect(() => {
    let rafId
    const update = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(measurePositions)
    }

    const resizeObserver = new ResizeObserver(update)
    if (rulerRef.current) {
      resizeObserver.observe(rulerRef.current)
    }

    // Measure pertama setelah repaint
    const timer = setTimeout(update, 50)
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
      clearTimeout(timer)
    }
  }, [measurePositions, projects])

  // Hitung fallback center positions agar selalu siap bahkan sebelum pengukuran pertama
  const resolvedCenters = useMemo(() => {
    if (itemCenterPositions.length === totalCount && totalCount > 0) {
      return itemCenterPositions
    }
    return Array.from({ length: totalCount }, (_, i) => 4 + i * 40 + 16)
  }, [itemCenterPositions, totalCount])

  // Hitung total ticks dan posisi major ticks untuk setiap project
  const calculatedTotalTicks = useMemo(() => {
    if (totalCount <= 1) return 1
    return (totalCount - 1) * ticksPerInterval + 1
  }, [totalCount, ticksPerInterval])

  const calculatedMajorIndices = useMemo(() => {
    return Array.from({ length: totalCount }, (_, i) => i * ticksPerInterval)
  }, [totalCount, ticksPerInterval])

  // Hitung koordinat Y (selalu dalam pixel) untuk setiap tick
  const tickYPositions = useMemo(() => {
    if (totalCount === 0) return []
    if (totalCount === 1) {
      return [resolvedCenters[0] ?? 20]
    }

    const positions = []
    for (let i = 0; i < calculatedTotalTicks; i++) {
      const intervalIndex = Math.min(
        Math.floor(i / ticksPerInterval),
        totalCount - 2
      )
      const remainder = i - intervalIndex * ticksPerInterval
      const fraction = remainder / ticksPerInterval
      const yStart = resolvedCenters[intervalIndex] ?? 0
      const yEnd = resolvedCenters[intervalIndex + 1] ?? yStart + 40
      positions.push(yStart + fraction * (yEnd - yStart))
    }
    return positions
  }, [calculatedTotalTicks, resolvedCenters, ticksPerInterval, totalCount])

  // Posisi Y jarum oranye: interpolasi continuous dari sliderPosition dalam pixel
  const needleTopPx = useMemo(() => {
    if (totalCount === 0) return 0
    if (totalCount === 1) {
      return resolvedCenters[0] ?? 20
    }

    const safeSlider = Math.min(Math.max(sliderPosition, 0), totalCount - 1)
    const baseIndex = Math.min(Math.floor(safeSlider), totalCount - 2)
    const fraction = safeSlider - baseIndex
    const yStart = resolvedCenters[baseIndex] ?? 0
    const yEnd = resolvedCenters[baseIndex + 1] ?? yStart + 40
    return yStart + fraction * (yEnd - yStart)
  }, [resolvedCenters, sliderPosition, totalCount])

  // Posisi tick aktif untuk proximity zoom effect
  const tickPosition = useMemo(() => {
    if (totalCount <= 1) return 0
    const safeSlider = Math.min(Math.max(sliderPosition, 0), totalCount - 1)
    return (safeSlider / (totalCount - 1)) * (calculatedTotalTicks - 1)
  }, [totalCount, sliderPosition, calculatedTotalTicks])

  const currentIndex = Math.min(
    Math.max(Math.round(sliderPosition), 0),
    Math.max(0, totalCount - 1)
  )

  // Fungsi scroll halaman ke card proyek terkait
  const scrollToCard = useCallback((project, idx) => {
    const cardId = `project-card-${project?.id ?? idx}`
    const targetElement = document.getElementById(cardId)
    if (targetElement) {
      const navOffset = 90 // Offset atas agar pas di bawah navigation
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, [])

  // Update slider position berdasarkan koordinat pointer Y
  const updateSlideFromClientY = useCallback(
    (clientY) => {
      const el = rulerRef.current
      if (!el || totalCount <= 1) return

      const rect = el.getBoundingClientRect()
      const relativeY = clientY - rect.top

      const firstY = resolvedCenters[0] ?? 0
      const lastY = resolvedCenters[totalCount - 1] ?? firstY + (totalCount - 1) * 40
      const clampedY = Math.min(Math.max(relativeY, firstY), lastY)

      // Cari segmen
      let segment = 0
      for (let i = 0; i < totalCount - 1; i++) {
        const nextY = resolvedCenters[i + 1] ?? lastY
        if (clampedY <= nextY) {
          segment = i
          break
        }
      }
      const yStart = resolvedCenters[segment] ?? firstY
      const yEnd = resolvedCenters[segment + 1] ?? lastY
      const fraction = yEnd > yStart ? (clampedY - yStart) / (yEnd - yStart) : 0
      const continuousVal = segment + fraction

      setSliderPosition(continuousVal)

      const roundedIndex = Math.round(continuousVal)
      if (roundedIndex !== activeIndexRef.current) {
        activeIndexRef.current = roundedIndex
        playMechanicalSound(roundedIndex + 1, 0.12)

        const selectedProj = projects[roundedIndex]
        if (onProjectChange && selectedProj) {
          onProjectChange(selectedProj, roundedIndex)
        }
      }
    },
    [totalCount, resolvedCenters, projects, onProjectChange]
  )

  const handlePointerDown = (e) => {
    if (totalCount <= 1) return
    isDraggingRef.current = true
    setIsDragging(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
    updateSlideFromClientY(e.clientY)
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    updateSlideFromClientY(e.clientY)
  }

  const handlePointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      e.currentTarget.releasePointerCapture?.(e.pointerId)

      const snappedIndex = Math.min(
        Math.max(Math.round(sliderPosition), 0),
        totalCount - 1
      )
      setSliderPosition(snappedIndex)
      activeIndexRef.current = snappedIndex

      const targetProj = projects[snappedIndex]
      if (targetProj) {
        scrollToCard(targetProj, snappedIndex)
      }
    }
  }

  const handleItemClick = (project, idx) => {
    playCrispClick(0.5)
    setSliderPosition(idx)
    activeIndexRef.current = idx

    if (onProjectChange) {
      onProjectChange(project, idx)
    }
    scrollToCard(project, idx)
  }

  // Scroll Spy: Pantau posisi scrolling halaman dan sinkronkan posisi slider ke card yang sedang terlihat
  useEffect(() => {
    if (totalCount === 0) return

    let rafId
    const handleScrollSpy = () => {
      if (isDraggingRef.current) return

      const scrollTriggerLine = window.innerHeight * 0.35

      let closestIndex = 0
      let closestDistance = Infinity

      projects.forEach((proj, idx) => {
        const cardId = `project-card-${proj.id ?? idx}`
        const el = document.getElementById(cardId)
        if (!el) return

        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - scrollTriggerLine)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = idx
        }
      })

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex
        setSliderPosition(closestIndex)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScrollSpy)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const timer = setTimeout(handleScrollSpy, 150)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [projects, totalCount])

  if (totalCount === 0) return null

  return (
    <nav
      aria-label="Project Navigation Tabs"
      className={`relative select-none ${className}`}
    >
      {/* ── Label Header ── */}
      <div className="mb-2">
        <p className="text-white text-[14px] font-medium">My Projects</p>
      </div>

      {/* ── Main Vertical Ruler & Items Container ── */}
      <div className="relative flex items-stretch gap-2">
        {/* ── Vertical Ruler Track & Ticks (Interactive Drag Area) ── */}
        <div
          ref={rulerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-5 shrink-0 touch-none group/ruler ${totalCount > 1 ? 'cursor-ns-resize' : 'cursor-default'
            }`}
        >
          {/* Visual Ruler Baseline: Ticks Presisi dengan Proximity Zoom Animation */}
          <div className="relative w-full h-full">
            {Array.from({ length: calculatedTotalTicks }).map((_, i) => {
              const isMajor = calculatedMajorIndices.includes(i)
              const baseWidth = isMajor ? 18 : 8

              // Jarak dari jarum aktif ke tick ke-i
              const dist = Math.abs(tickPosition - i)
              const zoomRadius = 2.8
              let scaleFactor = 1
              let opacity = isMajor ? 0.65 : 0.22

              if (dist < zoomRadius) {
                const intensity = 0.5 * (1 + Math.cos((Math.PI * dist) / zoomRadius))
                scaleFactor = 1 + intensity * 0.3
                opacity = Math.min(1, opacity + intensity * 0.68)
              }

              const computedWidth = baseWidth * scaleFactor
              const yPos = tickYPositions[i] ?? 0

              return (
                <div
                  key={i}
                  className="absolute left-0 flex items-center justify-start pointer-events-none -translate-y-1/2"
                  style={{
                    top: `${yPos}px`,
                  }}
                >
                  <span
                    style={{
                      width: `${computedWidth}px`,
                      opacity,
                      backgroundColor: 'var(--text-primary)',
                    }}
                    className={`shrink-0 transition-[width,opacity] ${isDragging ? 'duration-75' : 'duration-300'
                      } ease-out ${isMajor ? 'h-[1.5px]' : 'h-[1px]'}`}
                  />
                </div>
              )
            })}
          </div>

          {/* Indikator Jarum Oranye Vertikal Aktif (Needle) */}
          <div
            className={`absolute left-0 pointer-events-none z-10 flex items-center -translate-y-1/2 ${isDragging ? 'transition-none' : 'transition-all duration-300 ease-out'
              }`}
            style={{
              top: `${needleTopPx}px`,
            }}
          >
            {/* Jarum horizontal oranye dengan glow — sejajar tepat pada garis tick putih */}
            <div className="h-[2px] w-6 bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] -ml-0.5 shadow-[0_0_8px_var(--accent-glow)]" />
          </div>
        </div>

        {/* ── Project Labels List (Tersusun rapi dengan gap tetap) ── */}
        <div className="flex-1 flex flex-col py-1 space-y-2">
          {projects.map((project, idx) => {
            const isActive = currentIndex === idx
            const title = project.title?.en || project.title || `Project ${idx + 1}`

            return (
              <button
                key={project.id ?? idx}
                ref={(el) => {
                  itemRefs.current[idx] = el
                }}
                type="button"
                onClick={() => handleItemClick(project, idx)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                    ? 'translate-x-1 text-app-primary font-semibold hover:bg-app-surface/60'
                    : 'bg-transparent text-app-secondary hover:text-app-primary hover:bg-app-surface/60'
                  }`}
              >
                <div className="text-[13px] leading-snug">
                  {title}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
