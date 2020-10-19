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
    return auth.signInWithEmailAndPassword(username, password);
  },
  createUserWithEmailAndPassword: (username: string, password: string) => {
    return auth.createUserWithEmailAndPassword(username, password);
  },
  anonymousLogin: () => {
    console.log('logging in anonymously');
    return auth.signInAnonymously()
  },
  logout: () => {
    console.log('logging off');
    return auth.signOut();
  },
  delete: () => {
    return auth.currentUser?.delete();
  },
  setUser: (user: UserModel) => {
    _user = user;
  },
  getUser: (): UserModel => {
    return _user;
  }
};

export {
  authenticationService,
  auth,
};
