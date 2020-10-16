import { map } from 'rxjs/operators';
import { get } from '../../apis/api';
import config from '../../config';
import { RecordingGroupModel } from '../models/RecordingGroupModel';

const getGroup = async (
  groupId: string,
): Promise<RecordingGroupModel> => {
  const url = `${config.endpoints.phraseGroup}/${groupId}`;
  return await get<any>(url).pipe(
    map((data): RecordingGroupModel => { // move this to backend
      return new RecordingGroupModel(data);
    }),
  ).toPromise();
}

const getRandomGroup = async (): Promise<string> => {
  const url = config.endpoints.randomPhraseGroup;
  return await get<any>(url).pipe(
    map((data): string => { // move this to backend
      return data?.title;
    }),
  ).toPromise();
}

export {
  getGroup,
  getRandomGroup,
};
