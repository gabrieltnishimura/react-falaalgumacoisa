import { get, post } from '../apis/api';
import { authenticationService } from '../authentication/AuthenticationService';
import config from '../config';
import { RegistrationDataModel } from './RegistrationDataModel';

const sendRegistrationData = (data: RegistrationDataModel) => {
  const url = config.endpoints.registration;
  const oldToken = authenticationService.getOldToken();
  return post<void>(url, {
    ...data,
    oldToken,
  }).toPromise();
}

const assignName = (name: string): Promise<void> => {
  const url = config.endpoints.assignName;
  return post<void>(url, { name }).toPromise();
}

const validateNickname = (nickname: string): Promise<void> => {
  const url = config.endpoints.validateNickname;
  return post<void>(url, { nickname }).toPromise();
}

const deleteUser = (keepUserData: boolean, reason: string): Promise<void> => {
  const url = config.endpoints.deleteUser;
  return post<void>(url, { keepUserData, reason }).toPromise();
}

const getUserMetadata = (): Promise<{ nickname: string }> => {
  const url = config.endpoints.userMetadata;
  return get<any>(url).toPromise();
}

const mergeUserData = async () => {
  const url = config.endpoints.mergeUserData;
  const oldToken = authenticationService.getOldToken();
  await post(url, { oldToken }).toPromise();
  authenticationService.removeOldToken();
}

export {
  sendRegistrationData,
  assignName,
  validateNickname,
  deleteUser,
  getUserMetadata,
  mergeUserData,
};
