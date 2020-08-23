import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../authentication/AuthenticationService';

function CanI(props: { children: any }) {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    const redirectStream = authenticationService.getAuthRedirect().toPromise();
    const stateStream = authenticationService.getLatestState().toPromise();
    Promise.all([redirectStream, stateStream]).then(([redirect, state]) => {
      console.log(redirect, state);
      if (!!redirect?.name || !!state?.name) {
        setLogged(true);
      } else {
        navigate('/', { replace: true });
      }
    });
  }, [setLogged, navigate]);

  return logged ?
    props.children : <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />;
}

export default CanI;
