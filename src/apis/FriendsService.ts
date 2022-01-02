import { lastValueFrom } from 'rxjs';
import config from '../config';
import UserListModel from '../shared/UserListModel';
import { get, post } from './api';

const getFriends = async (search: string): Promise<UserListModel> => {
  const url = config.endpoints.searchFriends;
  const response = await lastValueFrom(get<any>(url, { q: search }));
  return new UserListModel(response);
};

const actOnFriend = async (
  friendId: string,
  actions: {
    follow: boolean;
    unfollow: boolean;
  },
): Promise<void> => {
  const url = config.endpoints.friendsActions;
  return await lastValueFrom(post<any>(url, { friendId, actions }));
};

export { getFriends, actOnFriend };
