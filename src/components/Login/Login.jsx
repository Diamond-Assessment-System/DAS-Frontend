import React from 'react';
import { auth, googleProvider } from '../../config/firebase';
import './Login.scss';
import signInWithGoogle from '../../utils/authUtils';

const GoogleLoginComponent = () => {
  return (
    <div>
      <h1>React Google Login</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default GoogleLoginComponent;
