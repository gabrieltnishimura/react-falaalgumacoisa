import React, { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh';
import { isDesktop } from '../shared/utils';
import Header from '../shell/Header';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import AnimatedRecordedContent from './animations/AnimatedRecordedContent';
import AnimatedTextBox from './animations/AnimatedTextBox';
import AnimatedMicrophone from './audio/AnimatedMicrophone';
import RecordingStateModel from './models/RecordingStateModel';
import styles from './RecordingStep.module.css';
import WordSuggestion, { WordSuggestionStyling } from './suggestions/WordSuggestion';

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
  finished: (data: Blob, durationMs: number) => void,
}) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [durationMs, setDurationMs] = useState<number>(0);
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.NOT_RECORDED);
  const height = use100vh();

  const getContentMinHeight = () => {
    let footerSize: string = '';
    if (isDesktop()) {
      footerSize = recordingState === RecordingState.RECORDED ? '39rem' : '35.6rem';
    } else {
      footerSize = recordingState === RecordingState.RECORDED ? '39rem' : '24.4rem';
    }
    const headerSize = '9.7rem';

    const adaptableContainerSize = height ? `${height}px` : '100vh';
    return {
      minHeight: `calc(${adaptableContainerSize} - ${headerSize} - ${footerSize})`
    };
  }

  useEffect(() => {
    // reset recordingState if word change
    setRecordingState(RecordingState.NOT_RECORDED);
  }, [props.data.currentStep, props.data.phrase.text]);

  const recordingFn = () => {
    setRecordingState(RecordingState.RECORDING);
  };

  const recordedFn = (data: Blob, durationMs: number) => {
    if (data) {
      setBlob(data);
      setDurationMs(durationMs);
    }
    setRecordingState(RecordingState.RECORDED);
  };

  const confirmFn = () => {
    if (!blob) {
      return;
    }
    props.finished(blob, durationMs);
  }

  const scrapRecordingFn = () => {
    setRecordingState(RecordingState.NOT_RECORDED);
    setBlob(null);
  }

  const overlay = recordingState === RecordingState.RECORDING ? styles.dimmed : '';

  return (
    <div className={overlay}>
      <Header preventRedirect></Header>
      <div className={`${recordingStyle[recordingState]}`}>
        <div className={styles.content} style={getContentMinHeight()}>
          <WhitePageWrapper>
            <div className={styles.suggestion}>
              <WordSuggestion
                state={props.data}
                skip={props.skip}
                hideSkip={recordingState !== RecordingState.RECORDED}
                highlight={wordHighlightMap[recordingState]}
              ></WordSuggestion>
            </div>
          </WhitePageWrapper>
        </div>
        <div className={styles.footer} >
          <div className={styles.toasty}>
            <AnimatedTextBox text={toastyTextMap[recordingState]}
              mount={recordingState !== RecordingState.RECORDED} />
          </div>
          <div className={styles.microphone}>
            <AnimatedMicrophone started={recordingFn} finished={recordedFn}
              mount={recordingState !== RecordingState.RECORDED} />
          </div>
          <WhitePageWrapper>
            <AnimatedRecordedContent
              mount={recordingState === RecordingState.RECORDED}
              text={toastyTextMap[recordingState]}
              blob={blob}
              confirm={confirmFn}
              trash={scrapRecordingFn}
            />
          </WhitePageWrapper>
          <img className={styles.background} src={props.data.cover} alt="cover" />
        </div>
      </div>
    </div>
  );
}

export default RecordingStep;
