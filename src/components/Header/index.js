import React, { useContext } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { Nav, NavLink, ThemeToggle, NavItems } from './styled';
import { darkTheme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { useCustomToast } from '../../utils/customToasts';


export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user,  logout } = useAuth(); // Use useAuth to get authentication state and logout function
  const isDarkTheme = theme === darkTheme;

  const showToast = useCustomToast();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      showToast('success', 'Logged out successfully!'); // Display success toast
    } catch (error) {
      showToast('error', error.message || 'Logout failed. Please try again.'); // Display error toast
    }
  };


  
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
          <NavLink as={Link} to="/" onClick={handleLogout}>
            <FaSignOutAlt size={24} />
          </NavLink>
        )}
        <NavLink as={Link} to="/profile">
          <FaUserAlt size={24} />
        </NavLink>
        {isAuthenticated && user && (
          <div style={{ marginLeft: 'auto', padding: '0 10px' }}>
            Welcome, {user.name}
          </div>
        )}
      </NavItems>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
      </ThemeToggle>
    </Nav>
  );
}