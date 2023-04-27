import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FirstRecordingModal from '../modal/FirstRecordingModal';
import FirstThemeModal from '../modal/FirstThemeModal';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import { RecordingGroupItemModel, RecordingGroupModel } from './models/RecordingGroupModel';
import { RecordingModalTypes } from './models/RecordingModalTypes';
import RecordingStateModel from './models/RecordingStateModel';
import * as stateService from './RecordingStateService';
import RecordingStep from './RecordingStep';
import * as wordSuggestionService from './suggestions/WordSuggestionService';

const SUPPORTED_MODALS = [RecordingModalTypes.FIRST_RECORDING, RecordingModalTypes.FIRST_THEME];

function RecordingPage() {
  const navigate = useNavigate();
  const { theme } = useParams();

  const { setLoading } = React.useContext(LoaderContext) as LoaderContextInterface;
  const [recordingState, setRecordingState] = useState<RecordingStateModel | null>(null);
  const [recordingGroup, setRecordingGroup] = useState<RecordingGroupModel | null>(null);

  const [next, setNext] = useState<number>(0);
  const [showModal, setModalToShow] = useState<RecordingModalTypes | null>(null);

  // only loads once per flow
  useEffect(() => {
    setLoading(true);
    const fetchState = async () => {
      if (!theme) {
        return;
      }
      try {
        const group = await wordSuggestionService.getGroup(theme);
        setRecordingGroup(group);
        const step = stateService.findNextStep(group);
        setRecordingState(step);
        setLoading(false);
      } catch (err) {
        navigate('/dashboard');
        // @todo send toasty that error occured
      }
    };
    fetchState();
  }, [setLoading, theme, navigate, next]);

  // loads once per recordingGroup in-memory change
  useEffect(() => {
    if (!recordingGroup) {
      return;
    }

    const step = stateService.findNextStep(recordingGroup);
    setRecordingState(step);
  }, [recordingGroup]);

  const confirmRecordingFn = async (blob: Blob, durationMs: number) => {
    if (!blob || !recordingState || !recordingGroup) {
      return;
    }

    if (recordingState.currentStep === recordingState.requiredSteps) {
      setLoading(true);
      const result = await stateService.confirmStep(recordingState, blob, durationMs); // add queue
      const type = result.modal?.type;
      if (type && SUPPORTED_MODALS.includes(type)) {
        setLoading(false);
        setModalToShow(type);
      } else if (result.hasNext) {
        setNext(next + 1); // refreshes useEffect forcibly
      } else {
        navigate('/dashboard');
      }
    } else {
      const phrases = (recordingGroup.phrases as RecordingGroupItemModel[]).map(
        (phrase, index): RecordingGroupItemModel => {
          if (phrase.id === recordingState?.phrase.id) {
            phrase.spoken = true;

            const modalEvent = recordingGroup.modalEvents.find(
              event => event.eventIndex === index + 1,
            );
            if (modalEvent) {
              setModalToShow(modalEvent.type);
            }
          }
          return phrase;
        },
      );

      stateService.confirmStep(recordingState, blob, durationMs); // add queue
      setRecordingGroup({
        ...recordingGroup,
        phrases,
      });
    }
  };

  const skipPhraseFn = () => {
    setNext(next + 1);
  };

  const onFirstRecordingModalClose = () => {
    setModalToShow(null);
  };

  const closeThemeModalFn = () => {
    setModalToShow(null);
    setLoading(true);
    navigate('/dashboard');
  };

  if (!recordingState || !recordingState.phrase) {
    return null;
  }

  const modal =
    showModal === RecordingModalTypes.FIRST_RECORDING ? (
      <FirstRecordingModal onClose={onFirstRecordingModalClose} />
    ) : showModal === RecordingModalTypes.FIRST_THEME ? (
      <FirstThemeModal onClose={closeThemeModalFn} />
    ) : null;

  return (
    <>
      <RecordingStep
        data={recordingState}
        skip={skipPhraseFn}
        finished={confirmRecordingFn}
      ></RecordingStep>
      {modal}
    </>
  );
}

export default RecordingPage;
