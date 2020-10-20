import React, { useState } from 'react';
import MaxSkipsModal from '../../modal/MaxSkipsModal';
import SkipRecordingModal from '../../modal/SkipRecordingModal';
import LinkItem from '../../shell/LinkItem';
import RecordingStateModel from '../models/RecordingStateModel';
import contextStyles from './DisableContextMenu.module.css';
import styles from './WordSuggestion.module.css';

export enum WordSuggestionStyling {
  LIGHT,
  NORMAL,
  DARK,
}

function WordSuggestion(props: {
  state: RecordingStateModel,
  highlight: WordSuggestionStyling,
  hideSkip: boolean,
  skip: () => void,
}) {
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showMaxSkipsModal, setShowMaxSkipsModal] = useState(false);

  const showSkipModalFn = () => {
    if (props.state.currentStep === props.state.totalSteps) {
      setShowMaxSkipsModal(true);
    } else {
      setShowSkipModal(true);
    }
  }

  const onSkipPhraseModalClose = (skipped: boolean) => {
    setShowSkipModal(false);
    if (skipped) {
      props.skip();
    }
  }

  const wordStyling = props.highlight === WordSuggestionStyling.DARK ?
    styles.darkWord : props.highlight === WordSuggestionStyling.NORMAL ?
      styles.normalWord : styles.lightWord;

  const fontSize = props.state.phrase.text.length > 80 ?
    '3.6rem' : '4rem';

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <div className={styles.step}>
            <span className={styles.stepText}>
              {props.state.currentStep}/{props.state.totalSteps}
            </span>
          </div>
          <span className={`${contextStyles.disable} ${wordStyling}`} style={{ fontSize }}>
            {props.state.phrase.text}
          </span>
        </div>
        {props.hideSkip ? <div className={styles.skipPhrase}>
          <LinkItem title="Pular frase" onclick={showSkipModalFn} color="cobalt"></LinkItem>
        </div> : null}
      </div>
      {showSkipModal ?
        <SkipRecordingModal recordingState={props.state} onClose={onSkipPhraseModalClose} /> : null}
      {showMaxSkipsModal ?
        <MaxSkipsModal onClose={() => setShowMaxSkipsModal(false)} /> : null}
    </>
  );
}

export default WordSuggestion;
