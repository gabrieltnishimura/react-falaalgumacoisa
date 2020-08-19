import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { get, post } from '../apis/api';
import config from '../config';
import wordSuggestionStream from './WordSuggestionStream';

export default class WordSuggestionService {
  public nextWord(): Observable<void> {
    const url = config.endpoints.suggestions;
    return get<string>(url, undefined, 'text')
      .pipe(
        map(wordSuggestionStream.pushWord),
      );
  }

  public blacklist(word: string, reason: string): Observable<void> {
    const url = config.endpoints.blacklist;
    return post<void>(url, { word });
  }
}