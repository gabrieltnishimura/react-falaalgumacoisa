import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UnauthenticatedRoute = (props: { redirectIfLogged?: string, isAuth?: boolean }) => {
  return props.isAuth !== undefined ? <Outlet /> : <></>
};

export default UnauthenticatedRoute;
