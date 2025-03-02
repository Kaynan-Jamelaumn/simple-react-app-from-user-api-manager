// src/components/Header/index.js
import React, { useContext } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { Nav, NavLink, ThemeToggle } from './styled';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === darkTheme;

  return (
    <Nav style={{ backgroundColor: theme.backgroundPrimary, color: theme.textPrimary }}>
      <NavLink href="/">
        <FaHome size={24} />
      </NavLink>
      <NavLink href="/login">
        <FaSignInAlt size={24} />
      </NavLink>
      <NavLink href="/profile">
        <FaUserAlt size={24} />
      </NavLink>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
      </ThemeToggle>
    </Nav>
  );
}

// Import theme configurations
import { lightTheme, darkTheme } from '../../config/theme';