import * as registrationIntegrationService from '../registration/RegistrationIntegrationService';
import RecordingConfirmation from './models/RecordingConfirmation';
import { RecordingGroupModel } from './models/RecordingGroupModel';
import RecordingStateModel from './models/RecordingStateModel';
import { sendRecording } from './RecordingIntegrationService';

const findNextStep = (group: RecordingGroupModel): RecordingStateModel => {
  let found = -1;
  const phrase = group.phrases
    .filter(phrase => !phrase.skipped)
    .find((phrase, index) => {
      found = index;
      return !phrase.spoken && !phrase.skipped;
    });

  if (!phrase) {
    console.error('No phrase available', phrase);
    throw Error('No phrases available');
  }

  return {
    groupId: group.groupId,
    phrase: {
      id: phrase.id,
      text: phrase.text,
    },
    cover: group.cover,
    currentStep: found + 1,
    requiredSteps: group.stepsCap,
    totalSteps: group.total,
    skippedSteps: group.skippedSteps,
  };
};

const confirmStep = async (
  state: RecordingStateModel,
  data: Blob,
  durationMs: number,
): Promise<RecordingConfirmation> => {
  return await sendRecording(
    {
      groupId: state.groupId,
      phraseId: state.phrase.id,
      sampleRate: 16000,
      duration: durationMs,
      additionalMetadata: {
        userAgent: navigator.userAgent,
      },
    },
    data,
  );
};
const assignName = async (name: string): Promise<void> => {
  return await registrationIntegrationService.assignName(name);
};

export { findNextStep, confirmStep, assignName };
