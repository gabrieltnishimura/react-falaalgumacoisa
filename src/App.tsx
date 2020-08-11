import React, { useState } from 'react';
import styles from './App.module.css';
import AudioPlayer from './recording/AudioPlayer';
import Microphone from './recording/Microphone';
import { VoiceRecordingService } from './recording/VoiceRecordingService';
import Header from './shell/Header';


function App() {
  const recordingService = new VoiceRecordingService();
  const [url, setUrl] = useState<string>('');
  const start = (e: any) => {
    recordingService.start();
  }
  const stop = (e: any) => {
    setUrl(recordingService.stop());
  }

  return (
    <div className={styles.app}>
      <Header></Header>
      <div className={styles.content}>
        <Microphone pressed={start} unpressed={stop} />
        <AudioPlayer url={url}></AudioPlayer>
      </div>
    </div>
  );
}

export default App;
