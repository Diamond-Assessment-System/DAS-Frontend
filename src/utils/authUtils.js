import { auth, googleProvider } from '../config/firebase';

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
      const expirationTime = Date.now() + 2 * 3600 * 1000; // Set expiration time to 2 hours from now

      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('account', JSON.stringify(account));

      console.log("Successfully authenticated");
      //console.log("Account details:", account);

      return account; // Return account details
    } else {
      console.error("Authentication failed");
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("Error during Google Sign-In: ", error);
    throw error; // Throw error to be handled by caller
  }
};

export const signInWithPhoneNumber = async (phone, password) => {
  try {
    const response = await fetch('http://localhost:8080/api/loginPhone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, password })
    });

    if (response.ok) {
      const data = await response.json();
      const sessionId = data.sessionId;
      const account = data.account;
      const expirationTime = Date.now() + 2 * 3600 * 1000; // Set expiration time to 2 hours from now

      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('account', JSON.stringify(account));

      console.log("Successfully authenticated");
      //console.log("Account details:", account);

      return account; // Return account details
    } else {
      const errorData = await response.json();
      console.error("Authentication failed:", errorData.message);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error during phone number sign-in:", error);
    throw error; // Throw error to be handled by caller
  }
};

export { signInWithGoogle };
