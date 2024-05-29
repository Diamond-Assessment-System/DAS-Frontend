import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import diamondIcon from '../../assets/logodas.png'; 
import './Login.scss';

const GoogleLoginComponent = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed', error);
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailure,
    scope: 'profile email',
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Avatar className="avatar" sx={{ width: 100, height: 100 }}>
            <img src={diamondIcon} alt="Diamond Icon" style={{ width: '100%', height: '100%' }} />
          </Avatar>
          <h1>DAS</h1>
          <h2>We Valued Your Diamond!</h2>
        </div>
        {user ? (
          <div className="user-info">
            <h3>Welcome, {user.name}</h3>
            <Avatar src={user.picture} alt={user.name} sx={{ width: 56, height: 56, margin: 'auto' }} />
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <button className="login-button" onClick={login}>
            Dùng tài khoản Google
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleLoginComponent;
