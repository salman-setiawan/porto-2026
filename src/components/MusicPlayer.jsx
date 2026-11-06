import React, { useState, useRef, useEffect } from 'react'
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

    // 1. Coba langsung auto-start bersuara (unmuted) begitu dibuka/refresh
    const tryAutoPlay = () => {
      audio.muted = false
      audio.volume = DEFAULT_BG_VOLUME

      audio.play().then(() => {
        setIsPlaying(true)
        setIsMuted(false)
      }).catch(() => {
        // Browser memblokir audio bersuara tanpa gesture.
        // Solusi: Start audio berjalan langsung dengan fade volume dari 0 ke target
        // tanpa mengubah state tombol menjadi 'Muted' (status tetap aktif/unmuted).
        audio.volume = 0
        audio.play().then(() => {
          setIsPlaying(true)
          setIsMuted(false)

          // Begitu kursor digerakkan/diklik/discroll, kembalikan volume normal seketika
          const restoreVolume = () => {
            audio.volume = DEFAULT_BG_VOLUME
              ;['mousemove', 'click', 'scroll', 'touchstart', 'keydown'].forEach((evt) =>
                window.removeEventListener(evt, restoreVolume)
              )
          }

            ;['mousemove', 'click', 'scroll', 'touchstart', 'keydown'].forEach((evt) =>
              window.addEventListener(evt, restoreVolume, { once: true, passive: true })
            )
        }).catch(() => {
          const forcePlay = () => {
            audio.volume = DEFAULT_BG_VOLUME
            audio.play().then(() => {
              setIsPlaying(true)
              setIsMuted(false)
            }).catch(() => { })

              ;['mousemove', 'click', 'scroll', 'touchstart', 'keydown'].forEach((evt) =>
                window.removeEventListener(evt, forcePlay)
              )
          }

            ;['mousemove', 'click', 'scroll', 'touchstart', 'keydown'].forEach((evt) =>
              window.addEventListener(evt, forcePlay, { once: true, passive: true })
            )
        })
      })
    }

    tryAutoPlay()

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', setAudioDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlayState)
      audio.removeEventListener('pause', handlePauseState)
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
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

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
          className="relative w-12 h-12 rounded-full bg-[#1b1b1b]/90 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/90 shadow-2xl active:scale-95 transition-all cursor-pointer"
          aria-label="Open Audio Player"
        >
          {isPlaying && !isMuted ? (
            /* Equalizer wave animasi saat audio bersuara */
            <div className="flex items-end gap-[2px] h-4 mt-1.5">
              <span className="w-1 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms] h-full" />
              <span className="w-1 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
              <span className="w-1 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms] h-full" />
            </div>
          ) : (
            /* Speaker Mute Icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}

          {/* Indicator dot status */}
          <span
            className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-[#141414] ${isPlaying && !isMuted ? 'bg-green-400 animate-pulse' : 'bg-red-400/80'
              }`}
          />
        </button>
      </div>

      {/* ── Floating Bar Mini Player Panel (Desktop selalu ada, Mobile Slide in/out dari kanan) ── */}
      <div
        className={`
          flex items-center gap-3 pl-3 pr-1.5 py-1.5 rounded-lg
          bg-[#181818]/90 border border-white/10 backdrop-blur-xl
          shadow-[0_8px_32px_rgba(0,0,0,0.65)]
          transition-all duration-300 ease-out
          ${
          /* Di desktop selalu tampil normal */
          'md:opacity-100 md:translate-x-0 md:pointer-events-auto ' +
          /* Di mobile slide in/out */
          (isOpenMobile
            ? 'opacity-100 translate-x-0 pointer-events-auto scale-100'
            : 'max-md:opacity-0 max-md:translate-x-12 max-md:pointer-events-none max-md:absolute max-md:bottom-0 max-md:right-0 max-md:scale-95')
          }
        `}
      >
        {/* Info Lagu & Progress Slider */}
        <div className="flex flex-col gap-1 w-44 md:w-48">
          <div className="flex items-center justify-between text-[11px] leading-tight">
            <span className="font-medium text-white/90 truncate tracking-tight">
              just chillin
            </span>
            <span className="text-[10px] text-white/40">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Interactive Progress Bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative overflow-hidden group/bar"
          >
            <div
              className={`h-full rounded-full transition-all duration-100 ${isMuted
                ? 'bg-white/30'
                : 'bg-gradient-to-r from-blue-500 to-sky-400'
                }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tombol Mute / Unmute */}
        <button
          onClick={toggleMute}
          onMouseEnter={() => playMechanicalSound(3)}
          className={`
            p-2 rounded-lg border flex items-center gap-1.5 text-[12px] font-medium
            cursor-pointer active:scale-95 transition-all shrink-0
            ${isMuted
              ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-300'
              : 'bg-white/5 hover:bg-white/15 border-white/10 text-white/80 hover:text-white'
            }
          `}
          title={isMuted ? 'Unmute BGM' : 'Mute BGM'}
        >
          {isMuted ? (
            /* Icon Speaker Muted */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Icon Speaker Active */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>

        {/* Mobile Close Button: Menyembunyikan floating bar dan memunculkan kembali toggle button */}
        <button
          onClick={() => {
            playCrispClick()
            setIsOpenMobile(false)
          }}
          className="md:hidden p-1.5 text-white/40 hover:text-white text-xs cursor-pointer active:scale-95 transition-colors"
          title="Minimize player"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
