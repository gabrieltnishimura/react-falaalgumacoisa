import * as firebase from 'firebase/app';
import 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import config from '../config';
import UserModel from './UserModel';

const app = firebase.initializeApp(config.firebaseConfig);
const auth = app.auth();
let user: UserModel;

const authenticationService = {
  getLatestState: (): Observable<UserModel> => {
    return new Observable(
      observer => {
        try {
          auth.onAuthStateChanged((firebaseUser) => {
            if (!firebaseUser) {
              observer.error('Unauthenticated user');
            } else {
              user = new UserModel(firebaseUser)
              observer.next(user);
            }
            observer.complete();
          });
        } catch (err) {
          observer.error(err);
          observer.complete();
        }
      }
    );
  },
  login: (type: 'facebook' | 'google'): Observable<UserModel> => {
    if (!!user) {
      return of(user);
    }

    const authProvider: firebase.auth.AuthProvider = type === 'facebook' ?
      new firebase.auth.FacebookAuthProvider() :
      new firebase.auth.GoogleAuthProvider();
    auth.languageCode = 'pt';
    return from(auth.signInWithPopup(authProvider))
      .pipe(
        map(credentials => {
          return new UserModel(credentials?.user);
        }),
        tap(data => {
          user = data;
        }),
      );
  },
  logout: (): Observable<void> => {
    return from(auth.signOut());
  },
  isLogged: (): boolean => {
    return !!user;
  },
  getUser: (): UserModel => {
    return user;
  },
};

export default authenticationService;