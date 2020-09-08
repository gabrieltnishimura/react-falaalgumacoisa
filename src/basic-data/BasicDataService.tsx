import { post } from '../apis/api';
import config from '../config';
import { BasicDataModel } from './BasicDataModel';

let userData: BasicDataModel = {};
export default class BasicDataService {
  public async update(data: BasicDataModel): Promise<void> {
    userData = {
      ...userData,
      ...data
    };
    console.log('Updating', userData);
    return Promise.resolve()
  }

  public async save(data: BasicDataModel): Promise<void> {
    userData = {
      ...userData,
      ...data
    };

    console.log('Saving', userData);

    const url = config.endpoints.basicData;
    return post<void>(url, { ...userData }).toPromise();
  }
}