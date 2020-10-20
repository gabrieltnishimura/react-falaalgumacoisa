import { get } from '../../apis/api';
import config from '../../config';
import { RecordingGroupModel } from '../models/RecordingGroupModel';

const getGroup = async (
  groupId: string,
): Promise<RecordingGroupModel> => {
  const url = `${config.endpoints.phraseGroup}/${groupId}`;
  const response = await get<any>(url).toPromise();
  return new RecordingGroupModel(response);
}

const getRandomGroup = async (): Promise<string> => {
  const url = config.endpoints.randomPhraseGroup;
  const response = await get<any>(url).toPromise();
  return response?.title;
}

export {
  getGroup,
  getRandomGroup,
};
