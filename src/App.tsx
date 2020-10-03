import React from 'react';
import Application from './Application';
import UserProvider from './authentication/UserProvider';

function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
