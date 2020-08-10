
export class VoiceRecordingService {
  private recorder: MediaRecorder | undefined;
  private chunks: Blob[] = [];

  constructor() {
    if (!navigator || !navigator.mediaDevices) {
      console.error('Navigator not supported');
      return;
    }

    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then((stream) => {
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = this.onDataReceived.bind(this);
    })
  }

  public start(): void {
    if (!this.recorder || this.recorder.state === 'recording') {
      return;
    }

    console.group('Recording');
    console.log('Started');
    this.chunks = [];
    this.recorder.start(10); // magic number
  }

  public stop(): string {
    if (!this.recorder || this.recorder.state === 'inactive') {
      return '';
    }

    this.recorder.stop();
    console.log('Ended', this.chunks.length);
    console.groupEnd();
    return this.getAudioUrl();
  }

  private onDataReceived(e: BlobEvent) {
    if (this.chunks && this.chunks.length >= 0 && e.data && e.data.size > 0) {
      this.chunks.push(e.data);
    }
  }

  private getAudioUrl(): string {
    if (!this.chunks.length) {
      return '';
    }

    const blob = new Blob(this.chunks, { type: 'audio/*' });
    return window.URL.createObjectURL(blob);
  }
}