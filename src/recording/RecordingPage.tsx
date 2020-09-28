import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordingStateModel from './models/RecordingStateModel';
import RecordingStateService from './RecordingStateService';
import RecordingStep from './RecordingStep';

const stateService = new RecordingStateService();

function RecordingPage() {
  const [recordingState, setRecordingState] = useState<RecordingStateModel | null>(null)
  const [skip, setSkip] = useState<number>(0);
  const [next, setNext] = useState<number>(0);
  const navigate = useNavigate();

  const skipPhrase = async () => {
    if (!recordingState) {
      return;
    }

    await stateService.skipStep(recordingState);
    setSkip(skip + 1);
  }

  const confirmRecordingFn = async (blob: Blob) => {
    try {
      await confirmationFlow(blob);
    } catch (err) {
      console.error('Unable to confirm recording', err);
    }
  }

  const confirmationFlow = async (blob: Blob) => {
    if (!blob || !recordingState) {
      return;
    }

    const result = await stateService.confirmStep(recordingState, blob);
    if (result.modal) {
      console.log('ADD MODAL LOGIC HERE');
    } else if (result.hasNext) {
      setNext(next + 1); // refreshes useEffect forcibly
    } else {
      navigate('/sucesso');
    }
  }

  useEffect(() => {
    const fetchState = async () => {
      const step = await stateService.getNextStep('ciencia');
      setRecordingState(step);
    }
    fetchState();
  }, [skip, next]);

  if (!recordingState || !recordingState.phrase) {
    return null;
  }
  return (
    <RecordingStep
      word={recordingState.phrase.text}
      step={recordingState.step}
      totalSteps={recordingState.totalSteps}
      skip={skipPhrase}
      finished={confirmRecordingFn}
    ></RecordingStep>
  );
}

export default RecordingPage;
