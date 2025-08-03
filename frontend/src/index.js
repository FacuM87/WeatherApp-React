import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={config.googleOAuth_id}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

