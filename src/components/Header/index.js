import React, { useContext, useState, useRef, useEffect } from 'react';
import {   FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserPlus,
  FaInfoCircle,
  FaEdit,
  FaCog, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import {
  Nav,
  NavLink,
  ThemeToggle,
  NavItems,
  Modal,
  ModalContent,
  ModalItem,
  ModalPicture,
  WelcomeMessage,
  ProfileContainer,
  ProfilePictureWrapper,
  ProfileImage,
  ModalProfileImage,
  ModalProfileWrapper,
} from './styled';
import { darkTheme } from '../../config/theme';
import { useAuth } from '../../context/AuthContext';
import { useCustomToast } from '../../utils/customToasts';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useAuth(); // Use useAuth to get authentication state and logout function
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
          <React.Fragment>
            <NavLink as={Link} to="/login">
              <FaSignInAlt size={24} />
            </NavLink>
            <NavLink as={Link} to="/register">
              <FaUserPlus size={24} />
            </NavLink>
          
          </React.Fragment>
        ) : null  /*(
          <NavLink as={Link} to="/" onClick={handleLogout}>
            <FaSignOutAlt size={24} />
          </NavLink>
        )*/}
        {isAuthenticated && user && (
          <WelcomeMessage>
            Welcome, {user.name}
          </WelcomeMessage>
        )}
      </NavItems>
      <ProfileContainer>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
        </ThemeToggle>
        {isAuthenticated && (
          <ProfilePictureWrapper onClick={toggleModal}>
            {user?.profilePicture ? (
              <ProfileImage src={user.profilePicture} alt="Profile" />
            ) : (
              <FaUserAlt size={24} />
            )}
          </ProfilePictureWrapper>
        )}
      </ProfileContainer>
      {isModalOpen && (
        <Modal ref={modalRef}>
          <ModalContent>
            {/* Profile Picture in Modal */}
            <ModalPicture>
              <ModalProfileWrapper>
                {user?.profilePicture ? (
                  <ModalProfileImage src={user.profilePicture} alt="Profile" />
                ) : (
                  <FaUserAlt size={48} />
                )}
              </ModalProfileWrapper>
            </ModalPicture>

            <ModalItem as={Link} to="/profile" onClick={() => {}}>
              <FaInfoCircle size={18} style={{ marginRight: '8px' }} /> Information
            </ModalItem>
            <ModalItem onClick={() => {}}>
              <FaEdit size={18} style={{ marginRight: '8px' }} /> Update
            </ModalItem>
            <ModalItem as={Link} to="/logout" onClick={handleLogout}>
              <FaSignOutAlt size={18} style={{ marginRight: '8px' }} /> Logout
            </ModalItem>
          </ModalContent>
      </Modal>
      )}
    </Nav>
  );
}