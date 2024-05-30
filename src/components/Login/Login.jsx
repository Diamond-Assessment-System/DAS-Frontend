import React from 'react';
import { auth, googleProvider } from '../../config/firebase';
import './Login.scss';

const GoogleLoginComponent = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Send the token to the backend
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const sessionId = data.sessionId;

        // Store the session ID and token in local storage
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('idToken', idToken);

        console.log("Successfully authenticated");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during Google Sign-In: ", error);
    }
  };

  return (
    <div>
      <h1>React Google Login</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default GoogleLoginComponent;
