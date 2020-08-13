
export default class VoiceRecordingService {
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

  public stop(): Blob | null {
    if (!this.recorder || this.recorder.state === 'inactive') {
      return null;
    }

    this.recorder.stop();
    console.log('Ended', this.chunks.length);
    console.groupEnd();
    return this.getAudio();
  }

  private onDataReceived(e: BlobEvent) {
    if (this.chunks && this.chunks.length >= 0 && e.data && e.data.size > 0) {
      this.chunks.push(e.data);
    }
  }

  private getAudio(): Blob | null {
    if (!this.chunks.length) {
      return null;
    }

    return new Blob(this.chunks, { type: 'audio/*' });
  }
}