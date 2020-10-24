import { post } from '../apis/api';
import config from '../config';
import { getAudioFormat } from '../shared/utils';
import RecordingConfirmation from './models/RecordingConfirmation';
import RecordingTextModel from './models/RecordingTextModel';

export interface RecordingMetadata {
  groupId: string;
  phraseId: string;
  sampleRate: number;
  additionalMetadata?: {
    userAgent: string;
  };
}

const sendRecording = async (recordingMetadata: RecordingMetadata, blob: Blob): Promise<RecordingConfirmation> => {
  const formData = parseFormData(recordingMetadata, blob);
  const url = config.endpoints.sendRecording;
  const response = await post<string>(url, formData).toPromise();
  return new RecordingConfirmation(response);
}

const skipPhrase = (
  phrase: RecordingTextModel,
  groupId: string,
  reason: string,
  customReason?: string,
): Promise<void> => {
  const url = config.endpoints.skipRecording;
  return post<void>(url, { themeId: groupId, phraseId: phrase.id, reason, customReason }).toPromise();
}

const parseFormData = (data: RecordingMetadata, blob: Blob): FormData => {
  const formData = new FormData();
  const filename = getAudioFormat().indexOf('wav') ? 'file.webm' : 'file.wav';
  formData.set('file', blob, filename);
  formData.set('themeId', data.groupId);
  formData.set('phraseId', data.phraseId);
  formData.set('sampleRate', data.sampleRate?.toString());
  if (data.additionalMetadata?.userAgent) {
    formData.set('additionalMetadata.userAgent', data.additionalMetadata.userAgent);
  }
  return formData;
}

export {
  sendRecording,
  skipPhrase,
};
