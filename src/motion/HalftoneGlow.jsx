import { useMemo, useEffect, useState } from 'react';

/**
 * HalftoneGlow Component (Theme-Aware)
 * Creates a glow effect with a halftone dot pattern using a single SVG background.
 * Automatically boosts visibility in light mode.
 *
 * @param {string} color - The color of the halftone dots (rgba recommended)
 * @param {string} className - Additional CSS classes for positioning and size
 * @param {string} animation - CSS animation style string
 */
const HalftoneGlow = ({ color, className, animation }) => {
  const [isLight, setIsLight] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'light'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const svgBackground = useMemo(() => {
    // Parse the color to extract RGB values
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    const r = rgbaMatch ? rgbaMatch[1] : 59;
    const g = rgbaMatch ? rgbaMatch[2] : 130;
    const b = rgbaMatch ? rgbaMatch[3] : 246;

    // Same dot values for both modes — only blend mode & mask differ
    const opacities = [1, 0.8, 0.5, 0.3];
    const dotRadius = 1.5;
    const cellSize = 6;
    const gridSize = 7; // 7x7 grid = 49 dots

    // Generate dots with golden-ratio quasi-random distribution
    const PHI = 1.618033988749895;
    let circles = '';
    let index = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const randomValue = (index * PHI) % 1;
        const opacityIndex = Math.floor(randomValue * opacities.length);
        const opacity = opacities[opacityIndex];
        const cx = x * cellSize + cellSize / 2;
        const cy = y * cellSize + cellSize / 2;
        circles += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="rgba(${r},${g},${b},${opacity})"/>`;
        index++;
      }
    }

    const svgSize = cellSize * gridSize;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}">${circles}</svg>`;
    const encodedSvg = encodeURIComponent(svg);

    // Light mode: wider mask + stronger center presence
    const maskGradient = isLight
      ? 'radial-gradient(circle, black 20%, transparent 65%)'
      : 'radial-gradient(circle, black 10%, transparent 60%)';

    return {
      backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
      backgroundRepeat: 'repeat',
      maskImage: maskGradient,
      WebkitMaskImage: maskGradient,
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center calc(50% + 20px)',
      WebkitMaskPosition: 'center calc(50% + 20px)',
      // Light mode: multiply blend so dots darken the bright background
      mixBlendMode: isLight ? 'multiply' : 'normal',
      // GPU Acceleration
      willChange: 'opacity',
      transform: 'translateZ(0)',
      contain: 'strict',
    };
  }, [color, isLight]);

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
