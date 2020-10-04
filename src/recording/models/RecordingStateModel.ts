import RecordingTextModel from './RecordingTextModel';

export default class RecordingStateModel {
  groupId: string;
  phrase: RecordingTextModel;
  step: number;
  totalSteps: number;

  constructor(data: any) {
    this.groupId = data.groupId;
    this.phrase = {
      id: data.id,
      text: data.text,
    };
    this.step = data.step;
    this.totalSteps = data.totalSteps;
  }
}
