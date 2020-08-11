import React from 'react';

function WordSuggestion(props: { word: string }) {
  return (
    <span>
      {props.word}
    </span>
  );
}

export default WordSuggestion;
