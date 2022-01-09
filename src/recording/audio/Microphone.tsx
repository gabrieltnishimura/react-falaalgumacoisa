import React, { useEffect } from 'react';
import LongPressButton from './LongPressButton';
import * as recordingService from './VoiceRecordingService';

export interface MicrophoneInput {
  started: () => void;
  finished: (e: Blob, durationMs: number) => void;
}

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
    props.finished(data.blob, data.durationMs);
  }

  return (<LongPressButton pressed={start} unpressed={stop} ></LongPressButton>)
}

export default Microphone;
