import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextBox from '../shared/TextBox';
import LinkItem from '../shell/LinkItem';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import RecordingHeader from './RecordingHeader';
import RecordingIntegrationService from './RecordingIntegrationService';
import styles from './RecordingPage.module.css';
import SendRecordingButton from './SendRecordingButton';
import WordSuggestion from './WordSuggestion';

function RecordingPage() {
  const service = new RecordingIntegrationService();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [word, setWord] = useState<string>('Meu grande objetivo é me tornar um escalador profissional  reconhecido nacionalmente');
  const [recorded, setRecorded] = useState<boolean>(false);
  const [step, setStep] = useState<string>('1');
  const [totalSteps, setTotalSteps] = useState<string>('2');
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

  const teste = {
    backgroundImage: `url('${'square-cover.jpg'}')`
  }

  return (
    <React.Fragment>
      <RecordingHeader></RecordingHeader>
      <WhitePageWrapper>
        <div className={styles.content}>
          <WordSuggestion word={word} step={step} totalSteps={totalSteps}></WordSuggestion>
          {recorded ?
            <SendRecordingButton pressed={sendRecordingFn}></SendRecordingButton> :
            <LinkItem title="Pular frase" onclick={skipPhrase} color="cobalt"></LinkItem>}
          {recorded ? <AudioPlayer data={blob}></AudioPlayer> : null}
          <TextBox text="Aperte o botão abaixo para iniciar a gravação"></TextBox>
        </div>
      </WhitePageWrapper>
      <div className={styles.footer} style={teste}>
        <div className={styles.microphone}>
          <Microphone started={recordingFn} finished={recordedFn} />
        </div>
      </div>
    </React.Fragment>

  );
}

export default RecordingPage;
