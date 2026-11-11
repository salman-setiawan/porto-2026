/**
 * CaseStudySection
 *
 * Atomic section block: satu judul + konten (children).
 * Dipanggil berulang kali per section di halaman project detail.
 *
 * Props
 * ─────
 * title    {string}  Judul section (e.g. "Overview", "Process")
 * accent   {string}  Warna judul: "amber" | "yellow" | "emerald" | "neutral" (default)
 * children {node}    Isi konten section
 */
const CaseStudySection = ({ title, accent = 'neutral', children }) => {
  const accentClass = {
    amber: 'heading-accent-amber',
    yellow: 'heading-accent-yellow',
    emerald: 'heading-accent-emerald',
    neutral: 'text-app-primary',
  }[accent] ?? 'text-app-primary'

  return (
    <div className="space-y-3">
      <h2 className={`text-[36px] font-crimson italic tracking-tighter leading-tight ${accentClass}`}>
        {title}
      </h2>
      <div className="text-app-secondary leading-relaxed font-sans">
        {children}
      </div>
    </div>
  )
}

export default CaseStudySection
