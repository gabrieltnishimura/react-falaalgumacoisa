import React from 'react';
import Application from './Application';
import UserProvider from './authentication/UserProvider';
import { LoaderProvider } from './shared/loader/LoaderContext';

function App() {
  return (
    <UserProvider>
      <LoaderProvider>
        <Application />
      </LoaderProvider>
    </UserProvider>
  );
}

export default App;
