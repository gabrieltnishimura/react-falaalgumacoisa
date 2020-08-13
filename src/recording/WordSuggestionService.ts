import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { get, post } from '../apis/api';
import wordSuggestionStream from './WordSuggestionStream';
export default class WordSuggestionService {
  public nextWord(): Observable<void> {
    const url = 'https://node-masters-recording-back.herokuapp.com/suggestions';
    return get<string>(url, undefined, 'text')
      .pipe(
        map(wordSuggestionStream.pushWord),
      );
  }

  public blacklist(word: string, reason: string): Observable<void> {
    const url = 'https://node-masters-recording-back.herokuapp.com/suggestions/blacklist';
    return post<void>(url, { word });
  }
}