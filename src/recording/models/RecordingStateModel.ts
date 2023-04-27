import RecordingTextModel from './RecordingTextModel';

export default interface RecordingStateModel {
  groupId: string;
  cover: string;
  phrase: RecordingTextModel;
  currentStep: number;
  requiredSteps: number;
  totalSteps: number;
  skippedSteps: number;
}
