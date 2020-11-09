import { ThemeProvider } from "@material-ui/core";
import * as Sentry from "@sentry/react";
import React from 'react';
import Application from './Application';
import UserProvider from './authentication/UserProvider';
import ErrorPage from "./error/ErrorPage";
import { LoaderProvider } from './shared/loader/LoaderContext';
import theme from './shell/theme';

function App() {
  return (
    <UserProvider>
      <LoaderProvider>
        <Sentry.ErrorBoundary fallback={<ErrorPage />}>
          <ThemeProvider theme={theme}>
            <Application />
          </ThemeProvider>
        </Sentry.ErrorBoundary>
      </LoaderProvider>
    </UserProvider>
  );
}

export default App;
