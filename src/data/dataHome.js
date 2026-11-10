export const DataHome = {
  heroSection: {
    avatar: "/avatar.gif",
    title: "i'm Salman!",
    position: [
      "an UI/UX Designer",
      "a Web Developer",
      "a Game Designer"
    ],
    desc: [
      {
        en: "I'm an Informatics graduate specializing in UI/UX Design, with a focus on creating intuitive and user-centered digital experiences through user research, wireframing, prototyping, and interface design.",
        id: 'Saya merupakan lulusan Informatika dengan spesialisasi di bidang UI/UX Design, berfokus pada penciptaan pengalaman digital yang intuitif dan berorientasi pada kebutuhan pengguna melalui user research, wireframing, prototyping, dan perancangan antarmuka.',
      },
      {
        en: "I've gained professional experience at MKA, where I worked on building EduFams, a family education platform; Eduwork, designing interfaces for a mentor platform; and Inotive, improving the usability and workflows of enterprise ERP systems used by institutions such as PLN and PDAM. I also currently volunteer as a graphic designer at balikpapan.dev.",
        id: 'Saya memiliki pengalaman profesional di MKA, dengan membangun EduFams, sebuah platform edukasi keluarga; Eduwork, merancang antarmuka platform mentor; serta Inotive, meningkatkan usability dan alur kerja sistem ERP yang digunakan oleh berbagai instansi, termasuk PLN dan PDAM. Saat ini, saya juga menjadi relawan sebagai graphic designer di balikpapan.dev.',
      },
      {
        en: 'Beyond professional design work, I explore Frontend and Game Development through personal projects. My tools and technologies include Figma, Miro and Framer for design; React, TailwindCSS, and Framer Motion for web development; and Construct 3 for game development.',
        id: 'Di luar pekerjaan profesional, saya mengeksplorasi Frontend dan Game Development melalui proyek pribadi. Tools dan teknologi yang saya gunakan meliputi Figma, Miro dan Framer untuk desain; React, TailwindCSS, dan Framer Motion untuk pengembangan website; serta Construct 3 untuk pengembangan game.',
      },
    ],
    cta: [
      { label: 'Instagram', link: 'https://instagram.com/eisenflux' },
      { label: 'LinkedIn', link: 'https://linkedin.com/in/salman-setiawan' },
      { label: 'GitHub', link: 'https://github.com/salman-setiawan' },
    ],
    greetings: [
      { text: 'Hi,', lang: 'en' }, // English
      { text: 'Hola,', lang: 'es' }, // Spanish
      { text: 'こんにちは,', lang: 'ja' }, // Japanese
      { text: 'Hallo,', lang: 'de' }, // German
      { text: 'Bonjour,', lang: 'fr' }, // French
      { text: '안녕하세요,', lang: 'ko' }, // Korean
      { text: 'Ciao,', lang: 'it' }, // Italian
      { text: 'Olá,', lang: 'pt' }, // Portuguese
      { text: 'Merhaba,', lang: 'tr' }, // Turkish
      { text: 'Привет,', lang: 'ru' }, // Russian
    ],
  },
  projects: [
    {
      id: 1,
      title: {
        en: "balikpapan.dev",
        id: "balikpapan.dev",
      },
      desc: {
        en: 'Track every expense, stay under budget, and take control of your finances in minutes. No complexity. No confusion.',
        id: 'Catat setiap pengeluaran, tetap di bawah anggaran, dan kontrol keuanganmu dalam menit. Tidak kompleks. Tidak bingung.',
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
        { en: 'View Website', id: 'Kunjungi Website', link: 'https://duitra.id' },
        { en: 'See on Play Store', id: 'Lihat di Play Store', link: 'https://play.google.com/store/apps/details?id=com.duitra.app' },
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
        en: 'Landing page and web platform designed to connect mentors with students, featuring modern visual hierarchy and structured learning workflows.',
        id: 'Platform web dan halaman arahan yang dirancang untuk menghubungkan mentor dengan siswa, dilengkapi hierarki visual modern dan alur pembelajaran terstruktur.',
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
  ],
  allProjects: [
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
        { en: 'View Website', id: 'Kunjungi Website', link: 'https://duitra.id' },
        { en: 'See on Play Store', id: 'Lihat di Play Store', link: 'https://play.google.com/store/apps/details?id=com.duitra.app' },
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
      media: '/projects/eduwork/ui.webp',
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
  experience: [
    {
      uid: 1,
      title: "PT. Cipta Lima Saudara",
      role: {
        en: "Digital Marketing Specialist (Contract)",
        id: "Spesialis Marketing Digital (Kontrak)"
      },
      dateStart: "2024-11",
      dateEnd: "Present",
      keyWord: [
        { en: 'Digital Marketing', id: 'Pemasaran Digital' },
        { en: 'Graphic Design', id: 'Desain Grafis' },
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'Handle Social Media', id: 'Mengelola Media Sosial' },
        { en: 'Figma', id: 'Figma' },
        { en: 'Meta Ads', id: 'Meta Ads' },
        { en: 'Veo 3', id: 'Veo 3' },
      ],
      jobdesc: {
        en: 'Designed promotional and company profile websites, managed corporate design assets, and developed digital content strategies, including optimizing paid advertising through Meta Ads to boost engagement and conversions.',
        id: 'Merancang website promosi dan profil perusahaan, mengelola aset desain perusahaan, serta mengembangkan strategi konten digital hingga melakukan optimasi iklan berbayar melalui Meta Ads untuk meningkatkan engagement dan konversi.'
      },
    },
    {
      uid: 2,
      title: "PT. Mahakarya Inovasi Bangsa",
      role: {
        en: "UI/UX Designer (Contract)",
        id: "Perancang UI/UX (Kontrak)"
      },
      dateStart: "2024-06",
      dateEnd: "2024-09",
      keyWord: [
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'ERP Website', id: 'Situs ERP' },
        { en: 'Agile', id: 'Agile' },
        { en: 'Figma', id: 'Figma' },
        { en: 'Jira', id: 'Jira' },
      ],
      jobdesc: {
        en: 'Designed and optimized the user interface and user experience (UI/UX) of ERP websites for state-owned enterprises (BUMN) in Balikpapan including PDAM, PLN, and the Environmental Agency with a focus on usability, accessibility, and efficiency.',
        id: 'Merancang dan mengoptimalkan desain antarmuka serta pengalaman pengguna (UI/UX) untuk website ERP milik BUMN di Balikpapan termasuk PDAM, PLN, dan Dinas Lingkungan Hidup dengan fokus pada kegunaan, aksesibilitas, dan efisiensi.'
      },
    },
    {
      uid: 3,
      title: "PT. Talenta Sinergi Group",
      role: {
        en: "UI/UX Designer (Intern)",
        id: "Perancang UI/UX (Magang)"
      },
      dateStart: "2023-06",
      dateEnd: "2023-09",
      keyWord: [
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'Landing Page for Mentor', id: 'Halaman Arahan untuk Mentor' },
        { en: 'Agile', id: 'Agile' },
        { en: 'A/B Testing', id: 'A/B Testing' },
        { en: 'Figma', id: 'Figma' },
        { en: 'Jira', id: 'Jira' },
      ],
      jobdesc: {
        en: "Contributed to the design of the main page for Eduwork's mentor website, and participated in daily brainstorming sessions with other interns to create low-fidelity and high-fidelity designs.",
        id: 'Berkontribusi dalam perancangan halaman utama website mentor milik Eduwork, dan Terlibat dalam sesi brainstorming harian bersama tim magang lain untuk membuat desain low-fi dan hi-fi'
      },
    },
    {
      uid: 4,
      title: "PT. Media Kreasi Abadi",
      role: {
        en: "UI/UX Designer (Intern)",
        id: "Perancang UI/UX (Magang)"
      },
      dateStart: "2022-02",
      dateEnd: "2022-07",
      keyWord: [
        { en: 'UI/UX Design', id: 'Desain UI/UX' },
        { en: 'Familiy-Education Platform', id: 'Platform untuk Edukasi-Keluarga' },
        { en: 'Kanban', id: 'Kanban' },
        { en: 'Design Thinking', id: 'Design Thinking' },
        { en: 'Figma', id: 'Figma' },
        { en: 'Microsoft Planner', id: 'Microsoft Planner' },
        { en: 'Miro', id: 'Miro' },
      ],
      jobdesc: {
        en: 'Experienced in working within an Agile team using the Kanban framework, I contributed to the development of a family education platform called EduFams through a Design Thinking approach. I led the end-to-end UX design process, including problem identification, solution formulation, and crafting both user and business flows. Additionally, I designed and managed comprehensive UI components, covering wireframing, design systems, UI mockups, and responsive, functional prototyping.',
        id: 'Berpengalaman bekerja dalam tim dengan metodologi Agile menggunakan Kanban, saya berkontribusi dalam pengembangan platform edukasi keluarga bernama EduFams menggunakan pendekatan Design Thinking. Dalam proyek ini, saya menangani seluruh proses desain UX mulai dari identifikasi masalah, perumusan solusi, hingga perancangan alur pengguna dan bisnis. Selain itu, saya juga merancang dan mengelola desain UI secara menyeluruh, mencakup wireframing, sistem desain, mockup antarmuka, hingga pembuatan prototipe yang responsif dan fungsional.'
      },
    },
  ],
  footnote: {
    statusText: {
      en: 'Available for freelance & full-time roles',
      id: 'Tersedia untuk proyek freelance & kerja full-time',
    },
    headline: {
      top: 'Your',
      bottom: 'Move',
    },
    subtext: {
      en: "Got a project in mind, a role to fill, or just want to explore ideas together? The deck is shuffled and the move is yours.",
      id: 'Punya ide proyek, posisi yang ingin diisi, atau sekadar ingin berdiskusi bersama? Dek kartu sudah dikocok dan giliran ada di tanganmu.',
    },
    cardAction: {
      en: 'Say hello.',
      id: 'Katakan halo.',
    },
    email: 'salmansetiawan88@gmail.com',
    resumeUrl: '#',
    copyText: {
      copied: 'Copied! ✓',
      copy: 'Copy',
    },
    resumeLabel: {
      en: 'View résumé',
      id: 'Lihat résumé',
    },
    copyright: 'Salman Setiawan © 2026',
    builtWith: {
      en: 'Built with React & Tailwind',
      id: 'Dibangun dengan React & Tailwind',
    },
    badge: {
      en: 'Open to Work',
      id: 'Buka Kesempatan',
    },
    backToTop: {
      en: 'Back to top',
      id: 'Kembali ke atas',
    },
  },
}
