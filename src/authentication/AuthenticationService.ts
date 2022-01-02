import * as firebase from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  UserCredential,
  updatePassword,
  updateEmail,
} from 'firebase/auth';
import { post } from '../apis/api';
import config from '../config';
import UserModel from './UserModel';

firebase.initializeApp(config.firebaseConfig);
const auth = getAuth();
let _user: UserModel;

const SESSION_STORAGE_TOKEN_KEY = 'old_token';

const setOldToken = async (): Promise<void> => {
  const token = (await _user?.getToken()) || '';
  if (token) {
    sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, token);
  }
};

const login = async (type: 'facebook' | 'google'): Promise<void> => {
  const provider = type === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
  auth.languageCode = 'pt';

  await setOldToken();
  return signInWithRedirect(auth, provider);
};

const loginWithUsername = (username: string, password: string) => {
  return signInWithEmailAndPassword(auth, username, password);
};

const createUser = async (username: string, password: string): Promise<UserCredential> => {
  await setOldToken();
  return createUserWithEmailAndPassword(auth, username, password);
};

const changeEmail = async (username: string, password: string, newUsername: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, username, password);
  await updateEmail(userCredential?.user, newUsername);
};

const changePassword = async (username: string, password: string, newPassword: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, username, password);
  await updatePassword(userCredential?.user, newPassword);
};

const anonymousLogin = async () => {
  console.log('logging in anonymously');
  try {
    return signInAnonymously(auth);
  } catch (err) {
    console.error('could not login anonymously', err);
    return Promise.reject(err);
  }
};

const getOldToken = (): string | null => {
  return sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY);
};

const removeOldToken = (): void => {
  sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
};

const mergeUser = async () => {
  const oldToken = getOldToken();
  return post('', { oldToken });
};

const logout = () => {
  console.log('logging off');
  return auth.signOut();
};

const getRedirect = () => {
  return getRedirectResult(auth);
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
  createUser,
  changeEmail,
  changePassword,
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

export { authenticationService, auth };
