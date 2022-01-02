import { lastValueFrom } from 'rxjs';
import { get } from '../apis/api';
import config from '../config';
import UserListModel from '../shared/UserListModel';

const getGlobalLeaderboard = async (): Promise<UserListModel> => {
  const url = config.endpoints.globalLeaderboard;
  const response = await lastValueFrom(get<any>(url));
  return new UserListModel(response);
};

const getFriendsLeaderboard = async (): Promise<UserListModel> => {
  const url = config.endpoints.friendsLeaderboard;
  const response = await lastValueFrom(get<any>(url));
  const friendsLeaderboard = new UserListModel(response);
  if (
    friendsLeaderboard.ranking.length === 1 && // exclude loners
    friendsLeaderboard.ranking[0].id === friendsLeaderboard?.user?.id
  ) {
    friendsLeaderboard.ranking = [];
  }
  return friendsLeaderboard;
};

export { getGlobalLeaderboard, getFriendsLeaderboard };
