import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { post } from '../apis/api';
import config from '../config';

interface RecordingMetadata {
  word: string;
  sampleRate: number;
  noiseLevel: string;
  additionalMetadata: {
    userAgent: string;
  };
}

export default class RecordingIntegrationService {
  public send(recordingMetadata: RecordingMetadata, blob: Blob): Observable<void> {
    const formData = this.parseFormData(recordingMetadata, blob);
    const url = config.endpoints.sendRecording;
    return post<string>(url, formData)
      .pipe(
        tap(a => {
          console.log('data', a);
        }),
        map(() => {
          return;
        })
      )
  }

  private parseFormData(data: RecordingMetadata, blob: Blob): FormData {
    const formData = new FormData();
    formData.set('file', blob);
    formData.set('word', data.word);
    formData.set('type', blob.type);
    formData.set('noiseLevel', data.word);
    formData.set('speaker.initials', 'GN');
    return formData;
  }
}