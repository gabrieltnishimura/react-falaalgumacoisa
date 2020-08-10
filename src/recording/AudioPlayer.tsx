import React from 'react';
import ReactPlayer from 'react-player';

function AudioPlayer(props: any) {
  return (
    <ReactPlayer
      url={props.url}
      playing={true}
    />
  );
}

export default AudioPlayer;
