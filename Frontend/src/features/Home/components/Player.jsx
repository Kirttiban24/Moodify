import { useContext, useEffect, useState } from 'react'
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from 'react-icons/fa'
import { useSong } from '../hooks/useSong'
import './Player.scss'

const Player = () => {
  const { song, audioRef } = useSong()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [playbackRate, setPlaybackRate] = useState(1)

  const hasSong = Boolean(song?.url)

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [song?.url])

  function formatTime(time) {
    if (!Number.isFinite(time)) return '0:00'

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  async function togglePlayback() {
    if (!hasSong || !audioRef.current) return

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        setIsPlaying(false)
        console.error('Unable to play the selected song.', error)
      }
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  function seekBy(seconds) {
    if (!audioRef.current) return

    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.currentTime + seconds, duration)
    )
  }

  function handleProgressChange(event) {
    const time = Number(event.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  function handleVolumeChange(event) {
    const nextVolume = Number(event.target.value)
    if (audioRef.current) audioRef.current.volume = nextVolume
    setVolume(nextVolume)
  }

  function handleSpeedChange(event) {
    const nextRate = Number(event.target.value)
    if (audioRef.current) audioRef.current.playbackRate = nextRate
    setPlaybackRate(nextRate)
  }

  return (
    <section className="player" aria-label="Music player">
      <audio
        ref={audioRef}
        src={song?.url}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player__details">
        <img
          className="player__cover"
          src={song?.posterUrl || '/favicon.svg'}
          alt={song?.title ? `${song.title} cover` : ''}
        />
        <div className="player__track">
          <strong>{song?.title || 'No song selected'}</strong>
          <span>{song?.mood || 'Select a mood to find music'}</span>
        </div>
      </div>

      <div className="player__main">
        <div className="player__controls">
          <button type="button" title="Back 5 seconds" onClick={() => seekBy(-5)} disabled={!hasSong}>
            <FaBackward aria-hidden="true" />
            <span>5</span>
          </button>
          <button className="player__play" type="button" title={isPlaying ? 'Pause' : 'Play'} onClick={togglePlayback} disabled={!hasSong}>
            {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
          </button>
          <button type="button" title="Forward 5 seconds" onClick={() => seekBy(5)} disabled={!hasSong}>
            <FaForward aria-hidden="true" />
            <span>5</span>
          </button>
        </div>

        <div className="player__timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            aria-label="Song progress"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleProgressChange}
            disabled={!hasSong}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player__settings">
        <button type="button" title={volume === 0 ? 'Unmute' : 'Mute'} onClick={() => handleVolumeChange({ target: { value: volume === 0 ? 0.8 : 0 } })} disabled={!hasSong}>
          {volume === 0 ? <FaVolumeMute aria-hidden="true" /> : <FaVolumeUp aria-hidden="true" />}
        </button>
        <input aria-label="Volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} disabled={!hasSong} />
        <label>
          <span className="sr-only">Playback speed</span>
          <select value={playbackRate} onChange={handleSpeedChange} disabled={!hasSong}>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </label>
      </div>
    </section>
  )
}

export default Player
