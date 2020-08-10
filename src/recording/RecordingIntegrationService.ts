import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { post } from '../apis/api';

export default class RecordingIntegrationService {
  constructor() { }

  public send(data: Blob): Observable<void> {
    return post<string>('asd', data)
      .pipe(
        tap(a => {
          console.log('data', a);
        }),
        map(() => {
          return;
        })
      )
  }
}