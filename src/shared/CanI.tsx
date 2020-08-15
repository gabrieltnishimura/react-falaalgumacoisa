import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../authentication/AuthenticationService';
import UserModel from '../authentication/UserModel';

function CanI(props: { children: any }) {
  const [user, setUser] = useState<UserModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const subs = authenticationService.getLatestState()
      .subscribe((firebaseUser) => {
        setUser(firebaseUser);
      }, (error) => {
        console.log('error', error)
        navigate('/', { replace: true });
      });
    return () => subs.unsubscribe();
  }, [navigate])

  return user ?
    props.children : <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />;
}

export default CanI;
