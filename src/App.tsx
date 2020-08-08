import React from 'react';
import './App.css';
import Microphone from './mic/Microphone';
import { RecordingService } from './mic/RecordingService';


function App() {
  const recordingService = new RecordingService();
  return (
    <div className="App">
      <header className="App-header">
        <Microphone />
        <div>
          <button onClick={() => {
            recordingService.start();
          }}>Start</button>
          <button onClick={() => {
            recordingService.stop();
          }}>Stop</button>
        </div>
      </header>
    </div>
  );
}

export default App;
