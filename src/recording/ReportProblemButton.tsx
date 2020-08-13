import React from 'react';
import WordSuggestionService from './WordSuggestionService';

function ReportProblemButton(props: { word: string }) {
  const service = new WordSuggestionService();
  const click = (e: React.MouseEvent<any>) => {
    service.blacklist(props.word, 'reason').subscribe(() => {
      service.nextWord().toPromise();
    }); // when to cleanup?
  }

  return (
    <button onClick={click}>
      Reportar problema
    </button>
  );
}

export default ReportProblemButton;
