import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstRecordingModalContent from '../modal/FirstRecordingModalContent';
import Modal from '../modal/Modal';
import { RecordingModalTypes } from './models/RecordingModalTypes';
import RecordingStateModel from './models/RecordingStateModel';
import RecordingStateService from './RecordingStateService';
import RecordingStep from './RecordingStep';

const stateService = new RecordingStateService();

function RecordingPage() {
  const navigate = useNavigate();
  const [recordingState, setRecordingState] = useState<RecordingStateModel | null>(null)
  const [skip, setSkip] = useState<number>(0);
  const [next, setNext] = useState<number>(0);
  // modals
  const [namingData, setNamingData] = useState<any>(null);
  const [showModal, setModalToShow] = useState<RecordingModalTypes | null>(null);

  const skipPhrase = async () => {
    setModalToShow(RecordingModalTypes.SKIP_RECORDING);
  }

  const confirmSkipPhraseFn = async () => {
    if (!recordingState) {
      return;
    }

    await stateService.skipStep(recordingState);
    setModalToShow(null);
    setSkip(skip + 1);
  }

  const cancelSkipPhraseFn = () => {
    setModalToShow(null);
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
    const type = result.modal?.type;
    if (type) {
      setModalToShow(type);
    } else if (result.hasNext) {
      setNext(next + 1); // refreshes useEffect forcibly
    } else {
      navigate('/sucesso');
    }
  }

  const chooseNamingFn = () => {
    setModalToShow(null);
    console.log(namingData);
  }

  const closeThemeModalFn = () => {
    setModalToShow(null);
    console.log('Redirect to dashboard!');
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
      {showModal === RecordingModalTypes.FIRST_RECORDING ? <Modal
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
      </Modal> : showModal === RecordingModalTypes.FIRST_THEME ? <Modal
        title="Você concluiu o primeiro módulo!"
        scoreChange="+ 300pts"
        headerIcon={{
          src: 'icons/champagne.png',
          alt: 'champagne cheers'
        }}
        primaryButton={{
          title: 'Avançar',
          enabled: true,
          onClick: closeThemeModalFn,
        }}>
        <FirstRecordingModalContent onChange={setNamingData} />
      </Modal> : showModal === RecordingModalTypes.SKIP_RECORDING ? <Modal
        title="Pular frase"
        subtitle="Gostaria de colocar o porquê decidiu pular essa frase? Estamos trabalhando para melhorar a qualidade do conteúdo da nossa aplicação."
        primaryButton={{
          title: 'Continuar',
          enabled: !!namingData,
          onClick: confirmSkipPhraseFn,
        }}
        secondaryButton={{
          title: 'Voltar',
          disabled: false,
          onClick: cancelSkipPhraseFn,
        }}>
        <FirstRecordingModalContent onChange={setNamingData} />
      </Modal> : null}
    </>
  );
}

export default RecordingPage;
