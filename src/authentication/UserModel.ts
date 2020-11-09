import * as firebase from 'firebase/app';

export default class UserModel {
  public name: string = '';
  public email: string = '';
  public isAnonymous: boolean = false;
  public uid: string = '';
  private user: firebase.User | null = null;

  constructor(user: firebase.User | null) {
    if (!user) {
      return;
    }

    this.user = user;
    this.name = user.displayName || '';
    this.email = user.email || '';
    this.isAnonymous = user.isAnonymous;
    this.uid = user.uid || '';

    return this;
  }

  public getToken(): Promise<string> {
    if (!this.user) {
      return Promise.resolve('');
    }

    return this.user.getIdToken();
  }
}