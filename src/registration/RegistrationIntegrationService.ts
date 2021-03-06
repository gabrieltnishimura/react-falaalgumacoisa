import { get, post } from '../apis/api';
import { authenticationService } from '../authentication/AuthenticationService';
import UserMetadataModel from '../authentication/UserMetadataModel';
import config from '../config';
import DashboardNotificationModel from '../dashboard/DashboardNotificationModel';
import { RegistrationDataModel } from './RegistrationDataModel';

const sendRegistrationData = (data: RegistrationDataModel) => {
  const url = config.endpoints.registration;
  return post<void>(url, {
    ...data,
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

const getUserMetadata = async (): Promise<UserMetadataModel> => {
  const url = config.endpoints.userMetadata;
  const response = await get<any>(url).toPromise();

  const notifications = (response?.notifications?.map((notification: any) => {
    const baseNotification: DashboardNotificationModel = {
      type: notification.type,
    }
    if (notification.type === 'FOLLOW') {
      baseNotification.follow = notification.follow && {
        id: notification.follow.id,
        name: notification.follow.name,
      }
      return baseNotification;
    } else {
      return null;
    }
  }) || [])
    .filter((notification: DashboardNotificationModel) => !!notification);

  return {
    nickname: response.nickname,
    ageInterval: response.ageInterval,
    dialect: response.dialect,
    gender: response.gender,
    region: response.region,
    notifications,
  };
}

const mergeUserData = async () => {
  const url = config.endpoints.mergeUserData;
  const oldToken = authenticationService.getOldToken();
  await post(url, { oldToken }).toPromise();
  authenticationService.removeOldToken();
}

const getReferralCode = async () => {
  const url = config.endpoints.referralCode;
  return await get(url).toPromise();
}

const getReferralFriendName = async (referCode: string): Promise<{ name: string }> => {
  const url = `${config.endpoints.referralFriendName}/${referCode}`;
  const response: any = await get(url).toPromise();
  return {
    name: response.name,
  };
}

export {
  sendRegistrationData,
  assignName,
  validateNickname,
  deleteUser,
  getUserMetadata,
  mergeUserData,
  getReferralCode,
  getReferralFriendName,
};
