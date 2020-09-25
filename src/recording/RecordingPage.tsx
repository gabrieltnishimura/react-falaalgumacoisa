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

enum RecordingState {
  NOT_RECORDED,
  RECORDING,
  RECORDED,
}

function RecordingPage() {
  const service = new RecordingIntegrationService();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [word, setWord] = useState<string>('Meu grande objetivo é me tornar um escalador profissional  reconhecido nacionalmente');
  const [recorded, setRecorded] = useState<RecordingState>(RecordingState.RECORDING);
  const [step, setStep] = useState<string>('1');
  const [totalSteps, setTotalSteps] = useState<string>('2');
  const navigate = useNavigate();

  const recordingFn = () => {
    setRecorded(RecordingState.RECORDING);
  };

  const recordedFn = (data: Blob) => {
    if (data) {
      setBlob(data);
    }
    setRecorded(RecordingState.RECORDED);
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

  const dynamicBackground = {
    backgroundImage: `url('${'square-cover.jpg'}')`
  }

  const toastyText = recorded === RecordingState.NOT_RECORDED ?
    'Aperte o botão abaixo para iniciar a gravação' :
    recorded === RecordingState.RECORDING ?
      'Solte o botão para finalizar a gravação' :
      'Confira a sua gravação e, se a frase foi corretamente captada, confirme o envio';

  const action = recorded === RecordingState.NOT_RECORDED || recorded === RecordingState.RECORDING ?
    <>
      <div className={styles.skipPhrase}>
        <LinkItem title="Pular frase" onclick={skipPhrase} color="cobalt"></LinkItem>
      </div>
      <div className={styles.toasty}>
        <TextBox text={toastyText}></TextBox>
      </div>
    </> :
    <>
      <TextBox text={toastyText}></TextBox>
      <AudioPlayer data={blob}></AudioPlayer>
      <SendRecordingButton pressed={sendRecordingFn}></SendRecordingButton>
      {/* <ScrapRecordingButton pressed={scrapRecordingFn}></SendRecordingButton> */}
    </>;

  return (
    <div className={styles.dimmed}>
      <RecordingHeader></RecordingHeader>
      <WhitePageWrapper>
        <div className={styles.content}>
          <div className={styles.suggestion}>
            <WordSuggestion
              word={word}
              step={step}
              totalSteps={totalSteps}
              highlight={true}
            ></WordSuggestion>
          </div>
          {action}
        </div>
      </WhitePageWrapper>
      <div className={styles.footer} style={dynamicBackground}>
        <div className={styles.microphone}>
          <Microphone started={recordingFn} finished={recordedFn} />
        </div>
      </div>
    </div>
  );
}

export default RecordingPage;
