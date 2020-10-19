import * as Sentry from "@sentry/react";
import React from 'react';
import Application from './Application';
import UserProvider from './authentication/UserProvider';
import ErrorPage from "./error/ErrorPage";
import { LoaderProvider } from './shared/loader/LoaderContext';

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorPage />}>
      <UserProvider>
        <LoaderProvider>
          <Application />
        </LoaderProvider>
      </UserProvider>
    </Sentry.ErrorBoundary>
  );
}

export default App;
