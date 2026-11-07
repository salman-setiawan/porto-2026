import React, { useRef, useEffect } from 'react'

/**
 * PixelFlare Component (Animated Pixel Dither Flame Flare)
 *
 * Merender flame flare menggunakan direct pixel buffer 32-bit
 * (Uint8Array + putImageData) — sangat cepat & tajam.
 *
 * @param {number} speed - Kecepatan gelombang animasi (default: 1.0)
 * @param {string|number} intensity - Intensitas cahaya ('vibrant' | 'medium' | 'subtle' atau number)
 */
const PixelFlare = ({
  className = '',
  speed = 1.0,
  intensity = 'vibrant',
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Normalisasi intensity
    let numIntensity = 1.35
    if (typeof intensity === 'string') {
      if (intensity === 'vibrant') numIntensity = 1.55
      else if (intensity === 'subtle') numIntensity = 0.9
      else numIntensity = 1.25
    } else if (typeof intensity === 'number') {
      numIntensity = intensity
    }

    // Palet warna membara: Hitam -> Merah Tua -> Crimson -> Oranye Api (Evil Buttons) -> Kuning Emas
    const COLOR_STOPS = [
      { t: 0.00, r: 16,  g: 5,   b: 3 },
      { t: 0.18, r: 95,  g: 18,  b: 8 },
      { t: 0.45, r: 195, g: 38,  b: 8 },
      { t: 0.72, r: 255, g: 85,  b: 8 },
      { t: 0.88, r: 255, g: 145, b: 24 },
      { t: 1.00, r: 255, g: 215, b: 70 },
    ]

    // Pre-computed RGB palette (256 levels)
    const PALETTE_R = new Uint8Array(256)
    const PALETTE_G = new Uint8Array(256)
    const PALETTE_B = new Uint8Array(256)

    for (let i = 0; i < 256; i++) {
      const t = i / 255
      let seg = 0
      for (let s = 0; s < COLOR_STOPS.length - 1; s++) {
        if (t >= COLOR_STOPS[s].t && t <= COLOR_STOPS[s + 1].t) {
          seg = s
          break
        }
      }
      const c1 = COLOR_STOPS[seg]
      const c2 = COLOR_STOPS[seg + 1]
      const f = (t - c1.t) / (c2.t - c1.t || 1)

      PALETTE_R[i] = Math.floor(c1.r + f * (c2.r - c1.r))
      PALETTE_G[i] = Math.floor(c1.g + f * (c2.g - c1.g))
      PALETTE_B[i] = Math.floor(c1.b + f * (c2.b - c1.b))
    }

    // Bayer 4x4 Dither Matrix
    const BAYER = [
      0 / 16,  8 / 16,  2 / 16, 10 / 16,
      12 / 16, 4 / 16, 14 / 16,  6 / 16,
      3 / 16, 11 / 16,  1 / 16,  9 / 16,
      15 / 16, 7 / 16, 13 / 16,  5 / 16,
    ]

    // Resolusi internal canvas — lebih besar = pixel dots lebih kecil & halus
    const W = 320
    const H = 200

    canvas.width = W
    canvas.height = H

    let isVisible = true
    let animationFrameId
    let time = 0

    // ── MODE PIXEL: Render Pixel Buffer 32-bit (Paling Ringan) ──
    const render = () => {
      if (!isVisible) return

      time += 0.03 * speed

      const imgData = ctx.createImageData(W, H)
      const data = imgData.data
      let pIdx = 0

      for (let y = 0; y < H; y++) {
        const v = y / H
        const bayerRow = (y & 3) << 2

        for (let x = 0; x < W; x++) {
          const u = x / W

          const w1 = Math.sin(u * 3.4 + v * 2.8 - time * 0.95)
          const w2 = Math.sin(Math.sqrt((u - 0.35) * (u - 0.35) + (v - 0.75) * (v - 0.75)) * 4.8 - time * 0.75)
          const w3 = Math.sin((u * 2.2 - v * 2.5) * 2.4 + time * 0.6)

          let val = (w1 + w2 + w3 + 3.0) / 6.0
          const bias = (1.15 - u * 0.55) * (0.35 + v * 0.8)
          let lum = Math.pow(val * bias * numIntensity, 1.3)

          const dither = BAYER[bayerRow | (x & 3)] - 0.5
          lum = lum + dither * 0.16

          if (lum < 0) lum = 0
          else if (lum > 1) lum = 1

          const colIdx = Math.floor(lum * 255)
          data[pIdx]     = PALETTE_R[colIdx]
          data[pIdx + 1] = PALETTE_G[colIdx]
          data[pIdx + 2] = PALETTE_B[colIdx]
          data[pIdx + 3] = 255

          pIdx += 4
        }
      }

      ctx.putImageData(imgData, 0, 0)
      animationFrameId = requestAnimationFrame(render)
    }

    // Auto-Pause dengan IntersectionObserver jika keluar dari layar
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
          if (isVisible) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(render)
          } else {
            cancelAnimationFrame(animationFrameId)
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(canvas)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed, intensity])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0a0302] ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}

export default PixelFlare
