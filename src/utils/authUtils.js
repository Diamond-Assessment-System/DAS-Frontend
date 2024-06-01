import {auth, googleProvider} from '../config/firebase'

const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();

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
      const account = data.account;

      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('idToken', idToken);

      console.log("Successfully authenticated");
      console.log("Account details:", account);
    } else {
      console.error("Authentication failed");
    }
  } catch (error) {
    console.error("Error during Google Sign-In: ", error);
  }
};
export default signInWithGoogle