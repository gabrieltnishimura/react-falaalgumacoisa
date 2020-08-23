import React from 'react';
import LongPressButton from './LongPressButton';
import VoiceRecordingService from './VoiceRecordingService';

interface MicrophoneInput {
  started: () => void;
  finished: (e: Blob) => void;
}

function Microphone(props: MicrophoneInput) {
  const recordingService = new VoiceRecordingService();

  const onData = (data: any) => {
    props.finished(data);
  }
  recordingService.onDataCallback(onData);

  const start = (e: any) => {
    recordingService.start();
    props.started();
  }

  const stop = (e: any) => {
    recordingService.stop();
  }

  return (<LongPressButton pressed={start} unpressed={stop} ></LongPressButton>)
}

export default Microphone;
