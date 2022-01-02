import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props: { isAuth: boolean | undefined, children: JSX.Element }) => {
  if (props.isAuth === null) {
    return <Navigate to="/login" />;
  }

  return props.isAuth !== undefined ? props.children : <></>
};

export default ProtectedRoute;
