import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = (props: { component: any, redirectTo: string, isAuth: boolean | undefined, path: string }) => {
  if (props.isAuth === null) {
    return <Navigate to={props.redirectTo} />;
  }

  return props.isAuth !== undefined ?
    <Route path={props.path} element={props.component} /> : <></>
};

export default ProtectedRoute;
