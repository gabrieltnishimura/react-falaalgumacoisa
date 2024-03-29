import { User, UserInfo } from '@firebase/auth';

export default class UserModel {
  public name: string = '';
  public email: string = '';
  public isAnonymous: boolean = false;
  public uid: string = '';
  public isEmailLogin: boolean = false;
  private user: User | null = null;

  constructor(user: User | null) {
    if (!user) {
      return;
    }

    this.user = user;
    this.name = user.displayName || '';
    this.email = user.email || '';
    this.isAnonymous = user.isAnonymous;
    this.uid = user.uid || '';

    const socialMediaProvidersFn = (provider: UserInfo | null): boolean => {
      if (!provider || !provider.providerId) {
        return false;
      }

      return (
        provider?.providerId.indexOf('google') >= 0 || provider?.providerId.indexOf('facebook') >= 0
      );
    };
    this.isEmailLogin = user.providerData && !user.providerData.find(socialMediaProvidersFn);

    return this;
  }

  public getToken(): Promise<string> {
    if (!this.user) {
      return Promise.resolve('');
    }

    return this.user.getIdToken();
  }
}
