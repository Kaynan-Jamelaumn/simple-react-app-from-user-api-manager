import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between; /* Pushes elements apart */
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.navBackGroundColor};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const NavItems = styled.div`
  display: flex;
  gap: 0.5rem; /* Controls spacing between icons */
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