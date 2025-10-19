import React from 'react';
import styled from 'styled-components';
import { useDecision } from '@optimizely/react-sdk';
import { Link } from 'react-router-dom';
import { FeatureFlags } from '../optimizely.config';

const HeaderContainer = styled.header<{ $variant?: string }>`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.$variant === 'compact' ? '12px 24px' : '16px 24px'};
  box-shadow: ${props => props.theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
`;

const Nav = styled.nav<{ $style?: string }>`
  display: flex;
  gap: ${props => props.$style === 'compact' ? '16px' : '24px'};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 12px;
  }
`;

const NavLink = styled(Link)<{ $style?: string }>`
  color: white;
  text-decoration: none;
  font-weight: ${props => props.$style === 'bold' ? '600' : '500'};
  font-size: ${props => props.$style === 'compact' ? '14px' : '16px'};
  padding: 8px 12px;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Header: React.FC = () => {
  // Get navigation style variant from feature flag
  const [navigationDecision] = useDecision(FeatureFlags.NAVIGATION_STYLE);
  const navStyle = navigationDecision.variables?.style as string || 'default';

  return (
    <HeaderContainer $variant={navStyle}>
      <HeaderContent>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <LogoContainer>
            <LogoImage src="/ing-logo.svg" alt="ING Logo" />
          </LogoContainer>
        </Link>
        <Nav $style={navStyle}>
          <NavLink to="/" $style={navStyle}>Home</NavLink>
          <NavLink to="/accounts" $style={navStyle}>Accounts</NavLink>
          <NavLink to="/transfer" $style={navStyle}>Transfer</NavLink>
          <NavLink to="/savings" $style={navStyle}>Savings</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
