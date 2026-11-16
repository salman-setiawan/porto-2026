import Tab from '../Tab'

/**
 * CaseStudySection
 *
 * Atomic section block: satu judul + konten (children).
 * Dipanggil berulang kali per section di halaman project detail.
 *
 * Props
 * ─────
 * id       {string}  ID unik elemen (opsional, auto-generated dari title jika tidak ada)
 * title    {string}  Judul section (e.g. "Overview", "Process")
 * accent   {string}  Warna judul: "amber" | "yellow" | "emerald" | "neutral" (default)
 * children {node}    Isi konten section
 */
export const CaseStudySection = ({ id, title, accent = 'neutral', children }) => {
  const sectionId =
    id || `section-${String(title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  const accentClass = {
    amber: 'heading-accent-amber',
    yellow: 'heading-accent-yellow',
    emerald: 'heading-accent-emerald',
    neutral: 'text-app-primary',
  }[accent] ?? 'text-app-primary'

  return (
    <div id={sectionId} className="space-y-3 scroll-mt-24">
      <h2 className={`text-[36px] font-crimson italic tracking-tighter leading-tight ${accentClass}`}>
        {title}
      </h2>
      <div className="text-app-secondary leading-relaxed font-sans">
        {children}
      </div>
    </div>
  )
}

/**
 * CaseStudyLayout
 *
 * Kontainer pembungkus konten Case Study yang menyertakan navigasi Tab.jsx
 * di kolom samping (sticky di desktop, tersembunyi di mobile) dan mengalirkan
 * konten studi kasus di kolom utama.
 *
 * Props
 * ─────
 * sections    {Array}   Daftar item section untuk Tab navigation [{ id, title }, ...]
 * headerLabel {string}  Label judul tab (default: "Case Study")
 * children    {node}    Seluruh kumpulan CaseStudySection
 * className   {string}  Class styling tambahan
 */
export const CaseStudyLayout = ({
  sections = [],
  headerLabel = 'Case Study',
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row items-start gap-8 w-full ${className}`}>
      {/* Kolom Kiri: Vertical Interactive Tab Slider (Sticky di desktop) */}
      {sections.length > 0 && (
        <aside className="hidden md:block md:w-[24%] lg:w-[22%] shrink-0 sticky top-4 self-start z-30 pt-6">
          <Tab items={sections} headerLabel={headerLabel} />
        </aside>
      )}

      {/* Kolom Kanan: Konten Case Study Sections */}
      <div className={`space-y-12 w-full ${sections.length > 0 ? 'md:w-[76%] lg:w-[78%]' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default CaseStudySection
