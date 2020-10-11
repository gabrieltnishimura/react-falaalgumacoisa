import React from 'react';
import { Navigate, Route } from 'react-router-dom';

// checks if logged and decides where to redirect
const RootDecisionRoute = (props: {
  path: string,
  rendersIfNotLogged: any,
  redirectIfLogged: string,
  isAuth?: boolean,
}) => {
  if (props.isAuth) {
    return <Navigate to={props.redirectIfLogged} />;
  }

  return props.isAuth !== undefined ?
    <Route path={props.path} element={props.rendersIfNotLogged} /> : <></>
};

export default RootDecisionRoute;
