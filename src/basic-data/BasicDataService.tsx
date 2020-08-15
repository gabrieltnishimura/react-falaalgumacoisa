import { BasicDataModel } from './BasicDataModel';

export default class BasicDataService {
  public save(data: BasicDataModel): void {
    console.log('Saving', data);
  }
}