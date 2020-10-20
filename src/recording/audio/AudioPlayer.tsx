import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as PauseIcon } from '../../assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';
import { getAudioFormat } from '../../shared/utils';
import styles from './AudioPlayer.module.css';
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

function AudioPlayer(props: { data: Blob | null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [percent, setPercent] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const url = (props.data && window.URL.createObjectURL(props.data)) || '';

  useEffect(() => {
    if (!audioRef || !audioRef.current) {
      return;
    }

    const audioProgressStream = fromEvent(audioRef.current, 'timeupdate')
      .pipe(debounceTime(100))
      .subscribe((_event: any) => {
        if (time !== Math.round(_event.target.currentTime)){
          setTime(Math.round(_event.target.currentTime))
          setPercent(Math.round((Math.round(_event.target.currentTime)/duration) * 100));
        }
    });

    audioRef.current.addEventListener("durationchange", (event: any) => {
      setDuration(Math.round(event.target.duration))
    }, false);

    audioRef.current.addEventListener("ended", (_event) => {
      setIsPlaying(false)
    });
    return () => audioProgressStream.unsubscribe();
  })

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
          <div className={`${styles.progress} ${time === 0 ? styles.progressReset : ''}`} style={percentStyle}></div>
        </div>
      </div>
      <div className={styles.timeProgress}>
        <span>{new Date(time * 1000).toISOString().substr(14, 5)}</span>
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