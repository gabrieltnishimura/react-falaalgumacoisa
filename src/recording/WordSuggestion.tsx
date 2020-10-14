import React, { useState } from 'react';
import SkipRecordingModal from '../modal/SkipRecordingModal';
import LinkItem from '../shell/LinkItem';
import contextStyles from './DisableContextMenu.module.css';
import RecordingStateModel from './models/RecordingStateModel';
import styles from './WordSuggestion.module.css';

export enum WordSuggestionStyling {
  LIGHT,
  NORMAL,
  DARK,
}

function WordSuggestion(props: {
  state: RecordingStateModel,
  highlight: WordSuggestionStyling,
  skip: () => void,
}) {
  const [showSkipModal, setShowSkipModal] = useState(false);

  const showSkipModalFn = () => {
    setShowSkipModal(true);
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

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <div className={styles.step}>
            <span className={styles.stepText}>
              {props.state.currentStep}/{props.state.totalSteps}
            </span>
          </div>
          <span className={`${contextStyles.disable} ${wordStyling}`}>
            {props.state.phrase.text}
          </span>
        </div>
        <div className={styles.skipPhrase}>
          <LinkItem title="Pular frase" onclick={showSkipModalFn} color="cobalt"></LinkItem>
        </div>
      </div>
      {showSkipModal ?
        <SkipRecordingModal recordingState={props.state} onClose={onSkipPhraseModalClose} /> : null}
    </>
  );
}

export default WordSuggestion;
