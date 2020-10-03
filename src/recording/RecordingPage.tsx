import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordingIntegrationService from './RecordingIntegrationService';
import RecordingStep from './RecordingStep';
import WordSuggestionService from './WordSuggestionService';

const integrationService = new RecordingIntegrationService();
const wordSuggestionService = new WordSuggestionService();

function RecordingPage() {
  const [word, setWord] = useState<{ id: string, text: string }>({ id: '', text: '' });
  const [step, setStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const navigate = useNavigate();

  const skipPhrase = async () => {
    await wordSuggestionService.blacklist(word.id, '').toPromise();
  }

  const confirmRecordingFn = (blob: Blob) => {
    if (!blob) {
      return;
    }

    integrationService.send({
      word: word.id,
      sampleRate: 16000,
      noiseLevel: '1',
      additionalMetadata: {
        userAgent: navigator.userAgent,
      },
    }, blob).subscribe(() => {
      navigate('/sucesso', { replace: true });
    });
  }

  useEffect(() => {
    const stream = wordSuggestionService.getGroup('test').subscribe((data) => {
      if (!data || !data.stepsCap || !data.total || !data.groups || !data.groups.length) {
        return;
      }

      setStep(data.currentStep);
      setTotalSteps(data.stepsCap);
      setWord(data.groups[data.currentStep])
    });
    return () => {
      stream.unsubscribe();
    };
  }, []);

  return (
    <RecordingStep
      word={word.text}
      step={(step + 1)}
      totalSteps={totalSteps}
      skip={skipPhrase}
      finished={confirmRecordingFn}
    ></RecordingStep>
  );
}

export default RecordingPage;
