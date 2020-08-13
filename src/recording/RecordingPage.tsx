import React, { useEffect, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import styles from './RecordingPage.module.css';
import ReportProblemButton from './ReportProblemButton';
import SendRecordingButton from './SendRecordingButton';
import VoiceRecordingService from './VoiceRecordingService';
import WordSuggestion from './WordSuggestion';
import WordSuggestionService from './WordSuggestionService';
import wordSuggestionStream from './WordSuggestionStream';

function RecordingPage() {
  const recordingService = new VoiceRecordingService();
  const [blob, setBlob] = useState<Blob>('');
  const [word, setWord] = useState<string>('');
  const [recorded, setRecorded] = useState<boolean>(false);

  const start = (e: any) => {
    recordingService.start();
  }
  const stop = (e: any) => {
    const data = recordingService.stop();
    if (data) {
      setBlob(data);
    }
    setRecorded(true);
  }

  useEffect(() => {
    const stream = wordSuggestionStream.getWord().subscribe(setWord);
    new WordSuggestionService().nextWord().toPromise(); // fire and forget
    return () => {
      stream.unsubscribe();
    };
  }, []);

  const button = recorded ? <SendRecordingButton data={blob} word={word}></SendRecordingButton> :
    <ReportProblemButton word={word} ></ReportProblemButton>

  return (
    <div className={styles.content}>
      <WordSuggestion word={word}></WordSuggestion>
      <Microphone pressed={start} unpressed={stop} />
      {button}
      <AudioPlayer url={url}></AudioPlayer>
    </div>
  );
}

export default RecordingPage;
