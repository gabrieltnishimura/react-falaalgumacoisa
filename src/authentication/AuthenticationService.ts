import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from '../config';
import UserModel from './UserModel';

const app = firebase.initializeApp(config.firebaseConfig);
const auth = app.auth();
let _user: UserModel;

const authenticationService = {
  login: (type: 'facebook' | 'google'): void => {
    const provider = type === 'google' ?
      new firebase.auth.GoogleAuthProvider() :
      new firebase.auth.FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth.languageCode = 'pt';
    auth.signInWithRedirect(provider);
  },
  loginWithUsername: (username: string, password: string) => {
    console.log('trying to login with: ', username, password);
  },
  anonymousLogin: () => {
    console.log('logging in anonymously');
    auth.signInAnonymously()
  },
  logout: auth.signOut,
  setUser: (user: firebase.User) => {
    _user = new UserModel(user);
  },
  getUser: (): UserModel => {
    return _user;
  }
};

export {
  authenticationService,
  auth,
};
