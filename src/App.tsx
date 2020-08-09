import React from 'react';
import './App.css';
import Microphone from './mic/Microphone';
import { RecordingService } from './mic/RecordingService';


function App() {
  const recordingService = new RecordingService();
  const start = (e: any) => {
    recordingService.start();
  }
  const stop = (e: any) => {
    recordingService.stop();
  }

  return (
    <div className="App">
      <header className="App-header">
        <Microphone pressed={start} unpressed={stop} />
      </header>
    </div>
  );
}

export default App;
