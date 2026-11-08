// Palet warna terkurasi berdasarkan teori harmoni warna (Analogous & Tonal Harmony)
export const HARMONIOUS_PALETTES = [
  {
    // 1. Deep Cyber Sapphire (Blue -> Cyan glow)
    baseHue: 228,
    bg: '#0a0f1d',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.45) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(14, 116, 144, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.4) 90deg, rgba(59, 130, 246, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 2. Deep Aurora Emerald (Green -> Mint/Teal glow)
    baseHue: 158,
    bg: '#081712',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(13, 148, 136, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(20, 184, 166, 0.4) 90deg, rgba(52, 211, 153, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 3. Royal Velvet Amethyst (Violet -> Fuchsia glow)
    baseHue: 276,
    bg: '#140b1d',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(192, 38, 211, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(217, 70, 239, 0.4) 90deg, rgba(168, 85, 247, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 4. Sunset Bronze & Amber (Warm Amber -> Gold glow)
    baseHue: 32,
    bg: '#1b1207',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(234, 88, 12, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(245, 158, 11, 0.4) 90deg, rgba(251, 191, 36, 0.65) 180deg, transparent 270deg)',
  },
  {
    // 5. Deep Ruby Crimson (Crimson -> Rose Coral glow)
    baseHue: 345,
    bg: '#1a0910',
    ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(225, 29, 72, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.25) 0%, transparent 55%)',
    conicLight: 'conic-gradient(from 0deg, transparent 0deg, rgba(251, 113, 133, 0.4) 90deg, rgba(244, 63, 94, 0.65) 180deg, transparent 270deg)',
  },
]

