export default class RecordingConfirmation {
  modal?: any;
  hasNext: boolean;

  constructor(data: any) {
    this.modal = data.modal;
    this.hasNext = Boolean(data.hasNext);
  }
}
