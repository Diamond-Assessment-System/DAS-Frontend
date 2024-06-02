import React from 'react';
import background from '../../assets/backgrounddas.png'
const HomePage = () => {
  return (
    <div>
      <h1>Trang Chủ</h1>
      <p>Chào mừng đến với ứng dụng của chúng tôi!</p>
      <img src={background} alt="DAS Logo" />
    </div>
  );
};

export default HomePage;

