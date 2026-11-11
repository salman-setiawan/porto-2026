// Data proyek balikpapan.dev disatukan ke dalam DataBppDev (sama seperti DataHome)
export const DataBppDev = {
  about: {
    title: {
      en: 'About the project . .',
      id: 'Tentang proyek . .',
    },
    desc: [
      {
        en: "Balikpapan.dev is a local technology and programmer community in Balikpapan focused on knowledge sharing, idea incubation, and mentorship, with a vision of building a technology ecosystem in the city. Discover more on their official Website and Instagram. I volunteer as a Graphic Designer, contributing to the community's visual identity and digital communication.",
        id: "Balikpapan.dev merupakan komunitas teknologi dan programmer di Balikpapan yang berfokus pada berbagi pengetahuan, inkubasi ide, dan mentoring, dengan visi membangun ekosistem teknologi di Balikpapan. Kunjungi informasi selengkapnya di Website dan Instagram resmi mereka. Saya berkontribusi sebagai relawan Graphic Designer untuk mendukung identitas visual dan komunikasi digital komunitas.",
      },
      {
        en: "My responsibilities include creating digital visual assets such as Instagram posts, Google Forms banners, YouTube thumbnails, and Google Meet backgrounds. These assets support the community's bi-weekly events, which feature knowledge-sharing sessions and discussions about programming, AI, and other technology-related topics.",
        id: "Tanggung jawab saya meliputi pembuatan berbagai aset visual digital, seperti konten Instagram, banner Google Forms, thumbnail YouTube, dan background Google Meet. Aset tersebut digunakan untuk mendukung kegiatan rutin bi-weekly komunitas yang mencakup sesi berbagi pengetahuan dan diskusi seputar pemrograman, AI, serta berbagai topik teknologi lainnya.",
      },
    ],
  },
  // 37 total tick marks: index 0 = Week 1, 12 = Week 2, 24 = Week 3, 36 = Week 4
  totalTicks: 37,
  majorTickIndices: [0, 12, 24, 36],
  // Data aset desain mingguan (-1 = Week 1, -2 = Week 2, -3 = Week 3, -4 = Week 4)
  weeksData: [
    {
      id: 1,
      weekNumber: 1,
      title: 'Visual Identity & Welcome Forms',
      dateRange: 'Week 1',
      category: 'Graphic Design',
      desc: 'Inisiasi identitas visual awal komunitas, banner idle background, form registrasi komunitas, dan materi promo Instagram edisi pembuka.',
      items: [
        {
          id: 'promo-1',
          type: 'Promotion Flyer',
          tag: 'Instagram Feed',
          src: '/projects/bpp-dev/PROMOTION-1.png',
          desc: 'Materi flyer promosi pengenalan komunitas developer Balikpapan.',
        },
        {
          id: 'form-1',
          type: 'Google Form Banner',
          tag: 'Header Form',
          src: '/projects/bpp-dev/FORM-1.png',
          desc: 'Header banner visual untuk formulir registrasi member baru.',
        },
        {
          id: 'idle-1',
          type: 'Stream & Event Idle',
          tag: 'Screen Asset',
          src: '/projects/bpp-dev/IDLE-1.png',
          desc: 'Layar tunggu (standby screen) untuk sesi meet & live stream komunitas.',
        },
        {
          id: 'bg-1',
          type: 'Event Background',
          tag: 'Stage Backdrop',
          src: '/projects/bpp-dev/BACKGROUND-1.png',
          desc: 'Asset background bertema modern tech community.',
        },
      ],
    },
    {
      id: 2,
      weekNumber: 2,
      title: 'Feedback Loops & Community Gathering',
      dateRange: 'Week 2',
      category: 'Interactive Assets',
      desc: 'Pengembangan asset feedback survei peserta, visual promo pertemuan rutin kedua, form evaluasi, serta latar visual yang lebih dinamis.',
      items: [
        {
          id: 'promo-2',
          type: 'Event Poster',
          tag: 'Main Event Promo',
          src: '/projects/bpp-dev/PROMOTION-2.jpg',
          desc: 'Poster resmi agenda meet-up tech developer Balikpapan edisi kedua.',
        },
        {
          id: 'feedback-2',
          type: 'Feedback Survey Header',
          tag: 'Survey Form',
          src: '/projects/bpp-dev/FEEDBACK-2.png',
          desc: 'Banner survei feedback untuk evaluasi kenyamanan dan topik event.',
        },
        {
          id: 'form-2',
          type: 'RSVP Form Header',
          tag: 'Registration',
          src: '/projects/bpp-dev/FORM-2.png',
          desc: 'Asset form pendaftaran kehadiran peserta meetup.',
        },
        {
          id: 'idle-2',
          type: 'Break Screen Display',
          tag: 'Stream Display',
          src: '/projects/bpp-dev/IDLE-2.png',
          desc: 'Visual layar istirahat & countdown acara.',
        },
        {
          id: 'bg-2',
          type: 'High-Res Presentation Backdrop',
          tag: 'Background',
          src: '/projects/bpp-dev/BACKGROUND-2.png',
          desc: 'Backdrop presentasi dengan gradien gelap bertekstur modern.',
        },
      ],
    },
    {
      id: 3,
      weekNumber: 3,
      title: 'Speaker Session & Workshop Branding',
      dateRange: 'Week 3',
      category: 'Keynote & Media',
      desc: 'Branding visual intensif untuk sesi workshop teknis bersama speaker undangan, visual backdrop panggung, dan layout form kehadiran.',
      items: [
        {
          id: 'promo-3',
          type: 'Workshop Keynote Poster',
          tag: 'Keynote Flyer',
          src: '/projects/bpp-dev/PROMOTION-3.jpg',
          desc: 'Materi publikasi workshop programming & tips industri digital.',
        },
        {
          id: 'form-3',
          type: 'Workshop Attendance Form',
          tag: 'Form Header',
          src: '/projects/bpp-dev/FORM-3.png',
          desc: 'Header formulir presensi dan pengumpulan materi workshop.',
        },
        {
          id: 'idle-3',
          type: 'Presentation Screen',
          tag: 'Projection',
          src: '/projects/bpp-dev/IDLE-3.png',
          desc: 'Display standby proyektor selama jeda tanya jawab peserta.',
        },
        {
          id: 'bg-3',
          type: 'Keynote Stage Wallpaper',
          tag: 'Backdrop',
          src: '/projects/bpp-dev/BACKGROUND-3.png',
          desc: 'Wallpaper panggung proyektor untuk slide deck pembicara.',
        },
      ],
    },
    {
      id: 4,
      weekNumber: 4,
      title: 'Closing Showcase & Community Milestones',
      dateRange: 'Week 4',
      category: 'Showcase & Summary',
      desc: 'Rangkaian penutup bulan: poster recap pencapaian komunitas, formulir akhir tahun, aset idle penutup, dan visual latar bertema perayaan.',
      items: [
        {
          id: 'promo-4',
          type: 'Milestone Promotion',
          tag: 'Monthly Recap',
          src: '/projects/bpp-dev/PROMOTION-4.jpg',
          desc: 'Poster recap kolaborasi developer dan agenda komunitas mendatang.',
        },
        {
          id: 'form-4',
          type: 'Annual / Monthly Survey',
          tag: 'Evaluation Form',
          src: '/projects/bpp-dev/FORM-4.png',
          desc: 'Formulir survei aspirasi untuk topik meetup bulan berikutnya.',
        },
        {
          id: 'idle-4',
          type: 'Closing Screen Visual',
          tag: 'Ending Screen',
          src: '/projects/bpp-dev/IDLE-4.png',
          desc: 'Layar penutup sesi dengan QR code social media dan dokumentasi.',
        },
        {
          id: 'bg-4',
          type: 'Community Wall Canvas',
          tag: 'Backdrop',
          src: '/projects/bpp-dev/BACKGROUND-4.png',
          desc: 'Backdrop penutup dengan aksen grafis modern khas balikpapan.dev.',
        },
      ],
    },
  ],
}

// Named exports untuk backward compatibility
export const WEEKS_DATA = DataBppDev.weeksData
export const TOTAL_TICKS = DataBppDev.totalTicks
export const MAJOR_TICK_INDICES = DataBppDev.majorTickIndices
export const BPP_DEV_ABOUT = DataBppDev.about



