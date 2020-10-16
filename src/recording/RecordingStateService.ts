import RecordingConfirmation from './models/RecordingConfirmation';
import RecordingStateModel from './models/RecordingStateModel';
import RecordingIntegrationService from './RecordingIntegrationService';
import * as wordSuggestionService from './suggestions/WordSuggestionService';

const integrationService = new RecordingIntegrationService();

const getNextStep = async (groupId: string): Promise<RecordingStateModel> => {
  const group = await wordSuggestionService.getGroup(groupId);
  let found = -1;
  const phrase = group.phrases.find((phrase, index) => {
    found = index;
    return !phrase.spoken && !phrase.skipped;
  });

  if (!phrase) {
    console.error('No phrase available', phrase);
    throw Error('No phrases available');
  }

  return new RecordingStateModel({
    groupId: group.title,
    id: phrase.id,
    text: phrase.text,
    currentStep: (found + 1),
    totalSteps: group.stepsCap,
  });
}

const confirmStep = async (state: RecordingStateModel, data: Blob): Promise<RecordingConfirmation> => {
  return await integrationService.sendRecording({
    groupId: state.groupId,
    phraseId: state.phrase.id,
    sampleRate: 16000,
    additionalMetadata: {
      userAgent: navigator.userAgent,
    }
  }, data);
}

const skipStep = async (state: RecordingStateModel, reason: string): Promise<void> => {
  return await integrationService.skipPhrase(state.phrase, state.groupId, reason);
}

const assignName = async (name: string): Promise<void> => {
  return await integrationService.assignName(name);
}

export {
  getNextStep,
  confirmStep,
  skipStep,
  assignName,
};
