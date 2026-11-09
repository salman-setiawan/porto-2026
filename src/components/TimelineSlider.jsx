import { useRef, useCallback, useMemo } from 'react'
import { playMechanicalSound, playCrispClick } from '../utils/sound'

/**
 * TimelineSlider - Reusable interactive milestone/timeline ruler slider
 *
 * Supports continuous floating-point drag with snap-to-step physics,
 * sound effects on transition, and proximity zoom animation on ruler ticks.
 */
export default function TimelineSlider({
  items = [],
  weeksData,
  activeIndex,
  activeWeekIndex,
  activeItem,
  activeWeek,
  totalSteps: propTotalSteps,
  totalWeeks,
  sliderPosition,
  setSliderPosition,
  isDragging,
  setIsDragging,
  onStepChange,
  setSelectedItemIndex,
  onPrev,
  handlePrevWeek,
  onNext,
  handleNextWeek,
  onItemClick,
  handleTimelineClick,
  timelineProgressPercent: propProgressPercent,
  currentTickPos: propTickPos,
  ticksPerInterval = 12,
  totalTicks: propTotalTicks,
  majorTickIndices: propMajorIndices,
  prevLabel = 'Earlier',
  nextLabel = 'Later',
  showButtons = true,
  className = '',
}) {
  const rulerRef = useRef(null)

  // Normalize data and steps for cross-compatibility
  const stepItems = items.length > 0 ? items : weeksData || []
  const totalCount = propTotalSteps || totalWeeks || stepItems.length || 1
  const currentIndex = activeIndex !== undefined ? activeIndex : activeWeekIndex ?? 0
  const currentStep = activeItem || activeWeek || stepItems[currentIndex] || {}

  const activeIndexRef = useRef(currentIndex)

  // Calculate ticks dynamically if not explicitly passed
  const calculatedTotalTicks = useMemo(() => {
    if (propTotalTicks) return propTotalTicks
    if (totalCount <= 1) return 1
    return (totalCount - 1) * ticksPerInterval + 1
  }, [propTotalTicks, totalCount, ticksPerInterval])

  const calculatedMajorIndices = useMemo(() => {
    if (propMajorIndices) return propMajorIndices
    return Array.from({ length: totalCount }, (_, i) => i * ticksPerInterval)
  }, [propMajorIndices, totalCount, ticksPerInterval])

  // Continuous progress percentage (0 - 100%)
  const progressPercent = useMemo(() => {
    if (propProgressPercent !== undefined) return propProgressPercent
    if (totalCount <= 1 || sliderPosition === undefined) return 0
    return (sliderPosition / (totalCount - 1)) * 100
  }, [propProgressPercent, totalCount, sliderPosition])

  // Current tick position for proximity zoom calculation
  const tickPosition = useMemo(() => {
    if (propTickPos !== undefined) return propTickPos
    if (totalCount <= 1 || sliderPosition === undefined) return 0
    return (sliderPosition / (totalCount - 1)) * (calculatedTotalTicks - 1)
  }, [propTickPos, totalCount, sliderPosition, calculatedTotalTicks])

  // Drag handler: updates sliderPosition smoothly (continuous floating values)
  const updateSlideFromClientX = useCallback(
    (clientX) => {
      const el = rulerRef.current
      if (!el || !setSliderPosition) return
      const rect = el.getBoundingClientRect()
      const relativeX = clientX - rect.left
      const percent = Math.min(Math.max(relativeX / rect.width, 0), 1)

      const continuousVal = percent * (totalCount - 1)
      setSliderPosition(continuousVal)

      const roundedIndex = Math.round(continuousVal)
      if (roundedIndex !== activeIndexRef.current) {
        activeIndexRef.current = roundedIndex
        playMechanicalSound(roundedIndex + 1, 0.12)
        if (onStepChange) onStepChange(roundedIndex)
      }
    },
    [totalCount, setSliderPosition, onStepChange]
  )

  const handlePointerDown = (e) => {
    if (setIsDragging) setIsDragging(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
    updateSlideFromClientX(e.clientX)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    updateSlideFromClientX(e.clientX)
  }

  // Snap to the closest step integer on pointer release (threshold 0.5)
  const handlePointerUp = (e) => {
    if (isDragging) {
      if (setIsDragging) setIsDragging(false)
      e.currentTarget.releasePointerCapture?.(e.pointerId)

      if (setSliderPosition) {
        setSliderPosition((prev) => {
          const snappedIndex = Math.min(
            Math.max(Math.round(prev), 0),
            totalCount - 1
          )
          return snappedIndex
        })
      }
      if (setSelectedItemIndex) setSelectedItemIndex(0)
    }
  }

  const handleStepClick = (idx) => {
    if (handleTimelineClick) {
      handleTimelineClick(idx)
    } else if (onItemClick) {
      onItemClick(idx)
    } else if (setSliderPosition) {
      playMechanicalSound(idx + 1, 0.2)
      setSliderPosition(idx)
      if (setSelectedItemIndex) setSelectedItemIndex(0)
    }
  }

  const triggerPrev = () => {
    playCrispClick(0.6)
    if (handlePrevWeek) handlePrevWeek()
    else if (onPrev) onPrev()
  }

  const triggerNext = () => {
    playCrispClick(0.6)
    if (handleNextWeek) handleNextWeek()
    else if (onNext) onNext()
  }

  const titleText = currentStep.title || currentStep.label || `Milestone ${currentIndex + 1}`

  return (
    <div className={`space-y-4 pt-4 ${className}`}>
      {/* Interactive Timeline Track & Ruler */}
      <div className="relative w-full select-none">

        {/* Active Milestone Tag Capsule */}
        <div
          className={`absolute -top-7 pointer-events-none -translate-x-1/2 z-20 ${
            isDragging ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{ left: `${progressPercent}%` }}
        >
          <div className="px-2.5 py-0.5 rounded-full bg-app-surface-elevated border border-app-medium text-[11px] font-medium text-app-primary shadow-lg whitespace-nowrap">
            <span>{titleText}</span>
          </div>
        </div>

        {/* Garis Horizontal Ruler & Ticks (Area draggable/clickable) */}
        <div
          ref={rulerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative h-16 flex items-end pb-1 cursor-ew-resize touch-none group/ruler"
        >
          {/* Visual Ruler Baseline: Ticks Presisi dengan Proximity Zoom Animation */}
          <div className="w-full flex justify-between items-end h-10">
            {Array.from({ length: calculatedTotalTicks }).map((_, i) => {
              const isMajor = calculatedMajorIndices.includes(i)
              const baseHeight = isMajor ? 24 : 12

              // Distance from current needle position to tick i
              const dist = Math.abs(tickPosition - i)
              const zoomRadius = 3.2
              let scaleFactor = 1
              let opacity = isMajor ? 0.65 : 0.22

              if (dist < zoomRadius) {
                const intensity = 0.5 * (1 + Math.cos((Math.PI * dist) / zoomRadius))
                scaleFactor = 1 + intensity * 0.75
                opacity = Math.min(1, opacity + intensity * 0.65)
              }

              const computedHeight = baseHeight * scaleFactor

              return (
                <div
                  key={i}
                  className="flex justify-center items-end h-full"
                  style={{ width: '0px' }}
                >
                  <span
                    style={{
                      height: `${computedHeight}px`,
                      opacity: opacity,
                      backgroundColor: 'var(--text-primary)',
                    }}
                    className={`shrink-0 transition-[height,opacity] ${
                      isDragging ? 'duration-75' : 'duration-300'
                    } ease-out ${
                      isMajor ? 'w-[1.5px]' : 'w-[1px]'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Indikator Slider Oranye Vertikal Aktif */}
          <div
            className={`absolute bottom-1 pointer-events-none z-10 flex flex-col items-center -translate-x-1/2 ${
              isDragging ? 'transition-none' : 'transition-all duration-300 ease-out'
            }`}
            style={{ left: `${progressPercent}%` }}
          >
            {/* Jarum vertikal oranye (var(--accent)) dengan glow khas tema */}
            <div className="w-[2px] h-12 bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] rounded-full" />
          </div>
        </div>

        {/* Step / Week Labels row under ruler */}
        <div className="relative w-full h-8 pt-1.5">
          {stepItems.map((step, idx) => {
            const labelText = step.dateRange || step.label || step.shortTitle || `Step ${idx + 1}`
            const isActive = currentIndex === idx
            const stepPercent = totalCount > 1 ? (idx / (totalCount - 1)) * 100 : 0

            return (
              <button
                key={step.id || idx}
                type="button"
                onClick={() => handleStepClick(idx)}
                style={{ left: `${stepPercent}%` }}
                className={`absolute top-1.5 -translate-x-1/2 text-center text-xs font-mono transition-all duration-200 cursor-pointer py-1 whitespace-nowrap ${
                  isActive
                    ? 'text-app-accent font-bold scale-105 drop-shadow-[0_0_8px_var(--accent-glow)]'
                    : 'text-app-muted hover:text-app-secondary'
                }`}
              >
                <span>{labelText}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Earlier / Later Navigation Buttons */}
      {showButtons && (
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={triggerPrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-app-surface/20 text-app-muted border border-transparent'
                : 'bg-app-surface text-app-secondary hover:text-app-primary border border-app-subtle hover:border-app-medium active:scale-95'
            }`}
          >
            {prevLabel}
          </button>

          <button
            type="button"
            onClick={triggerNext}
            disabled={currentIndex === totalCount - 1}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
              currentIndex === totalCount - 1
                ? 'opacity-30 cursor-not-allowed bg-app-surface/20 text-app-muted'
                : 'bg-app-accent text-white font-semibold hover:opacity-90 shadow-md active:scale-95'
            }`}
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  )
}

export { TimelineSlider }

