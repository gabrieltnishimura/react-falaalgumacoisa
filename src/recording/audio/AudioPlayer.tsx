import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as PauseIcon } from '../../assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';
import { getAudioFormat, timeToDuration } from '../../shared/utils';
import styles from './AudioPlayer.module.css';

function AudioPlayer(props: { data: Blob | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState('0:00');
  const [percent, setPercent] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const url = (props.data && window.URL.createObjectURL(props.data)) || '';

  useEffect(() => {
    if (!audioRef || !audioRef.current) {
      return;
    }
    let timer: NodeJS.Timeout;
    let duration = 0;

    const advance = (duration: any, element: any) => {
      const increment = 10 / duration;
      setPercent(Math.min(increment * element.currentTime * 10, 100));
      setTime(timeToDuration(element.currentTime));
      startTimer(duration, audioRef.current);
    }

    const startTimer = (duration: any, element: any) => {
      if (percent < 100) {
        timer = setTimeout(() => {
          advance(duration, element);
        }, 100);
      } else {
        clearTimeout(timer);
      }
    }

    audioRef.current.addEventListener("durationchange", (event: any) => {
      duration = event.target.duration
    }, false);

    audioRef.current.addEventListener("playing", (_event: any) => {
      if (!_event || !_event.target) {
        return;
      }

      advance(duration, audioRef.current);
    });

    audioRef.current.addEventListener("pause", (_event) => {
      clearTimeout(timer);
    });
  }, [percent]);

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

  const percentStyle = {
    width: percent + '%',
  }

  return (
    <div className={styles.player}>
      <div className={styles.progressWrapper}>
        <div className={styles.bar}>
          <div className={styles.progress} style={percentStyle}></div>
        </div>
      </div>
      <div className={styles.timeProgress}>
        <span>{time}</span>
      </div>
      <div onClick={toggleIsPlaying} className={styles.button}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </div>
      <audio className={styles.hide} preload="auto" ref={audioRef} onEnded={toggleIsPlaying} >
        <source src={url} type={getAudioFormat()} />
      </audio>
    </div>
  );
}

export default AudioPlayer;