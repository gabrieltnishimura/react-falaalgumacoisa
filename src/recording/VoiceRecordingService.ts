const OpusRecorder = require('opus-recorder');
export default class VoiceRecordingService {
  private recorder: any;
  private callback: Function | undefined;

  constructor() {
    this.recorder = new OpusRecorder({
      encoderPath: '/waveWorker.min.js'
    });
    this.recorder.onstreamerror = this.onStreamError.bind(this);
    this.recorder.ondataavailable = this.onDataReceived.bind(this);
  }

  public start(): void {
    if (!this.recorder || this.recorder.state === 'recording') {
      return;
    }

    console.group('Recording');
    console.log('Started');
    this.recorder.start().catch((error: any) => {
      console.log('Error encountered');
    });
  }

  public stop() {
    console.log(this.recorder.state, this.recorder)
    if (!this.recorder || this.recorder.state === 'inactive') {
      return null;
    }

    this.recorder.stop();
    console.log('Ended');
    console.groupEnd();
  }

  public onDataCallback(callback: Function) {
    this.callback = callback;
  }

  private onDataReceived(data: any) {
    const blob = new Blob([data], { type: 'audio/wav' });
    if (this.callback) {
      this.callback(blob);
    }
    // var fileName = new Date().toISOString() + ".wav";
    // var url = URL.createObjectURL( dataBlob );
  }

  private onStreamError(error: any) {
    console.error('Error encountered: ' + error.message);
  }
}