import React, { useContext } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { Nav, NavLink, ThemeToggle, NavItems  } from './styled';
import { darkTheme } from '../../config/theme'; 

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === darkTheme; 

  return (
    <Nav style={{ backgroundColor: theme.navBackGround, color: theme.iconColor }}>
      <NavItems>
        <NavLink as={Link} to="/">
          <FaHome size={24} />
        </NavLink>
        <NavLink as={Link} to="/login">
          <FaSignInAlt size={24} />
        </NavLink>
        <NavLink as={Link} to="/profile">
          <FaUserAlt size={24} />
        </NavLink>
      </NavItems>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
      </ThemeToggle>
    </Nav>
  );
}