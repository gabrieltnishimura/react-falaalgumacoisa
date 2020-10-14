import RecordingTextModel from './RecordingTextModel';

export default class RecordingStateModel {
  groupId: string;
  phrase: RecordingTextModel;
  currentStep: number;
  totalSteps: number;

  constructor(data: any) {
    this.groupId = data.groupId;
    this.phrase = {
      id: data.id,
      text: data.text,
    };
    this.currentStep = data.currentStep;
    this.totalSteps = data.totalSteps;
  }
}
