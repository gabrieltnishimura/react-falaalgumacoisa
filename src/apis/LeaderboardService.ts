import { get } from '../apis/api';
import config from '../config';
import UserListModel from '../shared/UserListModel';

const getGlobalLeaderboard = async (): Promise<UserListModel> => {
  const url = config.endpoints.globalLeaderboard;
  const response = await get<any>(url).toPromise();
  return new UserListModel(response);
}

const getFriendsLeaderboard = async (): Promise<UserListModel> => {
  const url = config.endpoints.friendsLeaderboard;
  const response = await get<any>(url).toPromise();
  return new UserListModel(response);
}

export {
  getGlobalLeaderboard,
  getFriendsLeaderboard,
};
