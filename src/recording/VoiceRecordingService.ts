
export default class VoiceRecordingService {
  private recorder: MediaRecorder | undefined;
  private recording: boolean = false;
  private chunks: Blob[] = [];

  constructor() {
    if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Navigator not supported');
      return;
    }
    const constraints = {
      audio: true
    };

    const onSuccess = (stream: MediaStream) => {
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = this.onDataReceived.bind(this);
    }

    const onError = function (err: any) {
      console.log('The following error occured: ' + err);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess.bind(this), onError.bind(this));
  }

  public start(): void {
    if (!this.recorder || this.recording) {
      return;
    }

    console.group('Recording');
    console.log('Started');
    this.chunks = [];
    this.recording = true;
    this.recorder.start(1); // magic number
  }

  public stop(): void {
    if (!this.recorder || !this.recording) {
      return;
    }

    this.recorder.stop();
    console.log('Ended', this.chunks.length);
    console.groupEnd();
    this.recording = false;
  }

  public getData(): Blob | null {
    if (!this.chunks.length) {
      return null;
    }

    return new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
  }

  private onDataReceived(e: BlobEvent) {
    if (this.chunks && this.chunks.length >= 0 && e.data && e.data.size > 0) {
      this.chunks.push(e.data);
    }
  }
}