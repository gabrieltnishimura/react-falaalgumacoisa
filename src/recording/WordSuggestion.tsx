import React from 'react';
import contextStyles from './DisableContextMenu.module.css';
import styles from './WordSuggestion.module.css';

function WordSuggestion(props: { word: string, step: string, totalSteps: string, highlight: boolean }) {
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.step}>
        <span className={styles.stepText}>
          {props.step}/{props.totalSteps}
        </span>
      </div> */}
      <span className={`${contextStyles.disable} ${props.highlight ? styles.highlightedWord : styles.word}`}>
        {props.word}
      </span>
    </div>
  );
}

export default WordSuggestion;
