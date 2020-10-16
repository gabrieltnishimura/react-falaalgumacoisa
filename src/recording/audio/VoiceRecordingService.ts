import { getAudioFormat } from '../../shared/utils';
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
      this.recorder.removeEventListener('start', this.recorderListeners.start);
      this.recorder.removeEventListener('dataavailable', this.recorderListeners.dataavailable);
      // Populate new listeners
      this.recorderListeners.start = (e: Event) => res();
      this.recorderListeners.dataavailable = (e: BlobEvent) => {
        this.chunks.push(e.data);
      };
      // Add the new listeners.
      this.recorder.addEventListener('start', this.recorderListeners.start);
      this.recorder.addEventListener('dataavailable', this.recorderListeners.dataavailable);

      console.group('Recording');
      console.log('Started');
      this.recording = true;
      this.recorder.start(20000); // magic number
    });
  }

  public stop(): Promise<AudioInfo> {
    if (!this.recorder || !this.recording) {
      console.error('Cannot stop audio before microphone is ready.');
      return Promise.reject();
    }

    return new Promise((res: Function, rej: Function) => {
      this.recorder.removeEventListener('stop', this.recorderListeners.stop);
      this.recorderListeners.stop = (e: Event) => {
        this.recording = false;
        console.log('Ended', this.chunks.length);
        console.groupEnd();
        let blob = new Blob(this.chunks, { type: getAudioFormat() });
        res({
          url: URL.createObjectURL(blob),
          blob: blob,
        });
      };
      this.recorder.addEventListener('stop', this.recorderListeners.stop);
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