import React, { useEffect, useRef } from 'react'

/**
 * Super lightweight Underwater 3D Fluid Blobs Background.
 * - Organic 3D Fluid Blobs with bioluminescent gradients & fluid wobble
 * - Rising micro-bubbles with sinuous underwater drift
 * - Interactive 3D mouse parallax
 * - 0 external dependencies (~2.2 KB)
 */
const Background3D = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId
    let isVisible = true

    // Mouse tracking for fluid inertia
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize handling with DPR capping
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let time = 0

    // Organic 3D Blobs configuration (Bioluminescent deep sea fluid spheres)
    const blobs = [
      {
        baseX: -0.28,
        baseY: -0.25,
        radius: 210,
        speed: 0.65,
        seed: 1.2,
        colorInner: 'rgba(56, 189, 248, 0.45)', // Radiant Cyan
        colorOuter: 'rgba(37, 99, 235, 0.22)', // Royal Blue
        glowColor: '#38bdf8',
        driftRange: 60,
      },
      {
        baseX: 0.32,
        baseY: 0.15,
        radius: 230,
        speed: 0.5,
        seed: 3.4,
        colorInner: 'rgba(45, 212, 191, 0.42)', // Aqua Turquoise
        colorOuter: 'rgba(30, 64, 175, 0.20)', // Deep Marine Blue
        glowColor: '#2dd4bf',
        driftRange: 65,
      },
      {
        baseX: -0.18,
        baseY: 0.38,
        radius: 175,
        speed: 0.85,
        seed: 5.6,
        colorInner: 'rgba(96, 165, 250, 0.38)', // Sky Blue
        colorOuter: 'rgba(14, 116, 144, 0.18)', // Deep Teal
        glowColor: '#60a5fa',
        driftRange: 50,
      },
      {
        baseX: 0.22,
        baseY: -0.32,
        radius: 160,
        speed: 0.75,
        seed: 7.8,
        colorInner: 'rgba(34, 211, 238, 0.40)', // Electric Cyan
        colorOuter: 'rgba(29, 78, 216, 0.18)',
        glowColor: '#22d3ee',
        driftRange: 55,
      },
      {
        baseX: 0.0,
        baseY: 0.02,
        radius: 140,
        speed: 0.6,
        seed: 9.1,
        colorInner: 'rgba(125, 211, 252, 0.35)', // Soft Ice Blue
        colorOuter: 'rgba(3, 105, 161, 0.15)',
        glowColor: '#7dd3fc',
        driftRange: 40,
      },
    ]

    // Underwater micro-bubbles (buoyant rising particles)
    const bubbleCount = 38
    const bubbles = Array.from({ length: bubbleCount }, () => ({
      x: Math.random() * (window.innerWidth || 1000),
      y: Math.random() * (window.innerHeight || 800),
      speed: Math.random() * 0.75 + 0.35,
      radius: Math.random() * 3 + 1.2,
      wobbleSpeed: Math.random() * 2 + 1,
      wobbleOffset: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.45 + 0.25,
    }))

    // Helper: Draw organic squishy 3D fluid blob
    const drawOrganicBlob = (cx, cy, radius, t, seed, innerColor, outerColor, glowColor) => {
      const steps = 36
      const angleStep = (Math.PI * 2) / steps
      const pts = []

      for (let i = 0; i < steps; i++) {
        const angle = i * angleStep
        // Multiple harmonic frequencies for fluid underwater wobble
        const wobble =
          Math.sin(angle * 3 + t * 1.3 + seed) * 0.14 +
          Math.cos(angle * 4 - t * 0.9 + seed * 1.5) * 0.10 +
          Math.sin(angle * 2 + t * 0.6) * 0.08

        const r = radius * (1 + wobble)
        pts.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        })
      }

      ctx.save()
      ctx.beginPath()
      ctx.moveTo((pts[0].x + pts[steps - 1].x) / 2, (pts[0].y + pts[steps - 1].y) / 2)

      for (let i = 0; i < steps; i++) {
        const next = pts[(i + 1) % steps]
        const midX = (pts[i].x + next.x) / 2
        const midY = (pts[i].y + next.y) / 2
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY)
      }
      ctx.closePath()

      // 3D Spherical lighting gradient (specular reflection inside liquid)
      const grad = ctx.createRadialGradient(
        cx - radius * 0.28,
        cy - radius * 0.28,
        radius * 0.05,
        cx,
        cy,
        radius * 1.12
      )
      grad.addColorStop(0, innerColor)
      grad.addColorStop(0.55, outerColor)
      grad.addColorStop(1, 'rgba(4, 16, 38, 0)')

      ctx.fillStyle = grad
      ctx.shadowColor = glowColor
      ctx.shadowBlur = radius * 0.4
      ctx.fill()
      ctx.restore()
    }

    // Render loop
    const render = () => {
      animationFrameId = requestAnimationFrame(render)
      if (!isVisible) return

      time += 0.01

      // Mouse smooth interpolation
      mouseX += (targetMouseX - mouseX) * 0.04
      mouseY += (targetMouseY - mouseY) * 0.04

      ctx.clearRect(0, 0, width, height)

      const screenCenterX = width / 2
      const screenCenterY = height / 2

      // 1. Render 3D Floating Bioluminescent Blobs
      for (let b of blobs) {
        const driftX = Math.sin(time * b.speed + b.seed) * b.driftRange
        const driftY = Math.cos(time * b.speed * 0.85 + b.seed) * b.driftRange
        const bx = screenCenterX + b.baseX * width + driftX + mouseX * 55
        const by = screenCenterY + b.baseY * height + driftY + mouseY * 45

        drawOrganicBlob(
          bx,
          by,
          b.radius,
          time * b.speed,
          b.seed,
          b.colorInner,
          b.colorOuter,
          b.glowColor
        )
      }

      // 2. Render Rising Underwater Micro-Bubbles
      ctx.shadowBlur = 5
      ctx.shadowColor = '#67e8f9'

      for (let b of bubbles) {
        b.y -= b.speed
        if (b.y < -20) {
          b.y = height + 20
          b.x = Math.random() * width
        }

        // Sinuous underwater sway
        const swayX = b.x + Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * 14 + mouseX * 25
        const bubbleY = b.y + mouseY * 20

        // Bubble body
        ctx.beginPath()
        ctx.arc(swayX, bubbleY, b.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186, 230, 253, ${b.alpha})`
        ctx.fill()

        // Tiny specular highlight inside bubble
        ctx.beginPath()
        ctx.arc(swayX - b.radius * 0.3, bubbleY - b.radius * 0.3, b.radius * 0.32, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 1.3})`
        ctx.fill()
      }

      ctx.shadowBlur = 0
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030712]">
      {/* 🟢 Deep Ocean Caustic Water Light Radial Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.20) 0%, rgba(30, 58, 138, 0.26) 45%, rgba(3, 7, 18, 0.85) 85%, #030712 100%)',
        }}
      />

      {/* 3D Underwater Ocean Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Soft Vignette Mask */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 50%, rgba(3, 7, 18, 0.4) 80%, #030712 98%)',
        }}
      />
    </div>
  )
}

export default Background3D
