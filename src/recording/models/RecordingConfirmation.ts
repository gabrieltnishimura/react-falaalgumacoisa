import { RecordingModalTypes } from './RecordingModalTypes';
export default class RecordingConfirmation {
  modal?: {
    type: RecordingModalTypes,
    content: any;
  };
  hasNext: boolean;

  constructor(data: any) {
    if (data.modal) {
      this.modal = {
        type: data.modal.type,
        content: data.modal.content,
      };
    }
    this.hasNext = Boolean(data.hasNext);

    // move to backend
    this.modal = {
      type: RecordingModalTypes.FIRST_RECORDING,
      content: {}
    };
  }
}
