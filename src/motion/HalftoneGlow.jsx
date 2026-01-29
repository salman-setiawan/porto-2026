import React, { useMemo, useState, useEffect } from 'react';

/**
 * HalftoneGlow Component
 * Creates a glow effect with a halftone dot pattern and a radial gradient that is transparent in the center.
 * 
 * @param {string} color - The color of the halftone dots (rgba recommended)
 * @param {string} className - Additional CSS classes for positioning and size
 * @param {string} animation - Tailwind animation class or inline animation style
 */
const HalftoneGlow = ({
  color = "rgba(59, 130, 246, 0.5)",
  className = "",
  animation = "pulse-glow 4s infinite"
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const halftoneStyle = useMemo(() => {
    // Generate Random Halftone Pattern similar to HalftoneEffect.jsx
    const opacities = [1, 0.7, 0.4, 0.2];
    const cellSize = 6;
    // Use smaller grid on mobile for better performance (9 vs 36 gradients)
    const gridSize = isMobile ? 3 : 6;
    const images = [];
    const positions = [];

    // Extract RGBA components to apply random opacities
    // Assuming color is in format rgba(r, g, b, a) or similar
    const colorBase = color.replace(/[\d.]+\)$/g, ''); // "rgba(r, g, b, "

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const opacity = opacities[Math.floor(Math.random() * opacities.length)];
        const dotOpacity = opacity; // Scale down slightly
        images.push(`radial-gradient(${colorBase}${dotOpacity}) 1.5px, transparent 0)`);
        positions.push(`${x * cellSize}px ${y * cellSize}px`);
      }
    }

    return {
      backgroundImage: images.join(','),
      backgroundPosition: positions.join(','),
      backgroundSize: `${cellSize * gridSize}px ${cellSize * gridSize}px`,
      backgroundRepeat: 'repeat',
      // Radial mask: solid in the middle, transparent at the edges
      maskImage: 'radial-gradient(circle, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 80%)',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      // GPU Acceleration
      willChange: 'opacity, mask-size',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      contain: 'strict',
    };
  }, [color, isMobile]);

  return (
    <div
      className={`absolute pointer-events-none z-0 ${className}`}
      style={{
        ...halftoneStyle,
        animation: animation
      }}
    />
  );
};

export default HalftoneGlow;
