import React, { useRef } from 'react';
import styles from './AudioPlayer.module.css';
function AudioPlayer(props: { data: Blob | null }) {
  const audioRef = useRef(null);
  // const url = window.URL.createObjectURL(props.data)

  const clickFn = () => {

  }

  const time = '0:00';

  return (
    <div className={styles.player}>
      <div className={styles.progressWrapper}>
        <div className={styles.bar}>
          <div className={styles.progress}></div>
        </div>
      </div>
      <div className={styles.timeProgress}>
        <span>{time}</span>
      </div>
      <div onClick={clickFn} className={styles.button}>
        <img
          src="play.svg"
          alt="triangle with all three sides equal"
          height="30"
          width="30" />
      </div>
    </div>
    // <audio controls preload="auto" ref={audioRef}>
    // <source src={url} type={getAudioFormat()} />
    // </audio>
  );
}

export default AudioPlayer;
