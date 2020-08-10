import React, { useState } from 'react';
import './App.css';
import AudioPlayer from './recording/AudioPlayer';
import Microphone from './recording/Microphone';
import { VoiceRecordingService } from './recording/VoiceRecordingService';


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
    <div className="App">
      <header className="App-header">
        <Microphone pressed={start} unpressed={stop} />
        <AudioPlayer url={url}></AudioPlayer>
      </header>
    </div>
  );
}

export default App;
