import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.navBackGroundColor};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure the modal is positioned relative to the header */
`;

export const NavItems = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%; /* Ensure the profile picture button aligns to the right */
`;

export const NavLink = styled.a`
  color: ${(props) => props.theme.iconColor};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.iconThemeColor};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 60px; /* Adjust this value to position the modal below the profile picture */
  right: 10px; 
  background: ${(props) => props.theme.navBackGroundColor};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure the modal is above other elements */
  min-width: 140px;
`;

export const ModalContent = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
  border-radius: 7px;
`;

export const ModalPicture = styled.div`
  margin-top: 10px;
`;

export const ModalItem = styled.div`
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.textPrimary};
  &:hover {
    background-color: ${(props) => props.theme.modalHoverBackgroundColor};
  }
`;

// New styled components for inline styles
export const WelcomeMessage = styled.div`
  margin-left: auto;
  padding: 0 10px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfilePictureWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const ModalProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const ModalProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;