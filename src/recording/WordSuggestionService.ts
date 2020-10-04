import { map } from 'rxjs/operators';
import { get } from '../apis/api';
import config from '../config';
import { RecordingGroupModel } from './models/RecordingGroupModel';

export default class WordSuggestionService {
  constructor() {
    console.log('Initialized WordSuggestionService');
  }

  public async getGroup(
    groupId: string,
  ): Promise<RecordingGroupModel> { // @todo fix any pls
    const url = `${config.endpoints.phraseGroup}/${groupId}`;
    return await get<any>(url).pipe(
      map((data): RecordingGroupModel => { // move this to backend
        return new RecordingGroupModel(data);
      }),
    ).toPromise();
  }
}
