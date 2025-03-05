import React, {  useContext, useState, useRef, useEffect } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { Nav, NavLink, ThemeToggle, NavItems, Modal, ModalContent, ModalItem, ModalPicture  } from './styled';
import { darkTheme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { useCustomToast } from '../../utils/customToasts';


export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user,  logout } = useAuth(); // Use useAuth to get authentication state and logout function
  const isDarkTheme = theme === darkTheme;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Ref for the modal

  const showToast = useCustomToast();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      showToast('success', 'Logged out successfully!'); // Display success toast
    } catch (error) {
      showToast('error', error.message || 'Logout failed. Please try again.'); // Display error toast
    }
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  return (
    <Nav style={{ backgroundColor: theme.navBackGround, color: theme.iconColor }}>
      <NavItems>
        <NavLink as={Link} to="/">
          <FaHome size={24} />
        </NavLink>
        {!isAuthenticated ? (
          <NavLink as={Link} to="/login">
            <FaSignInAlt size={24} />
          </NavLink>
        ): /*(
          <NavLink as={Link} to="/" onClick={handleLogout}>
            <FaSignOutAlt size={24} />
          </NavLink>
        )*/ null }
        {isAuthenticated && user && (
          <div style={{ marginLeft: 'auto', padding: '0 10px' }}>
            Welcome, {user.name}
          </div>
        )}
      </NavItems>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
        </ThemeToggle>
        {isAuthenticated && (
          <div
            onClick={toggleModal}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
            ) : (
              <FaUserAlt size={24} />
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal ref={modalRef}>
          <ModalContent>
            {/* Profile Picture in Modal */}
            <ModalPicture>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                {user?.profilePicture ? (
                  <img
                  src={user.profilePicture}
                  alt="Profile"
                  style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                  />
                ) : (
                  <FaUserAlt size={48} />
                )}
              </div>
            </ModalPicture>

            <ModalItem as={Link} to="/profile" onClick={() => {}}>Information</ModalItem>
            <ModalItem onClick={() => {}}>Update</ModalItem>
            <ModalItem as={Link} to="/logout" onClick={handleLogout}>Logout</ModalItem>
          </ModalContent>
        </Modal>
      )}
    </Nav>
  );
}