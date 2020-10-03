import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import LoaderWrapper from './LoaderWrapper';

const UnauthenticatedRoute = (props: { component: any, path: string, redirectIfLogged?: string, isAuth?: boolean }) => {
  if (props.redirectIfLogged !== undefined && props.isAuth) {
    return <Navigate to={props.redirectIfLogged} />;
  }

  return <LoaderWrapper loading={props.isAuth !== undefined}>
    <Route path={props.path} element={props.component} />
  </LoaderWrapper>
};

export default UnauthenticatedRoute;
