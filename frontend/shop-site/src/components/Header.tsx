import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </button>
        <span className="logo">LUMIO</span>
      </div>
      <div className="header-right">
        <a href="#online-shop" className="online-shop-link">ONLINE SHOP</a>
        <button className="menu-btn">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;