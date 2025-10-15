import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDecision, useTrackEvent } from '@optimizely/react-sdk';
import { FeatureFlags, Events } from '../optimizely.config';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const HeroBanner = styled.div<{ $variant?: string }>`
  background: ${props =>
    props.$variant === 'gradient'
      ? 'linear-gradient(135deg, #FF6200 0%, #E55A00 100%)'
      : props.$variant === 'dark'
      ? props.theme.colors.secondary
      : props.theme.colors.primary
  };
  color: white;
  padding: ${props => props.$variant === 'compact' ? '32px' : '48px'};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const HeroTitle = styled.h1<{ $variant?: string }>`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  font-size: ${props => props.$variant === 'large' ? '42px' : '32px'};
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  font-size: 18px;
  opacity: 0.95;
`;

const CTAButton = styled.button<{ $color?: string }>`
  background-color: ${props =>
    props.$color === 'green' ? '#00A755' :
    props.$color === 'blue' ? '#1976D2' :
    props.$color === 'purple' ? '#7B1FA2' :
    'white'
  };
  color: ${props => props.$color && props.$color !== 'white' ? 'white' : props.theme.colors.primary};
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Grid = styled.div<{ $layout?: string }>`
  display: grid;
  grid-template-columns: ${props =>
    props.$layout === 'three-column' ? 'repeat(3, 1fr)' :
    props.$layout === 'sidebar' ? '300px 1fr' :
    'repeat(2, 1fr)'
  };
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 20px;
`;

const Balance = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: ${props => props.theme.spacing.md} 0;
`;

const AccountType = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 4px 12px;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 12px;
  font-weight: 600;
  margin-left: ${props => props.theme.spacing.sm};
`;

export const Dashboard: React.FC = () => {
  const [trackEvent] = useTrackEvent();

  useEffect(() => {
    // Track page view event
    trackEvent(Events.DASHBOARD_VIEW);
  }, [trackEvent]);

  // Get feature flag decisions
  const [dashboardLayoutDecision] = useDecision(FeatureFlags.NEW_DASHBOARD_LAYOUT);
  const layout = dashboardLayoutDecision.variables?.layout as string || 'two-column';

  const [buttonColorDecision] = useDecision(FeatureFlags.CHECKOUT_BUTTON_COLOR);
  const buttonColor = buttonColorDecision.variables?.color as string || 'white';

  const [heroBannerDecision] = useDecision(FeatureFlags.HERO_BANNER_VARIANT);
  const heroVariant = heroBannerDecision.variables?.variant as string || 'default';
  const heroSize = heroBannerDecision.variables?.size as string || 'default';

  const [showSavingsGoals] = useDecision(FeatureFlags.SHOW_SAVINGS_GOALS);
  const [enableQuickTransfer] = useDecision(FeatureFlags.ENABLE_QUICK_TRANSFER);

  // Debug logging
  useEffect(() => {
    console.log('🔍 Optimizely Debug Info:');
    console.log('SDK Key:', process.env.REACT_APP_OPTIMIZELY_SDK_KEY ? 'Set' : 'NOT SET');
    console.log('Button Color Decision:', buttonColorDecision);
    console.log('Button Color Value:', buttonColor);
    console.log('Dashboard Layout Decision:', dashboardLayoutDecision);
    console.log('Layout Value:', layout);
    console.log('Hero Banner Decision:', heroBannerDecision);
    console.log('Show Savings Goals Decision:', showSavingsGoals);
    console.log('Enable Quick Transfer Decision:', enableQuickTransfer);
  }, [buttonColorDecision, dashboardLayoutDecision, heroBannerDecision, showSavingsGoals, enableQuickTransfer, buttonColor, layout]);

  const handleCTAClick = () => {
    trackEvent(Events.CTA_CLICKED, {
      buttonColor,
      location: 'hero_banner'
    });
    alert('CTA Clicked! This event has been tracked in Optimizely.');
  };

  return (
    <DashboardContainer>
      <HeroBanner $variant={heroVariant}>
        <HeroTitle $variant={heroSize}>Welcome back!</HeroTitle>
        <HeroSubtitle>Manage your finances with ease</HeroSubtitle>
        <CTAButton $color={buttonColor} onClick={handleCTAClick}>
          Get Started
        </CTAButton>
        {dashboardLayoutDecision?.enabled && (
          <FeatureBadge>New Layout</FeatureBadge>
        )}
      </HeroBanner>

      <Grid $layout={layout}>
        <Card>
          <AccountType>Checking Account</AccountType>
          <CardTitle>Primary Checking</CardTitle>
          <Balance>€4,532.50</Balance>
          {enableQuickTransfer?.enabled && (
            <CTAButton $color="blue" style={{ marginTop: '16px', width: '100%' }}>
              Quick Transfer
            </CTAButton>
          )}
        </Card>

        <Card>
          <AccountType>Savings Account</AccountType>
          <CardTitle>Emergency Fund</CardTitle>
          <Balance>€12,450.00</Balance>
          <div style={{ fontSize: '14px', color: '#00A755', marginTop: '8px' }}>
            +2.5% interest rate
          </div>
        </Card>

        {layout === 'three-column' && (
          <Card>
            <AccountType>Investment Account</AccountType>
            <CardTitle>Portfolio</CardTitle>
            <Balance>€28,750.00</Balance>
            <div style={{ fontSize: '14px', color: '#00A755', marginTop: '8px' }}>
              +12.3% this year
            </div>
          </Card>
        )}
      </Grid>

      {showSavingsGoals?.enabled && (
        <Card>
          <CardTitle>
            Savings Goals
            <FeatureBadge>New Feature</FeatureBadge>
          </CardTitle>
          <div style={{ marginTop: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Vacation</span>
                <span>€3,200 / €5,000</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#E0E0E0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '64%',
                  height: '100%',
                  backgroundColor: '#FF6200',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>New Car</span>
                <span>€8,500 / €20,000</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#E0E0E0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '42.5%',
                  height: '100%',
                  backgroundColor: '#00A755',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
          </div>
        </Card>
      )}
    </DashboardContainer>
  );
};
