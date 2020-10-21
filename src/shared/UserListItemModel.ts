export default class UserListItemModel {
  nickname: {
    full: string,
    short: string,
  };
  position?: number;
  score?: number;
  actions?: {
    follow: boolean,
    unfollow: boolean,
  };

  constructor(data: any) {
    this.nickname = data.nickname && {
      full: data.nickname.full.substr(0, 19),
      short: data.nickname.short,
    };
    if (data.position !== undefined) {
      this.position = parseInt(data.position, 10) + 1;
    }
    if (data.score !== undefined) {
      this.score = parseInt(data.score, 10);
    }
    this.actions = data.actions && {
      follow: Boolean(data.actions.follow),
      unfollow: Boolean(data.actions.unfollow),
    }
  }
}
