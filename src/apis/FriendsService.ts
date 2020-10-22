import config from '../config';
import UserListModel from '../shared/UserListModel';
import { get, post } from './api';

const getFriends = async (search: string): Promise<UserListModel> => {
  const url = config.endpoints.searchFriends;
  const response = await get<any>(url, { q: search }).toPromise();
  return new UserListModel(response);
}

const actOnFriend = async (
  friendId: string,
  actions: {
    follow: boolean,
    unfollow: boolean,
  },
): Promise<void> => {
  const url = config.endpoints.friendsActions;
  return await post<any>(url, { friendId, actions }).toPromise();
}

export {
  getFriends,
  actOnFriend,
};
