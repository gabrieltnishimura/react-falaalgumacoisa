import React, { useEffect } from 'react';
import authenticationService from './authentication/AuthenticationService';
function HomePage() {

  useEffect(() => {
    const subs = authenticationService.login('google').subscribe(user => {
      console.log(user.name);
    });
    return () => subs.unsubscribe();
  }, []);

  return (
    <div>
      Welcome
    </div>
  );
}

export default HomePage;
