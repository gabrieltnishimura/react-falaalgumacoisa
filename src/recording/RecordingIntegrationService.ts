import { map } from 'rxjs/operators';
import { post } from '../apis/api';
import config from '../config';
import { getAudioFormat } from '../shared/utils';
import RecordingConfirmation from './models/RecordingConfirmation';
import RecordingTextModel from './models/RecordingTextModel';

interface RecordingMetadata {
  phraseId: string;
  sampleRate: number;
  additionalMetadata?: {
    userAgent: string;
  };
}

export default class RecordingIntegrationService {
  public sendRecording(recordingMetadata: RecordingMetadata, groupId: string, blob: Blob): Promise<RecordingConfirmation> {
    const formData = this.parseFormData(recordingMetadata, blob);
    const url = `${config.endpoints.sendRecording}/${groupId}`;
    return post<string>(url, formData)
      .pipe(
        map((data: any) => new RecordingConfirmation(data)),
      ).toPromise();
  }

  public skipPhrase(
    phrase: RecordingTextModel,
    groupId: string,
    reason: string,
  ): Promise<void> {
    const url = `${config.endpoints.skipRecording}/${groupId}`;
    return post<void>(url, { phraseId: phrase.id, reason }).toPromise();
  }

  private parseFormData(data: RecordingMetadata, blob: Blob): FormData {
    const formData = new FormData();
    const filename = getAudioFormat().indexOf('wav') ? 'file.webm' : 'file.wav';
    formData.set('file', blob, filename);
    formData.set('phraseId', data.phraseId);
    formData.set('sampleRate', data.sampleRate?.toString());
    if (data.additionalMetadata?.userAgent) {
      formData.set('additionalMetadata.userAgent', data.additionalMetadata.userAgent);
    }
    return formData;
  }
}