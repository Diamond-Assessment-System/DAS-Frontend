import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logodas.png'; // Đường dẫn đến logo
import { AccountCircle } from '@mui/icons-material'; // Import icon người dùng từ Material-UI
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="DAS Logo" />
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/about">Về DAS</Link></li>
          <li><Link to="/diamonds">Kim Cương</Link></li>
          <li><Link to="/services">Dịch Vụ Giám Định</Link></li>
          <li><Link to="/lookup">Tra Cứu</Link></li>
        </ul>
      </nav>
      <div className="actions">
        <Link to="/appointment" className="appointment-btn">Đặt Hẹn</Link>
        <div className="user-icon">
          <Link to="/login">
            <AccountCircle style={{ color: 'white', fontSize: 30 }} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
