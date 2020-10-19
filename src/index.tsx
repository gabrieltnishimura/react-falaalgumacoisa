import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: "https://88ecbb9d767c4289b32bc7b4548b88e7@o433447.ingest.sentry.io/5388631",
  release: "falaalgumacoisa@" + process.env.npm_package_version,
});

// Start the app when DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const deferredPolyfills = [
    typeof window.MediaRecorder === 'undefined'
      ? require('audio-recorder-polyfill')
      : Promise.resolve(),
  ];

  const [AudioRecorder] = await Promise.all(deferredPolyfills);
  if (AudioRecorder) {
    window.MediaRecorder = AudioRecorder;
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
