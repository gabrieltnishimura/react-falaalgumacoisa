import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordingIntegrationService from './RecordingIntegrationService';
import RecordingStep from './RecordingStep';
import WordSuggestionService from './WordSuggestionService';

const integrationService = new RecordingIntegrationService();
const wordSuggestionService = new WordSuggestionService();

function RecordingPage() {
  const [word, setWord] = useState<string>('Meu grande objetivo é me tornar um escalador profissional  reconhecido nacionalmente');
  const [step, setStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const navigate = useNavigate();

  const skipPhrase = () => {
    console.log('nExt phrase');
  }

  const sendRecordingFn = (blob: Blob) => {
    if (!blob) {
      return;
    }

    integrationService.send({
      word,
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
      setWord(data.groups[data.currentStep].text)
    });
    return () => {
      stream.unsubscribe();
    };
  }, []);

  return (
    <RecordingStep
      word={word}
      step={(step + 1)}
      totalSteps={totalSteps}
      skip={skipPhrase}
      finished={sendRecordingFn}
    ></RecordingStep>
  );
}

export default RecordingPage;
