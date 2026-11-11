export const DataProject = {
  title: {
    en: "Projects",
    id: "Projects",
  },
  desc: {
    en: "A complete archive of web applications, mobile products, design systems, and digital assets crafted with focus on aesthetics and user impact.",
    id: "Kumpulan lengkap aset digital, aplikasi web, produk seluler, sistem desain, dan aset digital yang dibuat dengan fokus pada estetika dan dampak pengguna.",
  },
  tag: [
    {
      id: 'all',
      name: 'All',
    },
    {
      id: 'uix',
      name: 'UI/UX Design',
    },
    {
      id: 'dev',
      name: 'Development',
    },
    {
      id: 'graphic',
      name: 'Graphic Design',
    },
  ],
  projects: [
    {
      id: 1,
      title: {
        en: "balikpapan.dev",
        id: "balikpapan.dev",
      },
      desc: {
        en: 'Digital assets roadmap, community branding, and graphic design showcase for Balikpapan developer tech community.',
        id: 'Roadmap aset digital, branding komunitas, dan showcase desain grafis untuk komunitas developer Balikpapan.',
      },
      tag: [
        { en: 'Graphic Design', id: 'Desain Grafis' },
        { en: 'Digital Assets', id: 'Aset Digital' },
      ],
      stack: [
        { en: 'Figma', id: 'Figma' },
      ],
      cta: [
        { en: 'Visit Social Media', id: 'Kunjungi Sosial Media', link: 'https://www.instagram.com/balikpapan.dev/' },
        { en: 'See My Works', id: 'Lihat Karya Saya', link: '/project/balikpapan-dev' },
      ],
      media: '/projects/bpp-dev/PROMOTION-2.jpg',
    },
    {
      id: 2,
      title: {
        en: "Duitra Apps",
        id: "Aplikasi Duitra",
      },
      desc: {
        en: 'Track every expense, stay under budget, and take control of your finances in minutes. No complexity. No confusion.',
        id: 'Catat setiap pengeluaran, tetap di bawah anggaran, dan kontrol keuanganmu dalam menit. Tidak kompleks. Tidak bingung.',
      },
      tag: [
        { en: 'Product Design', id: 'Desain Produk' },
        { en: 'Mobile App', id: 'Aplikasi Mobile' },
      ],
      stack: [
        { en: 'Flutter', id: 'Flutter' },
        { en: 'Dart', id: 'Dart' },
        { en: 'Firebase', id: 'Firebase' },
      ],
      cta: [
        { en: 'View Website', id: 'Kunjungi Website', link: 'https://duitraapps.netlify.app' },
        { en: 'See My Works', id: 'Lihat Karya Saya', link: '/project/duitra-apps' },
      ],
      media: '/projects/duitra-apps/heroimg_desktop.webp',
    },
    {
      id: 3,
      title: {
        en: "Eduwork Mentor",
        id: "Eduwork Mentor",
      },
      desc: {
        en: 'A collaborative web design project focusing on building an intuitive mentor landing page with Agile workflow and user-centered design.',
        id: 'Proyek desain web kolaboratif yang berfokus pada pembuatan halaman arahan bagi mentor menggunakan alur kerja Agile dan pendekatan kebutuhan pengguna.',
      },
      tag: [
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'Landing Page', id: 'Halaman Arahan' },
      ],
      stack: [
        { en: 'Figma', id: 'Figma' },
        { en: 'Miro', id: 'Miro' },
      ],
      cta: [
        { en: 'View Case Study', id: 'Lihat Studi Kasus', link: '/project/eduwork' },
      ],
      media: '/projects/eduwork/gallery/screen1.webp',
      imageFit: 'contain',
    },
    {
      id: 4,
      title: {
        en: "EduFams Platform",
        id: "Platform EduFams",
      },
      desc: {
        en: 'Collaborative family-education platform developed using Design Thinking and Agile Kanban framework for personalized family learning journeys.',
        id: 'Platform edukasi keluarga kolaboratif yang dikembangkan menggunakan Design Thinking dan kerangka Agile Kanban untuk pembelajaran keluarga.',
      },
      tag: [
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'EdTech Platform', id: 'Platform Edukasi' },
      ],
      stack: [
        { en: 'Figma', id: 'Figma' },
        { en: 'Miro', id: 'Miro' },
        { en: 'React', id: 'React' },
      ],
      cta: [
        { en: 'Explore Case Study', id: 'Jelajahi Studi Kasus', link: 'https://dribbble.com/eisenflux' },
      ],
      media: '/shots/learnx.webp',
    },
    {
      id: 5,
      title: {
        en: "MusPlay Web Audio",
        id: "MusPlay Web Audio",
      },
      desc: {
        en: 'Minimalist audio streaming and playback interface with zero-latency synthesized sound, interactive waveform visualization, and dark mode aesthetic.',
        id: 'Antarmuka streaming dan pemutar audio minimalis dengan zero-latency Web Audio API, visualisasi gelombang interaktif, dan estetika dark mode.',
      },
      tag: [
        { en: 'Product Design', id: 'Desain Produk' },
        { en: 'Web Audio', id: 'Audio Web' },
      ],
      stack: [
        { en: 'Javascript', id: 'Javascript' },
        { en: 'React', id: 'React' },
        { en: 'Tailwind CSS', id: 'Tailwind CSS' },
      ],
      cta: [
        { en: 'View Design Shot', id: 'Lihat Desain Shot', link: 'https://dribbble.com/eisenflux' },
      ],
      media: '/shots/musplay.webp',
    },
    {
      id: 6,
      title: {
        en: "HaloGBS Telehealth",
        id: "HaloGBS Telehealth",
      },
      desc: {
        en: 'Modern healthcare consultation platform connecting patients with trusted medical professionals, featuring seamless appointment booking.',
        id: 'Platform konsultasi kesehatan modern yang menghubungkan pasien dengan tenaga medis terpercaya, dilengkapi pemesanan janji temu terpadu.',
      },
      tag: [
        { en: 'Product Design', id: 'Desain Produk' },
        { en: 'Healthcare UI', id: 'UI Kesehatan' },
      ],
      stack: [
        { en: 'Figma', id: 'Figma' },
        { en: 'Flutter', id: 'Flutter' },
        { en: 'Firebase', id: 'Firebase' },
      ],
      cta: [
        { en: 'Explore Project', id: 'Jelajahi Proyek', link: 'https://dribbble.com/eisenflux' },
      ],
      media: '/shots/halogbs.webp',
    },
    {
      id: 7,
      title: {
        en: "E-Store Minimalist",
        id: "E-Store Minimalis",
      },
      desc: {
        en: 'Clean, conversion-focused e-commerce shopping experience with micro-interactions, responsive cart flow, and high accessibility standards.',
        id: 'Pengalaman belanja e-commerce yang bersih dan berorientasi konversi dengan mikro-interaksi, alur keranjang responsif, dan aksesibilitas tinggi.',
      },
      tag: [
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'E-Commerce', id: 'E-Commerce' },
      ],
      stack: [
        { en: 'React', id: 'React' },
        { en: 'Tailwind CSS', id: 'Tailwind CSS' },
        { en: 'Figma', id: 'Figma' },
      ],
      cta: [
        { en: 'View Storefront', id: 'Lihat Etalase', link: 'https://dribbble.com/eisenflux' },
      ],
      media: '/shots/estore.webp',
    },
  ],
}
