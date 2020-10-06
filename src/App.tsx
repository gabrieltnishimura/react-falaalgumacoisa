import React from 'react';
import Application from './Application';
import UserProvider from './authentication/UserProvider';
import { ModalProvider } from './modal/ModalContext';

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <Application />
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
