import React, { useEffect, useState } from 'react';
import CircleButtonWrapper from '../shared/buttons/CircleButtonWrapper';
import TextBox from '../shared/TextBox';
import Header from '../shell/Header';
import LinkItem from '../shell/LinkItem';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import styles from './RecordingStep.module.css';
import WordSuggestion, { WordSuggestionStyling } from './WordSuggestion';

enum RecordingState {
  NOT_RECORDED,
  RECORDING,
  RECORDED,
}

const recordingStyle = {
  [RecordingState.NOT_RECORDED]: styles.notRecorded,
  [RecordingState.RECORDING]: styles.recording,
  [RecordingState.RECORDED]: styles.recorded,
}

const wordHighlightMap = {
  [RecordingState.NOT_RECORDED]: WordSuggestionStyling.LIGHT,
  [RecordingState.RECORDING]: WordSuggestionStyling.NORMAL,
  [RecordingState.RECORDED]: WordSuggestionStyling.DARK,
}

const toastyTextMap = {
  [RecordingState.NOT_RECORDED]: 'Segure o botão abaixo para iniciar a gravação',
  [RecordingState.RECORDING]: 'Leia a frase acima em voz alta e solte o botão',
  [RecordingState.RECORDED]: 'Confira a sua gravação e, se a frase foi corretamente captada, confirme o envio',
}

function RecordingStep(props: {
  step: number,
  totalSteps: number,
  word: string,
  skip: () => void,
  finished: (data: Blob) => void,
}) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [state, setState] = useState<RecordingState>(RecordingState.NOT_RECORDED);

  useEffect(() => {
    // reset state if word change
    setState(RecordingState.NOT_RECORDED);
  }, [props.step, props.word]);

  const recordingFn = () => {
    setState(RecordingState.RECORDING);
  };

  const recordedFn = (data: Blob) => {
    if (data) {
      setBlob(data);
    }
    setState(RecordingState.RECORDED);
  };

  const confirmFn = () => {
    if (!blob) {
      return;
    }
    props.finished(blob);
  }

  const scrapRecordingFn = () => {
    setState(RecordingState.NOT_RECORDED);
    setBlob(null);
  }

  const dynamicBackground = {
    backgroundImage: `url('${'/splash-cover.png'}')`
  }

  const overlay = state === RecordingState.NOT_RECORDED || state === RecordingState.RECORDED ?
    styles.notDimmed : styles.dimmed;

  const hide = state === RecordingState.RECORDED ?
    styles.hide : '';

  const action = state === RecordingState.NOT_RECORDED || state === RecordingState.RECORDING ?
    <>
      <div className={styles.skipPhrase}>
        <LinkItem title="Pular frase" onclick={props.skip} color="cobalt"></LinkItem>
      </div>
      <div className={styles.toasty}>
        <TextBox text={toastyTextMap[state]}></TextBox>
      </div>
    </> :
    <>
      <div className={styles.recordedToasty}>
        <TextBox text={toastyTextMap[state]}></TextBox>
      </div>
      <div className={styles.player}>
        <AudioPlayer data={blob}></AudioPlayer>
      </div>
      <div className={styles.actionButtons}>
        <CircleButtonWrapper click={scrapRecordingFn}>
          <img src="/trash.svg" alt="trashcan"></img>
        </CircleButtonWrapper>
        <CircleButtonWrapper click={confirmFn} success>
          <svg fill="#ffffff" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
        </CircleButtonWrapper>
      </div>
    </>;

  return (
    <div className={overlay}>
      <Header preventRedirect></Header>
      <WhitePageWrapper>
        <div className={`${styles.content} ${recordingStyle[state]}`}>
          <div className={styles.suggestion}>
            <WordSuggestion
              word={props.word}
              step={props.step}
              totalSteps={props.totalSteps}
              highlight={wordHighlightMap[state]}
            ></WordSuggestion>
          </div>
          {action}
        </div>
      </WhitePageWrapper>
      <div className={`${styles.footer} ${recordingStyle[state]}`} style={dynamicBackground}>
        <div className={`${styles.microphone} ${hide}`}>
          <Microphone started={recordingFn} finished={recordedFn} />
        </div>
      </div>
    </div>
  );
}

export default RecordingStep;
