import React, { useEffect, useRef, useState } from 'react';
import { getAudioFormat } from '../shared/utils';
import styles from './AudioPlayer.module.css';

function AudioPlayer(props: { data: Blob | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const url = (props.data && window.URL.createObjectURL(props.data)) || '';

  useEffect(() => {
    if (!audioRef || !audioRef.current) {
      return;
    }

    audioRef.current.addEventListener("playing", (_event: any) => {
      if (!_event || !_event.target || _event.target.duration === undefined) {
        return;
      }

      const duration = _event.target.duration;
      console.log('Supposed duration in seconds:', duration)
      advance(duration, audioRef.current);
    });
    audioRef.current.addEventListener("pause", (_event) => {
      // clearTimeout(timer);
    });
  }, [])

  const toggleIsPlaying = () => {
    if (!audioRef || !audioRef.current) {
      return;
    }

    const { current: audio } = audioRef;
    let nextIsPlaying = !isPlaying;
    if (nextIsPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(nextIsPlaying);
  };

  const advance = (duration: any, element: any) => {
    if (!progressRef || !progressRef.current) {
      return;
    }

    const increment = 10 / duration;
    const percent = Math.min(increment * element.currentTime * 10, 100);
    progressRef.current.style.width = percent + '%'
  }

  const time = '0:00';

  return (
    <div className={styles.player}>
      <div className={styles.progressWrapper}>
        <div className={styles.bar}>
          <div className={styles.progress} ref={progressRef}></div>
        </div>
      </div>
      <div className={styles.timeProgress}>
        <span>{time}</span>
      </div>
      <div onClick={toggleIsPlaying} className={styles.button}>
        <img
          src="play.svg"
          alt="triangle with all three sides equal"
          height="30"
          width="30" />
      </div>
      <audio className={styles.hide} preload="auto" ref={audioRef} onEnded={toggleIsPlaying} >
        <source src={url} type={getAudioFormat()} />
      </audio>
    </div>
  );
}

export default AudioPlayer;