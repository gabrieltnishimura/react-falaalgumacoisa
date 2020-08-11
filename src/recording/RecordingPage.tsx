import React, { useEffect, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import styles from './RecordingPage.module.css';
import ReportProblemButton from './ReportProblemButton';
import VoiceRecordingService from './VoiceRecordingService';
import WordSuggestion from './WordSuggestion';
import WordSuggestionService from './WordSuggestionService';

function RecordingPage() {
  const recordingService = new VoiceRecordingService();
  const [url, setUrl] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const start = (e: any) => {
    recordingService.start();
  }
  const stop = (e: any) => {
    setUrl(recordingService.stop());
  }

  useEffect(() => {
    const wordSuggestionStream = new WordSuggestionService().nextWord()
      .subscribe(setWord);
    return () => {
      wordSuggestionStream.unsubscribe();
    };
  }, []);

  return (
    <div className={styles.content}>
      <WordSuggestion word={word}></WordSuggestion>
      <Microphone pressed={start} unpressed={stop} />
      <ReportProblemButton></ReportProblemButton>
      <AudioPlayer url={url}></AudioPlayer>
    </div>
  );
}

export default RecordingPage;
