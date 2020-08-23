import React from 'react';
import LongPressButton from './LongPressButton';
import VoiceRecordingService from './VoiceRecordingService';

interface MicrophoneInput {
  started: () => void;
  finished: (e: Blob) => void;
}

function Microphone(props: MicrophoneInput) {
  const recordingService = new VoiceRecordingService();

  const start = (e: any) => {
    recordingService.start();
    props.started();
  }

  const stop = (e: any) => {
    const data = recordingService.stop();
    if (!data) {
      return;
    }

    props.finished(data);
  }

  return (<LongPressButton pressed={start} unpressed={stop} ></LongPressButton>)
}

export default Microphone;
