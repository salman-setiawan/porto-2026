import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { playMechanicalSound } from '../../utils/sound'
import TimelineSlider from '../../components/TimelineSlider'
import About from '../../components/About'
import { DataBppDev } from '../../data/bpnDev'

const BppDev = () => {
  const { weeksData, totalTicks, about } = DataBppDev

  // Nilai desimal kontinu untuk pergerakan slider yang mulus (0.0 s/d 3.0)
  const [sliderPosition, setSliderPosition] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Indeks minggu diskrit [0, 1, 2, 3] ditentukan berdasarkan pembulatan (threshold 0.5)
  const totalWeeks = weeksData.length
  const activeWeekIndex = Math.min(
    Math.max(Math.round(sliderPosition), 0),
    totalWeeks - 1
  )

  const activeWeek = weeksData[activeWeekIndex]

  // Pastikan item index valid untuk week yang sedang aktif
  const activeItemIndex = selectedItemIndex < activeWeek.items.length ? selectedItemIndex : 0
  const currentPreviewItem = activeWeek.items[activeItemIndex] || activeWeek.items[0]

  const handlePrevWeek = () => {
    if (activeWeekIndex > 0) {
      const targetIndex = activeWeekIndex - 1
      setSliderPosition(targetIndex)
      setSelectedItemIndex(0)
    }
  }

  const handleNextWeek = () => {
    if (activeWeekIndex < totalWeeks - 1) {
      const targetIndex = activeWeekIndex + 1
      setSliderPosition(targetIndex)
      setSelectedItemIndex(0)
    }
  }

  const handleTimelineClick = (index) => {
    playMechanicalSound(index + 1, 0.2)
    setSliderPosition(index)
    setSelectedItemIndex(0)
  }

  // Posisi persentase kontinu dari sliderPosition
  const timelineProgressPercent = useMemo(() => {
    if (totalWeeks <= 1) return 0
    return (sliderPosition / (totalWeeks - 1)) * 100
  }, [sliderPosition, totalWeeks])

  // Konversi sliderPosition (0..3) ke skala indeks tick (0..36)
  const currentTickPos = (sliderPosition / (totalWeeks - 1)) * (totalTicks - 1)

  return (
    <div className="min-h-screen bg-app-primary text-app-primary font-sans transition-colors duration-300 relative selection:bg-orange-500/30 selection:text-orange-400 pb-24">

      {/* ── Main Content Container ── */}
      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between items-center gap-2">
          <h1 className="text-[32px] h-[40px] font-crimson italic tracking-tight text-app-primary">
            balikpapan.dev
          </h1>
          <p className="text-[14px] text-app-muted">
            {weeksData.reduce((acc, w) => acc + w.items.length, 0)} Total Assets Designed
          </p>
        </div>

        {/* ── ABOUT SECTION (Informasi dari balikpapan_dev_graphic_designer.md) ── */}
        <About
          data={about}
          className="space-y-3 pt-2 pb-2"
        />

        {/* ── SHOWCASE SECTION ── */}
        <section className="space-y-4">

          {/* ── Main Showcase Card ── */}
          <div className="relative rounded-lg border border-app-subtle bg-app-surface/60 overflow-hidden shadow-xl p-2 flex flex-col justify-between transition-all duration-300">
            {/* Background subtle noise/gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-x-4 relative z-10">

              {/* Kolom Kiri: Detail Informasi & Metadata */}
              <div className="p-2 w-full lg:max-w-[420px] flex flex-col lg:justify-between">
                {/* Sub-item selector (Tabs thumbnail untuk item di minggu ini) */}
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-app-muted">
                    Assets Showcase ({activeWeek.items.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeWeek.items.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          playMechanicalSound(idx + 1, 0.15)
                          setSelectedItemIndex(idx)
                        }}
                        className={`px-2 py-0.5 rounded text-[14px] border-2 transition-all flex items-center gap-2 cursor-pointer ${activeItemIndex === idx
                          ? 'bg-app-primary text-app-primary border-app-accent shadow-sm'
                          : 'bg-app-surface/40 text-app-muted border-app-subtle hover:text-app-secondary hover:border-app-medium'
                          }`}
                      >
                        <span>{item.type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 py-6 lg:pt-0">
                  <h3 className="text-[40px] leading-[50px] font-crimson italic tracking-tight text-app-primary">
                    {activeWeek.title}
                  </h3>

                  <p className="text-[14px] text-app-secondary leading-relaxed">
                    {activeWeek.desc}
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Visual Card Image Display */}
              <div className="flex flex-col w-full items-center justify-center relative space-y-1.5">
                <div
                  onClick={() => setSelectedImage(currentPreviewItem.src)}
                  className="group/img relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-app-subtle bg-app-surface/40 shadow-inner flex items-center justify-center cursor-zoom-in"
                >
                  <img
                    key={currentPreviewItem.src}
                    src={currentPreviewItem.src}
                    alt={currentPreviewItem.type}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain p-2 group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Corner Accent Decor */}
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-app-muted leading-none select-none">+</span>
                  <span className="absolute top-2 right-2 text-[10px] font-mono text-app-muted leading-none select-none">+</span>
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-app-muted leading-none select-none">+</span>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono text-app-muted leading-none select-none">+</span>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none text-white text-xs font-medium">
                    <span>Click to expand image</span>
                    <span>↗</span>
                  </div>
                </div>
                {/* Detail item yang sedang dilihat */}
                <div className="py-2 px-3 rounded-lg border border-app-subtle w-full">
                  <p className="text-[13px] text-app-secondary">
                    {currentPreviewItem.desc}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── TIMELINE CONTROLLER (Reusable TimelineSlider component) ── */}
          <TimelineSlider
            sliderPosition={sliderPosition}
            setSliderPosition={setSliderPosition}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            setSelectedItemIndex={setSelectedItemIndex}
            timelineProgressPercent={timelineProgressPercent}
            activeWeekIndex={activeWeekIndex}
            activeWeek={activeWeek}
            totalWeeks={totalWeeks}
            handlePrevWeek={handlePrevWeek}
            handleNextWeek={handleNextWeek}
            handleTimelineClick={handleTimelineClick}
            currentTickPos={currentTickPos}
            items={weeksData}
          />
        </section>

        {/* ── ALL WEEKS GRID GALLERY ── */}
        <section className="pt-12 border-t border-app-subtle space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-crimson italic tracking-tight text-app-primary">
              All Weekly Deliverables
            </h2>
            <p className="text-xs text-app-secondary">
              Semua karya desain yang diproduksi terkelompok berdasarkan siklus mingguan (-1, -2, -3, -4)
            </p>
          </div>

          <div className="space-y-12">
            {weeksData.map((week) => (
              <div key={week.id} className="space-y-4">
                {/* Header Tiap Minggu */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-app-subtle gap-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-app-surface text-app-accent border border-app-subtle">
                      {week.dateRange}
                    </span>
                    <h3 className="text-base font-semibold text-app-primary">
                      {week.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-app-muted">
                    {week.items.length} files
                  </span>
                </div>

                {/* Grid Aset Minggu Ini */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {week.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item.src)}
                      className="group/card rounded-xl border border-app-subtle bg-app-surface/30 hover:bg-app-surface/60 overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:border-app-accent hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] bg-app-surface/50 overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={item.src}
                          alt={item.type}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain group/card:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-app-surface-glass text-app-primary border border-app-subtle">
                          {item.tag}
                        </span>
                      </div>

                      <div className="p-3 space-y-1">
                        <h4 className="text-xs font-medium text-app-primary group-hover/card:text-app-accent transition-colors">
                          {item.type}
                        </h4>
                        <p className="text-[11px] text-app-muted line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── LIGHTBOX MODAL PREVIEW ── */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={selectedImage}
              alt="Enlarged Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-app-subtle"
            />
            <span className="text-xs text-white/70 mt-3 font-mono">
              Click anywhere to close · {selectedImage}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BppDev
