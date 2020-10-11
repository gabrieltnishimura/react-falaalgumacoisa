import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const UnauthenticatedRoute = (props: { component: any, path: string, redirectIfLogged?: string, isAuth?: boolean }) => {
  if (props.redirectIfLogged !== undefined && props.isAuth) {
    return <Navigate to={props.redirectIfLogged} />;
  }

  return props.isAuth !== undefined ?
    <Route path={props.path} element={props.component} /> : <></>
};

export default UnauthenticatedRoute;
