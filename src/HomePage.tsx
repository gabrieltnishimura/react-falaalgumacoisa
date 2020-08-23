import React from 'react';
import authenticationService from './authentication/AuthenticationService';
import Header from './shell/Header';

function HomePage() {
  const authenticate = () => {
    authenticationService.login('google');
  };

  return (
    <div>
      <Header></Header>
      <h1>Welcome</h1>
      <button onClick={authenticate}>Login</button>
    </div>
  );
}

export default HomePage;
