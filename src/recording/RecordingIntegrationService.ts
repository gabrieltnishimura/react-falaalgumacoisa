import { lastValueFrom } from 'rxjs';
import { post } from '../apis/api';
import config from '../config';
import { getAudioFormat } from '../shared/utils';
import RecordingConfirmation from './models/RecordingConfirmation';
import RecordingTextModel from './models/RecordingTextModel';

export interface RecordingMetadata {
  groupId: string;
  phraseId: string;
  sampleRate: number;
  duration: number;
  additionalMetadata?: {
    userAgent: string;
  };
}

const parseFormData = (data: RecordingMetadata, blob: Blob): FormData => {
  const formData = new FormData();
  const filename = getAudioFormat().indexOf('wav') ? 'file.webm' : 'file.wav';
  formData.set('file', blob, filename);
  formData.set('duration', String(data.duration));
  formData.set('themeId', data.groupId);
  formData.set('phraseId', data.phraseId);
  formData.set('sampleRate', data.sampleRate?.toString());
  if (data.additionalMetadata?.userAgent) {
    formData.set('additionalMetadata.userAgent', data.additionalMetadata.userAgent);
  }
  return formData;
};

const sendRecording = async (
  recordingMetadata: RecordingMetadata,
  blob: Blob,
): Promise<RecordingConfirmation> => {
  const formData = parseFormData(recordingMetadata, blob);
  const url = config.endpoints.sendRecording;
  const response = await lastValueFrom(post<string>(url, formData));
  return new RecordingConfirmation(response);
};

const skipPhrase = (
  phrase: RecordingTextModel,
  groupId: string,
  reason: string,
  customReason?: string,
): Promise<void> => {
  const url = config.endpoints.skipRecording;
  return lastValueFrom(
    post<void>(url, {
      themeId: groupId,
      phraseId: phrase.id,
      reason,
      customReason,
    }),
  );
};

export { sendRecording, skipPhrase };
