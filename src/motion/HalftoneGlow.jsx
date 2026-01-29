import React, { useMemo } from 'react';

/**
 * HalftoneGlow Component (Optimized)
 * Creates a glow effect with a halftone dot pattern using a single SVG background.
 * 
 * @param {string} color - The color of the halftone dots (rgba recommended)
 * @param {string} className - Additional CSS classes for positioning and size
 * @param {string} animation - CSS animation style string
 */
const HalftoneGlow = ({
  color = "rgba(59, 130, 246, 0.5)",
  className = "",
  animation = "pulse-glow 4s infinite"
}) => {

  const svgBackground = useMemo(() => {
    // Parse the color to extract RGB values
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    const r = rgbaMatch ? rgbaMatch[1] : 59;
    const g = rgbaMatch ? rgbaMatch[2] : 130;
    const b = rgbaMatch ? rgbaMatch[3] : 246;

    // Define opacities for random distribution
    const opacities = [1, 0.7, 0.4, 0.2];
    const cellSize = 6;
    const gridSize = 7; // 7x7 grid = 49 dots

    // Generate dots with random opacities using golden ratio for quasi-random distribution
    const PHI = 1.618033988749895; // Golden ratio
    let circles = '';
    let index = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        // Use golden ratio sequence for truly random-looking pattern
        const randomValue = (index * PHI) % 1; // Fractional part creates quasi-random sequence
        const opacityIndex = Math.floor(randomValue * opacities.length);
        const opacity = opacities[opacityIndex];
        const cx = x * cellSize + cellSize / 2;
        const cy = y * cellSize + cellSize / 2;
        circles += `<circle cx="${cx}" cy="${cy}" r="1.5" fill="rgba(${r},${g},${b},${opacity})"/>`;
        index++;
      }
    }

    const svgSize = cellSize * gridSize;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}">${circles}</svg>`;
    const encodedSvg = encodeURIComponent(svg);

    return {
      backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
      backgroundRepeat: 'repeat',
      // Radial mask: solid in the middle, transparent at the edges
      maskImage: 'radial-gradient(circle, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 80%)',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      // GPU Acceleration
      willChange: 'opacity',
      transform: 'translateZ(0)',
      contain: 'strict',
    };
  }, [color]);

  return (
    <div
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{
        ...svgBackground,
        animation: animation
      }}
    />
  );
};

export default HalftoneGlow;
