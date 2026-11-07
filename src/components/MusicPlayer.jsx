import { useState, useRef, useEffect } from 'react'
import { playMechanicalSound, playCrispClick } from '../utils/sound'

// ── PENGATURAN VOLUME LATAR (0.0 s/d 1.0) ──
// Ubah angka di bawah ini untuk mengatur volume suara musik latar:
const DEFAULT_BG_VOLUME = 0.1 // ATUR VOLUME DISINI

const MusicPlayer = () => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  const audioSrc = encodeURI('/just chillin - enfx.mp3')

  // Inisialisasi audio & setup autoplay user-gesture
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = DEFAULT_BG_VOLUME

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const setAudioDuration = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      audio.currentTime = 0
      audio.play().catch(() => setIsPlaying(false))
    }

    const handlePlayState = () => setIsPlaying(true)
    const handlePauseState = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', setAudioDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlayState)
    audio.addEventListener('pause', handlePauseState)

    // Mulai musik saat user melakukan klik pertama pada objek atau latar manapun di halaman
    let hasTriggered = false
    const CLICK_EVENTS = ['click', 'pointerdown', 'touchstart']

    const triggerPlayOnInteraction = () => {
      if (hasTriggered) return
      hasTriggered = true

      audio.muted = false
      audio.volume = DEFAULT_BG_VOLUME

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsMuted(false)
            cleanupListeners()
          })
          .catch(() => {
            // Jika browser memblokir, reset flag agar klik/tap berikutnya mencoba lagi
            hasTriggered = false
          })
      }
    }

    const cleanupListeners = () => {
      CLICK_EVENTS.forEach((evt) => {
        document.removeEventListener(evt, triggerPlayOnInteraction, true)
      })
    }

    CLICK_EVENTS.forEach((evt) => {
      document.addEventListener(evt, triggerPlayOnInteraction, { passive: true, capture: true })
    })

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', setAudioDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlayState)
      audio.removeEventListener('pause', handlePauseState)
      cleanupListeners()
    }
  }, [])

  // Efek toggle mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
      audioRef.current.volume = isMuted ? 0 : DEFAULT_BG_VOLUME
    }
  }, [isMuted])

  const toggleMute = () => {
    playCrispClick()
    // Jika audio sedang pause (karena autoplay browser belum jalan), nyalakan sekaligus
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => { })
    }
    setIsMuted((prev) => !prev)
  }

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width))
    audioRef.current.currentTime = newProgress * duration
    setProgress(newProgress * 100)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <audio ref={audioRef} src={audioSrc} loop preload="none" />

      {/* ── Mobile Circular Toggle Button (Slide out ke kanan saat dibuka) ── */}
      <div
        className={`md:hidden flex justify-end transition-all duration-300 ease-out ${isOpenMobile
          ? 'opacity-0 scale-75 translate-x-12 pointer-events-none absolute bottom-0 right-0'
          : 'opacity-100 scale-100 translate-x-0 relative'
          }`}
      >
        <button
          onClick={() => {
            playCrispClick()
            setIsOpenMobile(true)
          }}
          onMouseEnter={() => playMechanicalSound(3)}
          className="relative w-12 h-12 rounded-full bg-app-surface border border-app-subtle backdrop-blur-md flex items-center justify-center text-app-primary shadow-2xl active:scale-95 transition-all cursor-pointer"
          aria-label="Open Audio Player"
        >
          {isPlaying && !isMuted ? (
            <img src="/icons/audio-active.svg" alt="Active" className="w-4 h-4 object-contain theme-icon-filter" />
          ) : (
            <img src="/icons/audio-muted.svg" alt="Muted" className="w-4 h-4 object-contain theme-icon-filter" />
          )}

          {/* Indicator dot status */}
          <span
            className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-app-primary ${isPlaying && !isMuted ? 'bg-orange-500 animate-pulse' : 'bg-app-muted'}`}
          />
        </button>
      </div>

      {/* ── Floating Bar Mini Player Panel ── */}
      <div
        className={`
          rounded bg-app-surface/90 border border-app-subtle backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out
          ${'md:opacity-100 md:translate-x-0 md:pointer-events-auto ' +
          (isOpenMobile ? 'opacity-100 translate-x-0 pointer-events-auto scale-100' : 'max-md:opacity-0 max-md:translate-x-12 max-md:pointer-events-none max-md:absolute max-md:bottom-0 max-md:right-0 max-md:scale-95')
          }
        `}
      >
        <div className="flex items-center gap-4 pl-3 pr-1.5 py-1.5">

          {/* Info Lagu */}
          <div className="flex items-center justify-between text-[12px] w-44 md:w-48">
            <span className="font-medium text-app-primary truncate">
              just chillin - enfx
            </span>
            <span className="text-app-muted tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Tombol Mute / Unmute */}
          <div className="flex">
            <button
              onClick={toggleMute}
              onMouseEnter={() => playMechanicalSound(3)}
              className={`
                p-1 rounded flex items-center gap-1.5 text-[12px] font-medium
                cursor-pointer active:scale-95 transition-all shrink-0 w-[24px] justify-center
                ${isMuted ? 'bg-orange-500/15 hover:bg-orange-500/25 text-orange-400' : 'hover:bg-app-surface-elevated text-app-secondary hover:text-app-primary'}
              `}
            >
              {isMuted ? (
                /* Icon Speaker Muted */
                <img src="/icons/audio-muted.svg" alt="Muted" className="w-3.5 h-3.5 object-contain theme-icon-filter" />
              ) : (
                /* Icon Speaker Active */
                <img src="/icons/audio-active.svg" alt="Active" className="w-3.5 h-3.5 object-contain theme-icon-filter" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => { playCrispClick(), setIsOpenMobile(false) }}
              className="md:hidden p-1 text-app-muted hover:text-app-primary text-xs cursor-pointer active:scale-95 transition-colors hover:bg-app-surface-elevated rounded w-[24px] justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Interactive Progress Bar */}
        <div
          onClick={handleSeek}
          className="w-full h-0.5 bg-app-surface-elevated cursor-pointer relative overflow-hidden group/bar"
        >
          <div
            className={`h-full transition-all duration-100 ${isMuted ? 'bg-app-muted' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
