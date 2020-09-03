import React from 'react';
import LongPressButton from './LongPressButton';
import VoiceRecordingService from './VoiceRecordingService';

interface MicrophoneInput {
  started: () => void;
  finished: (e: Blob) => void;
}

const recordingService = new VoiceRecordingService();
function Microphone(props: MicrophoneInput) {
  const start = (e: any) => {
    recordingService.start();
    props.started();
  }

  const stop = (e: any) => {
    recordingService.stop();
    const data = recordingService.getData()
    if (!data) {
      return;
    }

    props.finished(data);
  }

  return (<LongPressButton pressed={start} unpressed={stop} ></LongPressButton>)
}

export default Microphone;
