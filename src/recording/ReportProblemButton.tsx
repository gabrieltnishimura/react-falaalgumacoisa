import React from 'react';
import contextStyles from './DisableContextMenu.module.css';
import WordSuggestionService from './WordSuggestionService';

function ReportProblemButton(props: { word: string }) {
  const service = new WordSuggestionService();
  const click = (e: React.MouseEvent<any>) => {
    service.blacklist(props.word, 'reason').subscribe(() => {
      console.log('what')
    }); // when to cleanup?
  }

  return (
    <button onClick={click} className={contextStyles.disable}>
      Reportar problema
    </button>
  );
}

export default ReportProblemButton;
