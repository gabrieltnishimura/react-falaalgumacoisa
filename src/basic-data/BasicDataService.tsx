import { BasicDataModel } from './BasicDataModel';

export default class BasicDataService {
  public async save(data: BasicDataModel): Promise<void> {
    console.log('Saving', data);
    return Promise.resolve()
  }
}