import React, { Component, createContext } from "react";
import { auth, authenticationService } from './AuthenticationService';

export const UserContext = createContext({ user: undefined });
class UserProvider extends Component {
  state = {
    user: undefined
  };
  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      console.log('state changed', userAuth);
      if (userAuth) {
        authenticationService.setUser(userAuth);
      }
      this.setState({ user: userAuth });
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