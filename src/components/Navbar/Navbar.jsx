import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarStyle.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/">
          <span>Task-Manager</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
