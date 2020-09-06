import { BasicDataModel } from './BasicDataModel';

let userData: BasicDataModel = {};
export default class BasicDataService {
  public async save(data: BasicDataModel): Promise<void> {
    userData = {
      ...userData,
      ...data
    };

    console.log('Saving', userData);
    return Promise.resolve()
  }

  public async update(data: BasicDataModel): Promise<void> {
    console.log('Updating', data);
    userData = {
      ...userData,
      ...data
    };
    return Promise.resolve()
  }
}