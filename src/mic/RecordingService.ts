
export class RecordingService {
  private recorder: MediaRecorder | undefined;
  private chunks: Blob[] = [];

  constructor() {
    if (!navigator || !navigator.mediaDevices) {
      console.error('Navigator not supported');
      return;
    }

    navigator.mediaDevices.getUserMedia({
      audio: true
    })
      .then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = this.onDataReceived.bind(this);
      })
  }

  public start(): void {
    if (!this.recorder || this.recorder.state === 'recording') {
      return;
    }

    this.chunks = [];
    this.recorder.start(10);
  }

  public stop(): void {
    if (!this.recorder || this.recorder.state === 'inactive') {
      return;
    }

    this.recorder.stop();
    this.saveAudio();
  }

  private onDataReceived(e: BlobEvent) {
    if (this.chunks && this.chunks.length >= 0 && e.data && e.data.size > 0) {
      this.chunks.push(e.data);
    }
  }

  private saveAudio() {
    const blob = new Blob(this.chunks, { type: 'audio/*' });
    const audioURL = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = audioURL;
    a.download = 'asd.webm';
    a.click();
    window.URL.revokeObjectURL(audioURL);
    a.remove();
  }
}