import React from 'react';
import ReactPlayer from 'react-player';
import styles from './AudioPlayer.module.css';

function AudioPlayer(props: any) {
  return (
    <ReactPlayer className={styles.player}
      url={props.url}
      playing={true}
    />
  );
}

export default AudioPlayer;
