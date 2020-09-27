import React from 'react';
import contextStyles from './DisableContextMenu.module.css';
import styles from './WordSuggestion.module.css';

export enum WordSuggestionStyling {
  LIGHT,
  NORMAL,
  DARK,
}

function WordSuggestion(props: { word: string, step: number, totalSteps: number, highlight: WordSuggestionStyling }) {
  const wordStyling = props.highlight === WordSuggestionStyling.DARK ?
    styles.darkWord : props.highlight === WordSuggestionStyling.NORMAL ?
      styles.normalWord : styles.lightWord;

  return (
    <div className={styles.wrapper}>
      <div className={styles.step}>
        <span className={styles.stepText}>
          {props.step}/{props.totalSteps}
        </span>
      </div>
      <span className={`${contextStyles.disable} ${wordStyling}`}>
        {props.word}
      </span>
    </div>
  );
}

export default WordSuggestion;
