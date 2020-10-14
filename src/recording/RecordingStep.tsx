import React, { useEffect, useState } from 'react';
import CircleButtonWrapper from '../shared/buttons/CircleButtonWrapper';
import TextBox from '../shared/TextBox';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import AudioPlayer from './AudioPlayer';
import Microphone from './Microphone';
import RecordingStateModel from './models/RecordingStateModel';
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
  data: RecordingStateModel,
  skip: () => void,
  finished: (data: Blob) => void,
}) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.NOT_RECORDED);

  useEffect(() => {
    // reset recordingState if word change
    setRecordingState(RecordingState.NOT_RECORDED);
  }, [props.data.currentStep, props.data.phrase.text]);

  const recordingFn = () => {
    setRecordingState(RecordingState.RECORDING);
  };

  const recordedFn = (data: Blob) => {
    if (data) {
      setBlob(data);
    }
    setRecordingState(RecordingState.RECORDED);
  };

  const confirmFn = () => {
    if (!blob) {
      return;
    }
    props.finished(blob);
  }

  const scrapRecordingFn = () => {
    setRecordingState(RecordingState.NOT_RECORDED);
    setBlob(null);
  }

  const dynamicBackground = {
    backgroundImage: `url('${'/splash-cover.png'}')`
  }

  const overlay = recordingState === RecordingState.NOT_RECORDED || recordingState === RecordingState.RECORDED ?
    styles.notDimmed : styles.dimmed;

  const hide = recordingState === RecordingState.RECORDED ?
    styles.hide : '';

  const action = recordingState === RecordingState.NOT_RECORDED || recordingState === RecordingState.RECORDING ?
    <>
      <div className={styles.toasty}>
        <TextBox text={toastyTextMap[recordingState]}></TextBox>
      </div>
    </> :
    <>
      <div className={styles.recordedToasty}>
        <TextBox text={toastyTextMap[recordingState]}></TextBox>
      </div>
      <div className={styles.player}>
        <AudioPlayer data={blob}></AudioPlayer>
      </div>
      <div className={styles.actionButtons}>
        <CircleButtonWrapper click={scrapRecordingFn}>
          <img src="/icons/trash.svg" alt="trashcan"></img>
        </CircleButtonWrapper>
        <CircleButtonWrapper click={confirmFn} success>
          <img src="/icons/check.svg" alt="check"></img>
        </CircleButtonWrapper>
      </div>
    </>;

  return (
    <div className={overlay}>
      <Header preventRedirect></Header>
      <WhitePageWrapper>
        <div className={`${styles.content} ${recordingStyle[recordingState]}`}>
          <div className={styles.suggestion}>
            <WordSuggestion
              state={props.data}
              skip={props.skip}
              highlight={wordHighlightMap[recordingState]}
            ></WordSuggestion>
          </div>
          {action}
        </div>
      </WhitePageWrapper>
      <div className={`${styles.footer} ${recordingStyle[recordingState]}`} style={dynamicBackground}>
        <div className={`${styles.microphone} ${hide}`}>
          <Microphone started={recordingFn} finished={recordedFn} />
        </div>
      </div>
    </div>
  );
}

export default RecordingStep;
