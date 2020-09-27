import React, { useEffect } from 'react';
import LongPressButton from './LongPressButton';
import VoiceRecordingService from './VoiceRecordingService';

interface MicrophoneInput {
  started: () => void;
  finished: (e: Blob) => void;
}

const recordingService = new VoiceRecordingService();
function Microphone(props: MicrophoneInput) {
  useEffect(() => {
    recordingService.setupRecording();
  }, []);

  const start = async (e: any) => {
    await recordingService.start();
    props.started();
  }

  const stop = async (e: any) => {
    const data = await recordingService.stop();
    if (!data) {
      return;
    }
    props.finished(data.blob);
  }

  return (<LongPressButton pressed={start} unpressed={stop} ></LongPressButton>)
}

export default Microphone;
