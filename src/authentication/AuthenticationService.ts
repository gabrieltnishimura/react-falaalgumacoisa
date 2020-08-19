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
              console.log('user', firebaseUser);
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
    console.log('user', user)
    if (!!user) {
      return of(user);
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');

    provider.addScope('email');
    console.log('addedc scopes');
    provider.addScope('https://www.googleapis.com/auth/user.gender.read');
    console.log('addedc scopes');
    provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
    console.log(provider);
    app.auth().languageCode = 'pt';
    return from(app.auth().signInWithPopup(provider))
      .pipe(
        map(credentials => {
          console.log(credentials);
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