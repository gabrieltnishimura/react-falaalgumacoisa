import React from 'react';
import authenticationService from './authentication/AuthenticationService';
function HomePage() {
  const authenticate = () => {
    authenticationService.login('google');
  };

  return (
    <div>
      Welcome
      <button onClick={authenticate}>Login</button>
    </div>
  );
}

export default HomePage;
