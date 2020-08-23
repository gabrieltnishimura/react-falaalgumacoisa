import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import RecordingIntegrationService from './RecordingIntegrationService';
import styles from './RecordingPage.module.css';
import ReportProblemButton from './ReportProblemButton';
import SendRecordingButton from './SendRecordingButton';
import WordSuggestion from './WordSuggestion';
import WordSuggestionService from './WordSuggestionService';
import wordSuggestionStream from './WordSuggestionStream';

function RecordingPage() {
  const service = new RecordingIntegrationService();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [word, setWord] = useState<string>('');
  const [recorded, setRecorded] = useState<boolean>(false);
  const navigate = useNavigate();

  const recordingFn = () => {
    setRecorded(false);
  };

  const recordedFn = (data: Blob) => {
    if (data) {
      setBlob(data);
    }
    setRecorded(true);
  };

  const sendRecordingFn = () => {
    if (!blob) {
      return;
    }

    service.send({
      word,
      sampleRate: 16000,
      noiseLevel: '1',
      additionalMetadata: {
        userAgent: navigator.userAgent,
      },
    }, blob).subscribe(() => {
      navigate('/sucesso', { replace: true });
    });
  }

  useEffect(() => {
    const stream = wordSuggestionStream.getWord().subscribe(setWord);
    new WordSuggestionService().nextWord().toPromise(); // fire and forget
    return () => {
      stream.unsubscribe();
    };
  }, []);

  return (
    <div className={styles.content}>
      <WordSuggestion word={word}></WordSuggestion>
      <Microphone started={recordingFn} finished={recordedFn} />
      {recorded ?
        <SendRecordingButton pressed={sendRecordingFn}></SendRecordingButton> :
        <ReportProblemButton word={word} ></ReportProblemButton>}
      {recorded ? <AudioPlayer data={blob}></AudioPlayer> : null}
    </div>
  );
}

export default RecordingPage;
