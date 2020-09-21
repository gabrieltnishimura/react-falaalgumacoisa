import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from '../shell/AppLogo';
import LinkItem from '../shell/LinkItem';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import RecordingIntegrationService from './RecordingIntegrationService';
import styles from './RecordingPage.module.css';
import SendRecordingButton from './SendRecordingButton';
import WordSuggestion from './WordSuggestion';
function RecordingPage() {
  const service = new RecordingIntegrationService();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [word, setWord] = useState<string>('Meu grande objetivo é me tornar um escalador profissional  reconhecido nacionalmente');
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

  const skipPhrase = () => {
    console.log('nExt phrase');
  }

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
    // const stream = wordSuggestionStream.getWord().subscribe(setWord);
    // new WordSuggestionService().nextWord().toPromise(); // fire and forget
    // return () => {
    //   stream.unsubscribe();
    // };
  }, []);

  return (
    <WhitePageWrapper>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.recordingLogo} src={"logo_light.png"} alt="Microfone sinalizando gravação"></img>
          <AppLogo color="recordingTextGrey"></AppLogo>
        </div>
        <div className={styles.infoButton}><span>i</span></div>
      </div>
      <div className={styles.content}>
        <WordSuggestion word={word}></WordSuggestion>
        {recorded ?
          <SendRecordingButton pressed={sendRecordingFn}></SendRecordingButton> :
          <LinkItem title="Pular frase" onclick={skipPhrase} color="cobalt"></LinkItem>}
        {recorded ? <AudioPlayer data={blob}></AudioPlayer> : null}
        <Microphone started={recordingFn} finished={recordedFn} />
        <div className={styles.backgroundWrapper} >
          <img className={styles.background} src={"square-cover.jpg"} alt="Background"></img>
        </div>
      </div>
    </WhitePageWrapper>
  );
}

export default RecordingPage;
