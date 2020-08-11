import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { get } from '../apis/api';

export default class WordSuggestionService {
  public nextWord(): Observable<string> {
    const url = 'https://node-masters-recording-back.herokuapp.com/suggestions';
    return get<string>(url, undefined, 'text')
      .pipe(
        map((data: any) => {
          if (!data) {
            return '';
          }
          return data;
        }),
      )
  }
}