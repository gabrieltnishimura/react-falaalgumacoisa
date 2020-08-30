import React from 'react';
import contextStyles from './DisableContextMenu.module.css';

function WordSuggestion(props: { word: string }) {
  return (
    <span className={contextStyles.disable}>
      {props.word}
    </span>
  );
}

export default WordSuggestion;
