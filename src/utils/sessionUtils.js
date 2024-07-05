export const handleSession = (navigate) => {
  const expirationTime = localStorage.getItem('expirationTime');
  const account = localStorage.getItem('account');

  if (!expirationTime || Date.now() > expirationTime) {
    clearSession();
    navigate('/login');
    return null;
  }

  if (!account) {
    navigate('/login');
    return null;
  }

  return JSON.parse(account);
};

export const clearSession = () => {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('idToken');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('account');
};

export const checkSession = () => {
  const account = localStorage.getItem('account');
  if (account) {
    return JSON.parse(account);
  }
  return null;
};

export const checkRole = (navigate, role) => {
  const account = checkSession();
  if (account && account.role !== role) {
    navigate('/');
  }

};
