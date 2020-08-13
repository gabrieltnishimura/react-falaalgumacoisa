import React from 'react';
import ReactPlayer from 'react-player';
import styles from './AudioPlayer.module.css';

function AudioPlayer(props: { data: Blob }) {
  const url = window.URL.createObjectURL(props.data)
  return (
    <ReactPlayer className={styles.player}
      url={url}
      playing={true}
    />
  );
}

export default AudioPlayer;
