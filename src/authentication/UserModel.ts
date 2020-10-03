import * as firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';

export default class UserModel {
  public name: string = '';
  public age: number = 0;
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

  public getToken(): Observable<string> {
    if (!this.user) {
      return of();
    }

    return from(this.user.getIdToken());
  }
}