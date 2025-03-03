import React, { useContext } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { Nav, NavLink, ThemeToggle, NavItems } from './styled';
import { darkTheme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useAuth(); // Use useAuth to get authentication state and logout function
  const isDarkTheme = theme === darkTheme;

  return (
    <Nav style={{ backgroundColor: theme.navBackGround, color: theme.iconColor }}>
      <NavItems>
        <NavLink as={Link} to="/">
          <FaHome size={24} />
        </NavLink>
        {/* Conditionally render Login or Logout button */}
        {!isAuthenticated ? (
          <NavLink as={Link} to="/login">
            <FaSignInAlt size={24} />
          </NavLink>
        ) : (
          <NavLink as={Link} to="/" onClick={logout}>
            <FaSignOutAlt size={24} />
          </NavLink>
        )}
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