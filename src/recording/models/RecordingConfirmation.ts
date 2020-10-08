import { RecordingModalTypes } from './RecordingModalTypes';
export default class RecordingConfirmation {
  modal?: {
    type: RecordingModalTypes,
    score: number;
  };
  hasNext: boolean;

  constructor(data: any) {
    if (data.modal) {
      this.modal = {
        type: data.modal.type,
        score: parseInt(data.modal.score, 10),
      };
    }
    this.hasNext = Boolean(data.hasNext);
  }
}
