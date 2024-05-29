import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppWrapper from './App';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <AppWrapper />
  </GoogleOAuthProvider>
);
