// Zero-Latency Web Audio API Water Drop, Crisp Click, and Smooth Motion Whoosh Synthesizer
// Didesain khusus dengan buffer instan di RAM (<1ms)

let audioCtx = null
const bufferCache = new Map()
let clickSoundBuffer = null
let whooshSoundBuffer = null

// 🟢 Konfigurasi volume global (0.0 s/d 1.0)
const SOUND_CONFIG = {
  volume: 0.32,       // Volume untuk efek tetesan air (hover)
  clickVolume: 0.42,  // Volume untuk efek click yang crisp (press/click)
  whooshVolume: 0.16, // Volume untuk efek whoosh gerakan halus (card hover) - dibuat sangat halus & lembut
}

// Preset nada tetesan air untuk masing-masing oktaf
const WATER_OCTAVES = {
  1: { start: 280, peak: 650, end: 480 },
  2: { start: 350, peak: 820, end: 600 },
  3: { start: 440, peak: 1020, end: 750 },
  4: { start: 540, peak: 1240, end: 910 },
  5: { start: 660, peak: 1500, end: 1100 },
  6: { start: 800, peak: 1800, end: 1320 },
}

/**
 * Pre-render waveform tetesan air (water drop physics).
 */
const createWaterDropBuffer = (ctx, config) => {
  const sampleRate = ctx.sampleRate || 44100
  const duration = 0.11
  const length = Math.floor(sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  let phase = 0
  let ripplePhase = 0

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate

    let freq
    if (t < 0.015) {
      freq = config.start + (config.peak - config.start) * Math.sin((t / 0.015) * (Math.PI / 2))
    } else {
      freq = config.end + (config.peak - config.end) * Math.exp(-(t - 0.015) / 0.024)
    }

    phase += (2 * Math.PI * freq) / sampleRate
    ripplePhase += (2 * Math.PI * (freq * 0.5)) / sampleRate

    const attack = Math.min(1, t / 0.003)
    const decay = Math.exp(-t / 0.026)
    const primaryDrop = Math.sin(phase) * attack * decay * 0.85

    const rippleDecay = Math.exp(-t / 0.045)
    const rippleResonance = Math.sin(ripplePhase) * attack * rippleDecay * 0.22

    let fadeOut = 1.0
    const fadeStart = duration - 0.025
    if (t > fadeStart) {
      const progress = (t - fadeStart) / 0.025
      fadeOut = 0.5 * (1 + Math.cos(Math.PI * progress))
    }

    data[i] = (primaryDrop + rippleResonance) * fadeOut
  }

  return buffer
}

/**
 * Pre-render waveform suara click yang renyah dan crisp (tactile switch press).
 */
const createCrispClickBuffer = (ctx) => {
  const sampleRate = ctx.sampleRate || 44100
  const duration = 0.022
  const length = Math.floor(sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  let phase1 = 0
  let phase2 = 0
  let filteredNoise = 0

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate

    const freq1 = 1100 + (3200 - 1100) * Math.exp(-t / 0.003)
    phase1 += (2 * Math.PI * freq1) / sampleRate
    const snap = Math.sin(phase1) * Math.exp(-t / 0.0035) * 0.72

    let rebound = 0
    if (t >= 0.0025) {
      const t2 = t - 0.0025
      const freq2 = 1800 * Math.exp(-t2 / 0.004)
      phase2 += (2 * Math.PI * freq2) / sampleRate
      rebound = Math.sin(phase2) * Math.exp(-t2 / 0.003) * 0.45
    }

    const rawNoise = Math.random() * 2 - 1
    filteredNoise = filteredNoise * 0.5 + rawNoise * 0.5
    const noise = filteredNoise * Math.exp(-t / 0.003) * 0.25

    let fadeOut = 1.0
    if (t > 0.015) {
      fadeOut = 0.5 * (1 + Math.cos(Math.PI * ((t - 0.015) / 0.007)))
    }

    data[i] = (snap + rebound + noise) * fadeOut
  }

  return buffer
}

/**
 * Pre-render waveform suara whoosh lembut (smooth airy swipe).
 */
const createWhooshBuffer = (ctx) => {
  const sampleRate = ctx.sampleRate || 44100
  const duration = 0.22 // 220ms desiran udara yang sangat halus dan melayang
  const length = Math.floor(sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  let filterVal = 0

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    const progress = t / duration

    // S-curve kuadrat kubik: amplop kurva super lembut tanpa hentakan tajam
    const envelope = Math.sin(progress * Math.PI) ** 3

    // Low-pass filter hangat (menghilangkan hiss/desis tajam, hanya desiran angin rendah)
    const cutoffAlpha = 0.02 + 0.06 * Math.sin(progress * Math.PI)
    const rawNoise = Math.random() * 2 - 1
    filterVal = filterVal + cutoffAlpha * (rawNoise - filterVal)

    // Nada udara hangat rendah di latar
    const breezeTone = Math.sin(2 * Math.PI * (110 + 60 * Math.sin(progress * Math.PI)) * t) * 0.15

    data[i] = (filterVal * 0.85 + breezeTone) * envelope * 0.65
  }

  return buffer
}

/**
 * Inisialisasi AudioContext & pre-warm semua buffer agar siap di memory.
 */
const initAudio = () => {
  if (typeof window === 'undefined') return null

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }

  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }

    if (bufferCache.size === 0) {
      for (let oct = 1; oct <= 6; oct++) {
        const config = WATER_OCTAVES[oct] || WATER_OCTAVES[3]
        bufferCache.set(oct, createWaterDropBuffer(audioCtx, config))
      }
    }

    if (!clickSoundBuffer) {
      clickSoundBuffer = createCrispClickBuffer(audioCtx)
    }

    if (!whooshSoundBuffer) {
      whooshSoundBuffer = createWhooshBuffer(audioCtx)
    }
  }

  return audioCtx
}

// 🟢 Pre-warm instan saat kursor pertama kali digerakkan di halaman
if (typeof window !== 'undefined') {
  const warmUp = () => {
    initAudio()
    window.removeEventListener('pointermove', warmUp)
    window.removeEventListener('pointerdown', warmUp)
    window.removeEventListener('touchstart', warmUp)
  }
  window.addEventListener('pointermove', warmUp, { once: true, passive: true })
  window.addEventListener('pointerdown', warmUp, { once: true, passive: true })
  window.addEventListener('touchstart', warmUp, { once: true, passive: true })
}

/**
 * Mainkan suara efek tetesan air (water drop) instan (<1ms) untuk hover.
 */
export const playMechanicalSound = (octave = 3, volume = SOUND_CONFIG.volume) => {
  const ctx = audioCtx || initAudio()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const oct = Math.max(1, Math.min(6, Math.round(octave)))
  let buffer = bufferCache.get(oct)
  if (!buffer) {
    const config = WATER_OCTAVES[oct] || WATER_OCTAVES[3]
    buffer = createWaterDropBuffer(ctx, config)
    bufferCache.set(oct, buffer)
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const gainNode = ctx.createGain()
  const currentVolume = typeof volume === 'number' ? Math.max(0, Math.min(1, volume)) : SOUND_CONFIG.volume
  gainNode.gain.setValueAtTime(currentVolume, ctx.currentTime)

  source.connect(gainNode)
  gainNode.connect(ctx.destination)

  source.start(0)
}

/**
 * Mainkan suara click yang crisp & renyah saat tombol ditekan (press/click).
 */
export const playCrispClick = (volume = SOUND_CONFIG.clickVolume) => {
  const ctx = audioCtx || initAudio()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  if (!clickSoundBuffer) {
    clickSoundBuffer = createCrispClickBuffer(ctx)
  }

  const source = ctx.createBufferSource()
  source.buffer = clickSoundBuffer

  const gainNode = ctx.createGain()
  const currentVolume = typeof volume === 'number' ? Math.max(0, Math.min(1, volume)) : SOUND_CONFIG.clickVolume
  gainNode.gain.setValueAtTime(currentVolume, ctx.currentTime)

  source.connect(gainNode)
  gainNode.connect(ctx.destination)

  source.start(0)
}

/**
 * Mainkan suara whoosh lembut saat card di-hover / scale up.
 */
export const playWhoosh = (volume = SOUND_CONFIG.whooshVolume) => {
  const ctx = audioCtx || initAudio()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  if (!whooshSoundBuffer) {
    whooshSoundBuffer = createWhooshBuffer(ctx)
  }

  const source = ctx.createBufferSource()
  source.buffer = whooshSoundBuffer

  const gainNode = ctx.createGain()
  const currentVolume = typeof volume === 'number' ? Math.max(0, Math.min(1, volume)) : SOUND_CONFIG.whooshVolume
  gainNode.gain.setValueAtTime(currentVolume, ctx.currentTime)

  source.connect(gainNode)
  gainNode.connect(ctx.destination)

  source.start(0)
}
