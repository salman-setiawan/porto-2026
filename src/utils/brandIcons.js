// Mapping nama stack / keyword ke file path .svg di folder public/icons/
export const getBrandIconPath = (name) => {
  if (!name) return null
  const clean = String(name).toLowerCase().trim()

  if (clean.includes('typescript')) return '/icons/typescript.svg'
  if (clean.includes('javascript')) return '/icons/javascript.svg'
  if (clean.includes('react')) return '/icons/react.svg'
  if (clean.includes('tailwind')) return '/icons/tailwindcss.svg'
  if (clean.includes('flutter')) return '/icons/flutter.svg'
  if (clean.includes('dart')) return '/icons/dart.svg'
  if (clean.includes('figma')) return '/icons/figma.svg'
  if (clean.includes('firebase')) return '/icons/firebase.svg'

  return null
}

