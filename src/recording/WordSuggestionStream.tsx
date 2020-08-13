
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

const stream = new BehaviorSubject<string>('');

const wordSuggestionStream = {
  getWord: (): Observable<string> => stream.pipe(filter(w => !!w)),
  pushWord: (word: string): void => {
    stream.next(word);
  }
};

export default wordSuggestionStream;