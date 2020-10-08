import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstRecordingModalContent from '../modal/FirstRecordingModalContent';
import Modal from '../modal/Modal';
import { RecordingConfirmationModalTypes } from './models/RecordingConfirmation';
import RecordingStateModel from './models/RecordingStateModel';
import RecordingStateService from './RecordingStateService';
import RecordingStep from './RecordingStep';

const stateService = new RecordingStateService();

function RecordingPage() {
  const [recordingState, setRecordingState] = useState<RecordingStateModel | null>(null)
  const [skip, setSkip] = useState<number>(0);
  const [next, setNext] = useState<number>(0);

  const [namingData, setNamingData] = useState<any>(null);
  const [showFirstRecordingModal, setShowFirstRecordingModal] = useState(false);
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

    // const result = await stateService.confirmStep(recordingState, blob);
    const result: any = {};
    const type = result.modal?.type || RecordingConfirmationModalTypes.FIRST_RECORDING;
    if (type === RecordingConfirmationModalTypes.FIRST_RECORDING) {
      setShowFirstRecordingModal(true);
    } else if (result.hasNext) {
      setNext(next + 1); // refreshes useEffect forcibly
    } else {
      navigate('/sucesso');
    }
  }

  const chooseNamingFn = () => {
    setShowFirstRecordingModal(false);
    console.log(namingData);
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
    <>
      <RecordingStep
        word={recordingState.phrase.text}
        step={recordingState.step}
        totalSteps={recordingState.totalSteps}
        skip={skipPhrase}
        finished={confirmRecordingFn}
      ></RecordingStep>
      {showFirstRecordingModal ? <Modal
        title="Parabéns pela sua primeira gravação!"
        subtitle="Gostaria de se identificar?"
        scoreChange="+ 100pts"
        headerIcon={{
          src: 'icons/champagne.png',
          alt: 'champagne cheers'
        }}
        primaryButton={{
          title: 'Continuar',
          enabled: !!namingData,
          onClick: chooseNamingFn,
        }}>
        <FirstRecordingModalContent onChange={setNamingData} />
      </Modal> : null}
    </>
  );
}

export default RecordingPage;
