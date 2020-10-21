import { get, post } from '../apis/api';
import config from '../config';
import { RegistrationDataModel } from './RegistrationDataModel';

const sendRegistrationData = (data: RegistrationDataModel) => {
  const url = config.endpoints.registration;
  return post<void>(url, data).toPromise();
}

const assignName = (name: string): Promise<void> => {
  const url = config.endpoints.assignName;
  return post<void>(url, { name }).toPromise();
}

const validateNickname = (nickname: string): Promise<void> => {
  const url = config.endpoints.validateNickname;
  return post<void>(url, { nickname }).toPromise();
}

const deleteUser = (reason: string): Promise<void> => {
  const url = config.endpoints.deleteUser;
  return post<void>(url, { reason }).toPromise();
}

const getUserMetadata = (): Promise<void> => {
  const url = config.endpoints.userMetadata;
  return get<any>(url).toPromise();
}

export {
  sendRegistrationData,
  assignName,
  validateNickname,
  deleteUser,
  getUserMetadata,
};
