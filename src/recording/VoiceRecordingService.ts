import { getAudioFormat } from '../shared/utils';
export interface AudioInfo {
  url: string;
  blob: Blob;
}

export default class VoiceRecordingService {
  private recorder: any;
  private recording: boolean = false;
  private chunks: Blob[] = [];
  private recorderListeners: {
    start: Function | null;
    dataavailable: Function | null;
    stop: Function | null;
  };

  constructor() {
    this.recorderListeners = {
      start: null,
      dataavailable: null,
      stop: null,
    };
  }

  public setupRecording(): Promise<void> {
    console.log('Starting recorder')
    if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Navigator not supported');
      return Promise.reject();
    }
    const constraints = {
      audio: true
    };

    const onSuccess = (stream: MediaStream) => {
      this.recorder = new window.MediaRecorder(stream);
    }

    const onError = function (err: any) {
      console.log('The following error occured: ' + err);
    }

    return navigator.mediaDevices.getUserMedia(constraints).then(onSuccess.bind(this), onError.bind(this));
  }

  public start(): Promise<void> {
    if (!this.recorder || this.recording) {
      console.error('Cannot record audio before microhphone is ready.');
      return Promise.resolve();
    }

    return new Promise<void>((res: Function, rej: Function) => {
      if (!this.recorder || !this.recorderListeners) {
        return;
      }

      this.chunks = [];
      // Remove the old listeners.
      this.recorder.removeEventListener('start', () => { });
      this.recorder.removeEventListener('dataavailable', () => { });
      // Add the new listeners.
      this.recorder.addEventListener('start', (e: Event) => res());
      this.recorder.addEventListener(
        'dataavailable',
        (e: BlobEvent) => {
          this.chunks.push(e.data);
        }
      );

      console.group('Recording');
      console.log('Started');
      // Finally, start it up.
      // We want to be able to record up to 60s of audio in a single blob.
      // Without this argument to start(), Chrome will call dataavailable
      // very frequently.
      this.recording = true;
      this.recorder.start(20000);
    });
  }

  public stop(): Promise<AudioInfo> {
    if (!this.recorder || !this.recording) {
      console.error('Cannot stop audio before microphone is ready.');
      return Promise.reject();
    }

    return new Promise((res: Function, rej: Function) => {
      this.recorder.removeEventListener('stop', () => { });
      this.recorder.addEventListener('stop', (e: Event) => {
        this.recording = false;
        console.log('Ended', this.chunks.length);
        console.groupEnd();
        let blob = new Blob(this.chunks, { type: getAudioFormat() });
        res({
          url: URL.createObjectURL(blob),
          blob: blob,
        });
      });
      this.recorder.stop();
    });
  }

  public getData(): Blob | null {
    if (!this.chunks.length) {
      return null;
    }

    return new Blob(this.chunks, { type: getAudioFormat() });
  }

  private onDataReceived(e: BlobEvent) {
    if (this.chunks && this.chunks.length >= 0 && e.data && e.data.size > 0) {
      this.chunks.push(e.data);
    }
  }
}