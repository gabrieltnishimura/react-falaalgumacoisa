import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleButtonWrapper from '../shared/CircleButtonWrapper';
import TextBox from '../shared/TextBox';
import LinkItem from '../shell/LinkItem';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import RecordingHeader from './RecordingHeader';
import RecordingIntegrationService from './RecordingIntegrationService';
import styles from './RecordingPage.module.css';
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
  const [recorded, setRecorded] = useState<RecordingState>(RecordingState.RECORDED);
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

  const scrapRecordingFn = () => {
    console.log('scrap this');
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

  const overlay = recorded === RecordingState.NOT_RECORDED || recorded === RecordingState.RECORDED ?
    styles.notDimmed : styles.dimmed;

  const toastyText = recorded === RecordingState.NOT_RECORDED ?
    'Aperte o botão abaixo para iniciar a gravação' :
    recorded === RecordingState.RECORDING ?
      'Solte o botão para finalizar a gravação' :
      'Confira a sua gravação e, se a frase foi corretamente captada, confirme o envio';

  const hide = recorded === RecordingState.RECORDED ?
    styles.hide : '';

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
      <div className={styles.recordedToasty}>
        <TextBox text={toastyText}></TextBox>
      </div>
      <div className={styles.player}>
        <AudioPlayer data={blob}></AudioPlayer>
      </div>
      <div className={styles.actionButtons}>
        <CircleButtonWrapper click={sendRecordingFn} success={false}>
          <svg viewBox="0 -256 1792 1792">
            <g transform="matrix(1,0,0,-1,197.42373,1255.0508)">
              <path d="M 512,800 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z M 1152,76 v 948 H 256 V 76 Q 256,54 263,35.5 270,17 277.5,8.5 285,0 288,0 h 832 q 3,0 10.5,8.5 7.5,8.5 14.5,27 7,18.5 7,40.5 z M 480,1152 h 448 l -48,117 q -7,9 -17,11 H 546 q -10,-2 -17,-11 z m 928,-32 v -64 q 0,-14 -9,-23 -9,-9 -23,-9 h -96 V 76 q 0,-83 -47,-143.5 -47,-60.5 -113,-60.5 H 288 q -66,0 -113,58.5 Q 128,-11 128,72 v 952 H 32 q -14,0 -23,9 -9,9 -9,23 v 64 q 0,14 9,23 9,9 23,9 h 309 l 70,167 q 15,37 54,63 39,26 79,26 h 320 q 40,0 79,-26 39,-26 54,-63 l 70,-167 h 309 q 14,0 23,-9 9,-9 9,-23 z" />
            </g>
          </svg>
        </CircleButtonWrapper>
        <CircleButtonWrapper click={scrapRecordingFn} success={true}>
          <svg fill="#ffffff" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
        </CircleButtonWrapper>
      </div>
    </>;

  return (
    <div className={overlay}>
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
        <div className={`${styles.microphone} ${hide}`}>
          <Microphone started={recordingFn} finished={recordedFn} />
        </div>
      </div>
    </div>
  );
}

export default RecordingPage;
