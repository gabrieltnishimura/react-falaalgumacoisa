import React, { Component, createContext } from "react";
import { auth, authenticationService } from './AuthenticationService';
import UserModel from "./UserModel";

export const UserContext = createContext<{ user: UserModel | undefined }>({ user: undefined });
class UserProvider extends Component {
  state = {
    user: undefined
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      const user = userAuth && new UserModel(userAuth);
      if (user) {
        authenticationService.setUser(user);
      }
      this.setState({ user });
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;