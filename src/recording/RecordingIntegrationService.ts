import { map } from 'rxjs/operators';
import { post } from '../apis/api';
import config from '../config';
import { getAudioFormat } from '../shared/utils';
import RecordingConfirmation from './models/RecordingConfirmation';
import RecordingTextModel from './models/RecordingTextModel';

interface RecordingMetadata {
  groupId: string;
  phraseId: string;
  sampleRate: number;
  additionalMetadata?: {
    userAgent: string;
  };
}

export default class RecordingIntegrationService {
  public sendRecording(recordingMetadata: RecordingMetadata, blob: Blob): Promise<RecordingConfirmation> {
    const formData = this.parseFormData(recordingMetadata, blob);
    const url = config.endpoints.sendRecording;
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
    const url = config.endpoints.skipRecording;
    return post<void>(url, { themeId: groupId, phraseId: phrase.id, reason }).toPromise();
  }

  public assignName(name: string): Promise<void> {
    const url = config.endpoints.assignName;
    return post<void>(url, { name }).toPromise();
  }

  private parseFormData(data: RecordingMetadata, blob: Blob): FormData {
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
}