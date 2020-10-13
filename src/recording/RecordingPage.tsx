import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FirstRecordingModal from '../modal/FirstRecordingModal';
import FirstThemeModal from '../modal/FirstThemeModal';
import SkipRecordingModal from '../modal/SkipRecordingModal';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { RecordingModalTypes } from './models/RecordingModalTypes';
import RecordingStateModel from './models/RecordingStateModel';
import * as stateService from './RecordingStateService';
import RecordingStep from './RecordingStep';

function RecordingPage() {
  const navigate = useNavigate();
  const { theme } = useParams();

  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [recordingState, setRecordingState] = useState<RecordingStateModel | null>(null)
  const [next, setNext] = useState<number>(0);
  // modals
  const [showModal, setModalToShow] = useState<RecordingModalTypes | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchState = async () => {
      const step = await stateService.getNextStep(theme);
      setRecordingState(step);
      setLoading(false);
    }
    fetchState();
  }, [next, setLoading, theme]);

  const confirmRecordingFn = async (blob: Blob) => {
    if (!blob || !recordingState) {
      return;
    }

    setLoading(true);
    const result = await stateService.confirmStep(recordingState, blob);
    const type = result.modal?.type;
    if (type) {
      setLoading(false);
      setModalToShow(type);
    } else if (result.hasNext) {
      setNext(next + 1); // refreshes useEffect forcibly
    } else {
      navigate('/dashboard');
    }
  }

  const skipPhrase = async () => {
    setModalToShow(RecordingModalTypes.SKIP_RECORDING);
  }

  const onSkipPhraseModalClose = (skipped: boolean) => {
    setModalToShow(null);
    if (skipped) {
      setNext(next + 1);
    }
  }

  const onFirstRecordingModalClose = () => {
    setModalToShow(null);
    setNext(next + 1); // refreshes useEffect forcibly
  }

  const closeThemeModalFn = () => {
    setModalToShow(null);
    setLoading(true);
    navigate('/dashboard');
  }

  if (!recordingState || !recordingState.phrase) {
    return null;
  }

  const modal =
    showModal === RecordingModalTypes.FIRST_RECORDING ? <FirstRecordingModal onClose={onFirstRecordingModalClose} /> :
      showModal === RecordingModalTypes.FIRST_THEME ? <FirstThemeModal onClose={closeThemeModalFn} /> :
        showModal === RecordingModalTypes.SKIP_RECORDING ? <SkipRecordingModal recordingState={recordingState}
          onClose={onSkipPhraseModalClose} /> : null;

  return (
    <>
      <RecordingStep
        word={recordingState.phrase.text}
        step={recordingState.step}
        totalSteps={recordingState.totalSteps}
        skip={skipPhrase}
        finished={confirmRecordingFn}
      ></RecordingStep>
      {modal}
    </>
  );
}

export default RecordingPage;
