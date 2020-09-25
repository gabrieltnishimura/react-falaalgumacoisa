import React, { useRef } from 'react';
import { getAudioFormat } from '../shared/utils';

function AudioPlayer(props: { data: Blob | null }) {
  const audioRef = useRef(null);
  const url = window.URL.createObjectURL(props.data)
  console.log(url);
  return (
    <audio controls preload="auto" ref={audioRef}>
      <source src={url} type={getAudioFormat()} />
    </audio>
  );
}

export default AudioPlayer;
