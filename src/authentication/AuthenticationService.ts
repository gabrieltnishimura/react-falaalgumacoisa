import * as firebase from 'firebase/app';
import 'firebase/auth';
import { post } from '../apis/api';
import config from '../config';
import UserModel from './UserModel';

const app = firebase.initializeApp(config.firebaseConfig);
const auth = app.auth();
let _user: UserModel;

const SESSION_STORAGE_TOKEN_KEY = 'old_token';

const setOldToken = async (): Promise<void> => {
  const token = await _user?.getToken() || '';
  if (token) {
    sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, token);
  }
}

const login = async (type: 'facebook' | 'google'): Promise<void> => {
  const provider = type === 'google' ?
    new firebase.auth.GoogleAuthProvider() :
    new firebase.auth.FacebookAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  auth.languageCode = 'pt';

  await setOldToken();
  return auth.signInWithRedirect(provider);
};

const loginWithUsername = (username: string, password: string) => {
  return auth.signInWithEmailAndPassword(username, password);
};

const createUserWithEmailAndPassword = async (username: string, password: string): Promise<firebase.auth.UserCredential> => {
  await setOldToken();
  return auth.createUserWithEmailAndPassword(username, password);
};

const anonymousLogin = () => {
  console.log('logging in anonymously');
  return auth.signInAnonymously()
    .catch(err => {
      console.error('could not login anonymously', err);
      return Promise.reject(err);
    });
};

const getOldToken = (): string | null => {
  return sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY);
}

const removeOldToken = (): void => {
  sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
}

const mergeUser = async () => {
  const oldToken = getOldToken();
  return post('', { oldToken });
};

const logout = () => {
  console.log('logging off');
  return auth.signOut();
};

const getRedirect = () => {
  return auth.getRedirectResult();
};

const removeUser = () => {
  return auth.currentUser?.delete();
};

const setUser = (user: UserModel) => {
  _user = user;
};

const getUser = (): UserModel => {
  return _user;
};

const authenticationService = {
  login,
  loginWithUsername,
  createUserWithEmailAndPassword,
  anonymousLogin,
  getOldToken,
  removeOldToken,
  mergeUser,
  logout,
  getRedirect,
  removeUser,
  setUser,
  getUser,
};

export {
  authenticationService,
  auth,
};
