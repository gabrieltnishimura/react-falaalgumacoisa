import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { authenticationService } from './AuthenticationService';
import LoaderWrapper from './LoaderWrapper';

const AutoAuthenticationRoute = (props: { component: any, path: string, redirectIfLogged?: string, isAuth?: boolean }) => {
  useEffect(() => {
    if (props.isAuth === null) {
      authenticationService.anonymousLogin();
    }
  }, [props.isAuth])

  return <LoaderWrapper loading={!!props.isAuth}>
    <Route path={props.path} element={props.component} />
  </LoaderWrapper>
};

export default AutoAuthenticationRoute;
