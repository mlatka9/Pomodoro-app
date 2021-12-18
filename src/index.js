import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import 'styles/fonts.css';
import { GlobalSettingsProvider } from 'hooks/useGlobalSettings';

ReactDOM.render(
  <React.StrictMode>
    <GlobalSettingsProvider>
      <App />
    </GlobalSettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
