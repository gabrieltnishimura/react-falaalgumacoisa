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
  const friendsLeaderboard = new UserListModel(response);
  if (friendsLeaderboard.ranking.length === 1 && // exclude loners
    friendsLeaderboard.ranking[0].id === friendsLeaderboard?.user?.id) {
    friendsLeaderboard.ranking = [];
  }
  return friendsLeaderboard;
}

export {
  getGlobalLeaderboard,
  getFriendsLeaderboard,
};
