import { getAudioFormat } from '../../shared/utils';
export interface AudioInfo {
  url: string;
  blob: Blob;
  durationMs: number;
}

let recorder: any;
let recording: boolean = false;
let chunks: Blob[] = [];
let startAt: number;
let recorderListeners: {
  start: Function | null;
  dataavailable: Function | null;
  stop: Function | null;
} = {
  start: null,
  dataavailable: null,
  stop: null,
};

const setupRecording = (): Promise<void> => {
  recorderListeners = {
    start: null,
    dataavailable: null,
    stop: null,
  };

  console.log('Starting recorder');
  if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('Navigator not supported');
    return Promise.reject();
  }
  const constraints = {
    audio: true,
  };

  const onSuccess = (stream: MediaStream) => {
    recorder = new window.MediaRecorder(stream);
    return Promise.resolve();
  };

  const onError = function (err: any) {
    console.log('The following error occured: ' + err);
    return Promise.reject(err);
  };

  return navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
};

const start = (): Promise<void> => {
  if (!recorder || recording) {
    console.error('Cannot record audio before microhphone is ready.');
    return Promise.resolve();
  }

  return new Promise<void>((res: Function, rej: Function) => {
    if (!recorder || !recorderListeners) {
      return;
    }

    chunks = [];
    // Remove the old listeners.
    recorder.removeEventListener('start', recorderListeners.start);
    recorder.removeEventListener('dataavailable', recorderListeners.dataavailable);
    // Populate new listeners
    recorderListeners.start = (e: Event) => res();
    recorderListeners.dataavailable = (e: BlobEvent) => {
      chunks.push(e.data);
    };
    // Add the new listeners.
    recorder.addEventListener('start', recorderListeners.start);
    recorder.addEventListener('dataavailable', recorderListeners.dataavailable);

    console.group('Recording');
    startAt = performance.now();
    console.log('Started');
    recording = true;
    recorder.start(20000); // magic number
  });
};

const stop = (): Promise<AudioInfo> => {
  if (!recorder || !recording) {
    console.error('Cannot stop audio before microphone is ready.');
    return Promise.reject();
  }

  return new Promise<AudioInfo>((res: Function, rej: Function) => {
    recorder.removeEventListener('stop', recorderListeners.stop);
    recorderListeners.stop = (e: Event) => {
      recording = false;
      const durationMs = performance.now() - startAt;
      console.log('Ended', durationMs, chunks.length);
      console.groupEnd();
      let blob = new Blob(chunks, { type: getAudioFormat() });
      res({
        url: URL.createObjectURL(blob),
        blob: blob,
        durationMs,
      });
    };
    recorder.addEventListener('stop', recorderListeners.stop);
    recorder.stop();
  });
};

const getData = (): Blob | null => {
  if (!chunks.length) {
    return null;
  }

  return new Blob(chunks, { type: getAudioFormat() });
};

export { setupRecording, start, stop, getData };
