import UserListItemModel from './UserListItemModel';

export default class UserListModel {
  ranking: UserListItemModel[];
  user: UserListItemModel;

  constructor(data: any) {
    this.ranking = data?.ranking
      ?.map((user: any) => new UserListItemModel(user));
    this.user = data.user && new UserListItemModel(data.user);
  }
}