import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppWrapper from './App';

const CLIENT_ID = '200707558272-te7t2gl0frolmfep3rolgc1l8k71drgb.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <AppWrapper />
  </GoogleOAuthProvider>
);
