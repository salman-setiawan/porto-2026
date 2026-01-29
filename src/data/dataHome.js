export const DataHome = {
  heroSection: {
    title: "Hi, I'm Salman!",
    desc: {
      en: 'A graduate with a degree in informatics, specializing in UI/UX Design, and the man behind Aevenic Studio.',
      id: 'Seorang lulusan sarjana informatika, dengan spesialisasi UI/UX Design dan pria dibalik Aevenic Studio.',
    },
    cta: [
      { label: 'Instagram', link: 'https://instagram.com/eisenflux' },
      { label: 'LinkedIn', link: 'https://linkedin.com/in/salman-setiawan' },
      { label: 'GitHub', link: 'https://github.com/salman-setiawan' },
    ],
  },
  projects: [
    {
      id: 1,
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
      cta: [
        { en: 'View Website', id: 'Kunjungi Website', link: 'https://duitra.id' },
        { en: 'See on Play Store', id: 'Lihat di Play Store', link: 'https://play.google.com/store/apps/details?id=com.duitra.app' },
      ],
      media: {
        mobile: "/project-1/heroimg_mobile.webp",
        desktop: "/project-1/heroimg_desktop.webp",
        ornaments: [
          {
            type: 'savings',
            icon: 'savings',
            label: 'Monthly Savings',
            value: '+$1,250.00',
            position: 'absolute top-12 left-4 z-30',
            animation: 'float-slow 6s ease-in-out infinite'
          },
          {
            type: 'spending',
            icon: 'payments',
            label: 'Today Spending',
            value: '-$450.00',
            position: 'absolute top-36 right-4 z-30',
            animation: 'float-slow 5s ease-in-out infinite 0.5s'
          },
          {
            type: 'transactions',
            icon: 'account_balance_wallet',
            label: 'Monthly Budget',
            value: 'Safe',
            position: 'absolute bottom-16 left-10 md:bottom-28 z-30',
            animation: 'float-slow 8s ease-in-out infinite 1s'
          }
        ]
      }
    },
    {
      id: 2,
      title: {
        en: "Bhumi Pemedas Website",
        id: "Website Bhumi Pemedas",
      },
      desc: {
        en: 'a website for Bhumi Pemedas Housing, focused on creating engaging promotional and sales pages that highlight the benefits of living in this seaside residential area.',
        id: 'Website untuk Bhumi Pemedas Housing, fokus pada membuat halaman promosi dan penjualan yang menarik yang menyoroti manfaat dari tinggal di area perumahan yang berada di sekitar pantai.',
      },
      tag: [
        { en: 'Product Design', id: 'Desain Produk' },
        { en: 'Mobile App', id: 'Aplikasi Mobile' },
      ],
      cta: [
        { en: 'View Website', id: 'Kunjungi Website', link: 'https://duitra.id' },
      ],
      media: {
        mobile: "/project-1/heroimg_mobile.webp",
        desktop: "/project-1/heroimg_desktop.webp"
      }
    },
    {
      id: 3,
      title: {
        en: "Another Day in the Island",
        id: "Another Day in the Island",
      },
      desc: {
        en: "simple yet challenging arcade survival game that I designed as my final project for my bachelor's degree.",
        id: "Game arcade survival yang simpel namun menantang yang saya desain sebagai proyek akhir sarjana saya.",
      },
      tag: [
        { en: 'Game Design', id: 'Desain Game' },
        { en: 'Game Development', id: 'Pengembangan Game' },
      ],
      cta: [
        { en: 'View Project', id: 'Lihat Proyek', link: '#' },
      ],
      media: {
        mobile: "/project-1/heroimg_mobile.webp",
        desktop: "/project-1/heroimg_desktop.webp"
      }
    }
  ],
}
