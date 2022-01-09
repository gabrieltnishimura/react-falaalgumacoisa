import React, { useEffect } from 'react';
import { authenticationService } from './AuthenticationService';

const AutoAuthenticationRoute = (props: { isAuth?: boolean, children: JSX.Element }) => {
  useEffect(() => {
    if (props.isAuth === null) {
      authenticationService.anonymousLogin();
    }
  }, [props.isAuth])

  console.log(props.isAuth);

  return !!props.isAuth ? props.children : <></>
};

export default AutoAuthenticationRoute;
