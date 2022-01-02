import { lastValueFrom } from 'rxjs';
import { get, post } from '../apis/api';
import { authenticationService } from '../authentication/AuthenticationService';
import UserMetadataModel from '../authentication/UserMetadataModel';
import config from '../config';
import DashboardNotificationModel from '../dashboard/DashboardNotificationModel';
import { RegistrationDataModel } from './RegistrationDataModel';

const sendRegistrationData = (data: RegistrationDataModel) => {
  const url = config.endpoints.registration;
  return lastValueFrom(
    post<void>(url, {
      ...data,
    }),
  );
};

const assignName = (name: string): Promise<void> => {
  const url = config.endpoints.assignName;
  return lastValueFrom(post<void>(url, { name }));
};

const validateNickname = (nickname: string): Promise<void> => {
  const url = config.endpoints.validateNickname;
  return lastValueFrom(post<void>(url, { nickname }));
};

const deleteUser = (keepUserData: boolean, reason: string): Promise<void> => {
  const url = config.endpoints.deleteUser;
  return lastValueFrom(post<void>(url, { keepUserData, reason }));
};

const getUserMetadata = async (): Promise<UserMetadataModel> => {
  const url = config.endpoints.userMetadata;
  const response = await lastValueFrom(get<any>(url));

  const notifications = (
    response?.notifications?.map((notification: any) => {
      const baseNotification: DashboardNotificationModel = {
        type: notification.type,
      };
      if (notification.type === 'FOLLOW') {
        baseNotification.follow = notification.follow && {
          id: notification.follow.id,
          name: notification.follow.name,
        };
        return baseNotification;
      } else {
        return null;
      }
    }) || []
  ).filter((notification: DashboardNotificationModel) => !!notification);

  return {
    nickname: response.nickname,
    ageInterval: response.ageInterval,
    dialect: response.dialect,
    gender: response.gender,
    region: response.region,
    notifications,
  };
};

const mergeUserData = async () => {
  const url = config.endpoints.mergeUserData;
  const oldToken = authenticationService.getOldToken();
  await lastValueFrom(post(url, { oldToken }));
  authenticationService.removeOldToken();
};

const getReferralCode = async () => {
  const url = config.endpoints.referralCode;
  return lastValueFrom(await get(url));
};

const getReferralFriendName = async (referCode: string): Promise<{ name: string }> => {
  const url = `${config.endpoints.referralFriendName}/${referCode}`;
  const response: any = await lastValueFrom(get(url));
  return {
    name: response.name,
  };
};

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
