import React from 'react';
import authenticationService from './authentication/AuthenticationService';
function LoginPage() {
  const authenticate = () => {
    authenticationService.login('google');
  }
  const anonymousAuthenticate = () => {
    authenticationService.anonymousLogin();
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={authenticate}>Login</button>
      <button onClick={anonymousAuthenticate}>Anonymous</button>
    </div>
  );
}

export default LoginPage;