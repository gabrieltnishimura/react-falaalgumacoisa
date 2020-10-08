export enum RecordingConfirmationModalTypes {
  FIRST_RECORDING = 'FIRST_RECORDING',
  FIRST_THEME = 'FIRST_THEME',
}

export default class RecordingConfirmation {
  modal?: {
    type: RecordingConfirmationModalTypes,
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
      type: RecordingConfirmationModalTypes.FIRST_RECORDING,
      content: {}
    };
  }
}
