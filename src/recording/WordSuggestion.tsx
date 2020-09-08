import React from 'react';
import contextStyles from './DisableContextMenu.module.css';
import styles from './WordSuggestion.module.css';

function WordSuggestion(props: { word: string }) {
  return (
    <div>
      <span className={`${contextStyles.disable} ${styles.word}`}>
        {props.word}
      </span>
    </div>
  );
}

export default WordSuggestion;
