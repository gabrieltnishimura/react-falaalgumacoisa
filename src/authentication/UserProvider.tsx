import React, { Component, createContext } from "react";
import * as registrationIntegrationService from '../registration/RegistrationIntegrationService';
import { auth, authenticationService } from './AuthenticationService';
import UserMetadataModel from "./UserMetadataModel";
import UserModel from "./UserModel";

export interface UserContextInput {
  user: UserModel | undefined,
  metadata: UserMetadataModel | undefined,
}

const defaultState: UserContextInput = {
  user: undefined,
  metadata: undefined
}

export const UserContext = createContext<UserContextInput>(defaultState);
class UserProvider extends Component {
  state = defaultState;

  componentDidMount = () => {
    auth.onAuthStateChanged(userAuth => {
      const user = userAuth && new UserModel(userAuth);
      if (user) {
        authenticationService.setUser(user);
        registrationIntegrationService.getUserMetadata()
          .then((metadata) => {
            if (metadata && metadata.nickname) {
              this.setState({ user, metadata });
            } else {
              this.setState({ user });
            }
          }).catch(() => {
            this.setState({ user });
          });
      } else {
        this.setState({ user });
      }
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