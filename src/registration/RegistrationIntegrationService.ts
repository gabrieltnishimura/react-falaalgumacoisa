import { post } from '../apis/api';
import config from '../config';
import { RegistrationDataModel } from './RegistrationDataModel';

const sendRegistrationData = (data: RegistrationDataModel) => {
  const url = config.endpoints.registration;
  return post<void>(url, data).toPromise();
}

export {
  sendRegistrationData,
};
