import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../authentication/AuthenticationService';

function CanI(props: { children: any, onSuccessRoute?: string }) {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  const onSuccessRoute = props?.onSuccessRoute;


  useEffect(() => {
    const redirectStream = authenticationService.getAuthRedirect().toPromise();
    const stateStream = authenticationService.getLatestState().toPromise();
    Promise.all([redirectStream, stateStream]).then(([redirect, state]) => {
      if (!!redirect?.name || !!state?.name) {
        if (onSuccessRoute) {
          navigate(onSuccessRoute, { replace: true });
          return;
        }
        setLogged(true);
      } else {
        if (onSuccessRoute) {
          setLogged(true);
          return;
        }
        navigate('/', { replace: true });
      }
    });
  }, [setLogged, navigate, onSuccessRoute]);

  return logged ?
    props.children : <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />;
}

export default CanI;
