import { useState } from 'react'
import { playCrispClick, playMechanicalSound } from '../../utils/sound'
import EduworkData from '../../data/projects/eduwork'
import SeamlessSlider from '../../components/showcase-section/SeamlessSlider'
import CaseStudySection, { CaseStudyLayout } from '../../components/project-section/ProjectCaseStudyContent'
import Chip from '../../components/Chip'
import PixelFlare from '../../motion/PixelFlare'
import { useFlareScroll } from '../../hooks/useFlareScroll'

const EDUWORK_GALLERY_SHOTS = [
  {
    src: '/projects/eduwork/gallery/screen1.webp',
    title: 'Hero & Value Proposition',
    desc: 'Header pembuka landing page dengan ajakan bergabung bagi praktisi mengajar, statistik metrik, dan tombol pendaftaran.',
  },
  {
    src: '/projects/eduwork/gallery/screen2.webp',
    title: 'Pilihan Industri & Keahlian',
    desc: 'Kategori keilmuan mentoring interaktif dari Data Science, Engineering, UI/UX Design, hingga Marketing.',
  },
  {
    src: '/projects/eduwork/gallery/screen3.webp',
    title: 'Jangkauan Komunitas Nasional',
    desc: 'Visualisasi peta persebaran jejaring mentor dan peserta yang telah terhubung di lebih dari 40 kota se-Indonesia.',
  },
  {
    src: '/projects/eduwork/gallery/screen4.webp',
    title: 'Top Mentor Leaderboard',
    desc: 'Daftar mentor teratas dengan transparansi estimasi penghasilan dan rating performa untuk memotivasi calon mentor baru.',
  },
  {
    src: '/projects/eduwork/gallery/screen5.webp',
    title: 'Keuntungan Menjadi Mentor',
    desc: 'Pemaparan nilai tambah berupa pengasahan leadership skills, penghasilan sampingan, dan peningkatan kredibilitas profesional.',
  },
  {
    src: '/projects/eduwork/gallery/screen6.webp',
    title: 'LMS Monitoring Dashboard',
    desc: 'Pratinjau antarmuka sistem manajemen pembelajaran (LMS) berbasis desktop untuk memonitor perkembangan mentee.',
  },
  {
    src: '/projects/eduwork/gallery/screen7.webp',
    title: 'Fitur Manajemen Pembelajaran',
    desc: 'Fasilitas asesmen tugas siswa, media belajar interaktif, jadwal kalender kegiatan, dan laporan rutin otomatis.',
  },
  {
    src: '/projects/eduwork/gallery/screen8.webp',
    title: 'Halaman Profil Komunitas Mentor',
    desc: 'Ruang personal branding mentor untuk menampilkan rekam jejak, portofolio karya, agenda event, dan kelas aktif.',
  },
  {
    src: '/projects/eduwork/gallery/screen9.webp',
    title: 'Modul Interaksi Komunitas',
    desc: 'Eksplorasi feeds komunitas terpadu, e-class, webinar terjadwal, dan sertifikasi kredensial mentor.',
  },
  {
    src: '/projects/eduwork/gallery/screen10.webp',
    title: 'Alur Pendaftaran Mentor',
    desc: 'Enam tahapan registrasi bertahap mulai dari verifikasi akun, konsultasi 1-on-1, hingga peluncuran kelas mentoring perdana.',
  },
  {
    src: '/projects/eduwork/gallery/screen11.webp',
    title: 'Call to Action & Footer',
    desc: 'Bagian penutup dengan tombol konsultasi via WhatsApp bersama tautan legalitas dan navigasi resmi platform.',
  },
]

const CASE_STUDY_SECTIONS = [
  { id: 'section-overview', title: 'Overview' },
  { id: 'section-problem', title: 'Problem' },
  { id: 'section-process', title: 'Process' },
  { id: 'section-impact', title: 'Impact' },
  { id: 'section-key-learnings', title: 'Key Learnings' },
]

const Eduwork = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const { flareOpacity, isFlareVisible } = useFlareScroll()

  const handleOpenImage = (src) => { playMechanicalSound(2, 0.2); setSelectedImage(src) }

  return (
    <div className="min-h-screen bg-app-primary text-app-primary font-sans transition-colors duration-300 relative selection:bg-orange-500/30 selection:text-orange-400 pb-24">

      {/* ── PIXEL FLARE (memudar saat scroll ke bawah) ── */}
      <div
        className="fixed inset-x-0 top-0 h-[320px] md:h-[640px] pointer-events-none z-0 transition-opacity duration-75"
        style={{
          opacity: flareOpacity,
          display: isFlareVisible ? 'block' : 'none',
        }}
      >
        <PixelFlare speed={1.0} intensity="vibrant" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--flare-mask)' }}
        />
      </div>

      <main className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-12 relative z-[1]">

        {/* ── SECTION 1: HEADER TITLE & CHIPS ── */}
        <section className="pt-8 pb-4 space-y-4">
          <h1 className="text-[40px] font-crimson italic tracking-tight text-app-primary leading-12">
            {EduworkData.title}
          </h1>

          {/* Tags & Tech Stacks (Sama seperti ProjectCard.jsx) */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {EduworkData.tag?.map((tag, index) => (
                <Chip key={index} label={tag.en || tag} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {EduworkData.stack?.map((stack, index) => (
                <Chip key={index} label={stack.en || stack} autoIcon={true} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 1B: SEAMLESS SLIDER ── */}
        <section className="space-y-4">
          <div>
            <h2 className="text-[36px] font-crimson italic tracking-tighter text-app-primary leading-tight">
              Final User Interface
            </h2>
            <p className="text-sm text-app-muted">
              High-fidelity mentor website landing page layout
            </p>
          </div>
          <div className="relative w-full overflow-hidden border border-app-subtle bg-app-surface/40">
            <SeamlessSlider
              shots={EDUWORK_GALLERY_SHOTS}
              heightClass="h-[320px] sm:h-[360px]"
              showOverlayGradients={false}
              className="w-full"
              speedMultiplier={2}
              enableEnlarge={true}
            />
          </div>
        </section>

        {/* ── CASE STUDY CONTENT WITH VERTICAL TAB SLIDER ── */}
        <CaseStudyLayout sections={CASE_STUDY_SECTIONS} headerLabel="Case Study">
          {/* SECTION 2: OVERVIEW + PROBLEM */}
          <div className="space-y-8">
            <CaseStudySection title="Overview" accent="amber">
              <div className="space-y-3">
                {EduworkData.overview.map((para, idx) => <p key={idx}>{para.en}</p>)}
              </div>
            </CaseStudySection>

            <CaseStudySection title="Problem" accent="amber">
              <p>{EduworkData.problem.en}</p>
            </CaseStudySection>
          </div>

          {/* SECTION 3: PROCESS */}
          <div className="space-y-5">
            {/* Process flow diagram */}
            <div
              onClick={() => handleOpenImage(EduworkData.processImg)}
              className="group relative border border-app-subtle bg-app-surface/60 p-4 sm:p-6 overflow-hidden cursor-zoom-in flex items-center justify-center transition-all hover:border-app-accent shadow-sm"
            >
              <img
                src={EduworkData.processImg}
                alt="Eduwork Design Process Diagram"
                loading="lazy"
                className="w-full max-w-[760px] h-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none text-white text-xs font-mono">
                <span>Click to enlarge diagram</span>
                <span>↗</span>
              </div>
            </div>

            <CaseStudySection title="Process" accent="yellow">
              <p>{EduworkData.process[0]?.overview?.en}</p>
            </CaseStudySection>

            <div className="space-y-3 leading-relaxed font-sans text-app-secondary">
              {EduworkData.process.slice(1).map((step, idx) => (
                <p key={idx}>
                  <strong className="heading-accent-yellow font-bold mr-1">{step.label.en}</strong>
                  <span>{step.desc.en}</span>
                </p>
              ))}
            </div>
          </div>

          {/* SECTION 4: IMPACT + KEY LEARNINGS */}
          <div className="space-y-8">
            <CaseStudySection title="Impact" accent="emerald">
              <p>{EduworkData.impact.en}</p>
            </CaseStudySection>

            <CaseStudySection title="Key Learnings" accent="emerald">
              <p>{EduworkData.keyLearnings.en}</p>
            </CaseStudySection>
          </div>
        </CaseStudyLayout>

        {/* ── Footer ── */}
        <section className="pt-8 border-t border-app-subtle w-full flex justify-center">
          <button
            type="button"
            onClick={() => { playCrispClick(0.5); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="text-app-muted hover:text-app-accent transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </section>
      </main>

      {/* ── LIGHTBOX ── */}
      {selectedImage && (
        <div onClick={() => setSelectedImage(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center cursor-zoom-out animate-fadeIn">
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center">
            <img src={selectedImage} alt="Enlarged Preview" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-app-subtle" />
            <span className="text-xs text-white/70 mt-3 font-mono">Click anywhere to close</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Eduwork
