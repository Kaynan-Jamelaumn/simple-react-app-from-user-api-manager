// src/components/Header/styled.js
import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  align-items: center;
`;

export const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;