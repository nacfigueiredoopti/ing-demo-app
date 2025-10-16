import React from 'react';
import styled from 'styled-components';

const TipsContainer = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 24px;
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const TipCard = styled.div<{ $color: string }>`
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.$color};
  background: linear-gradient(135deg, ${props => props.$color}10 0%, transparent 100%);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const TipIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const TipTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 18px;
  font-weight: 600;
`;

const TipDescription = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 14px;
  line-height: 1.6;
`;

const RecommendationBanner = styled.div`
  background: linear-gradient(135deg, #FF6200 0%, #E55A00 100%);
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-top: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const BannerContent = styled.div`
  flex: 1;
`;

const BannerTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 20px;
  font-weight: 600;
`;

const BannerText = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.95;
  line-height: 1.5;
`;

const BannerButton = styled.button`
  background: white;
  color: #FF6200;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: transform 0.2s;
  white-space: nowrap;

  &:hover {
    transform: scale(1.05);
  }
`;

const tips = [
  {
    icon: '💡',
    title: 'Build Your Emergency Fund',
    description: 'Aim to save 3-6 months of expenses in a readily accessible account. You\'re currently at 2.8 months - almost there!',
    color: '#00A755'
  },
  {
    icon: '📊',
    title: 'Review Your Spending',
    description: 'You spent 19% on dining last month. Consider meal planning to reduce this to 15% and save €140/month.',
    color: '#1976D2'
  },
  {
    icon: '🎯',
    title: 'Set Clear Goals',
    description: 'Having specific financial goals increases savings by 42%. Define what you\'re saving for and when you need it.',
    color: '#7B1FA2'
  },
  {
    icon: '💰',
    title: 'Automate Your Savings',
    description: 'Set up automatic transfers to savings on payday. Even €50/week adds up to €2,600 per year!',
    color: '#F57C00'
  },
  {
    icon: '📈',
    title: 'Invest for Long-term',
    description: 'Consider investing for retirement. Starting early, even with small amounts, makes a huge difference over time.',
    color: '#388E3C'
  },
  {
    icon: '🔍',
    title: 'Track Subscriptions',
    description: 'Review monthly subscriptions. The average person has 5 unused subscriptions costing €75/month.',
    color: '#D32F2F'
  }
];

export const FinancialTips: React.FC = () => {
  return (
    <TipsContainer>
      <SectionTitle>💡 Smart Money Tips</SectionTitle>
      <TipsGrid>
        {tips.map((tip, index) => (
          <TipCard key={index} $color={tip.color}>
            <TipIcon>{tip.icon}</TipIcon>
            <TipTitle>{tip.title}</TipTitle>
            <TipDescription>{tip.description}</TipDescription>
          </TipCard>
        ))}
      </TipsGrid>

      <RecommendationBanner>
        <BannerContent>
          <BannerTitle>🎁 Personalized Recommendation</BannerTitle>
          <BannerText>
            Based on your spending patterns, switching to our Premium Savings Account could earn you an extra €245 in interest this year. Plus, get 2.5% cashback on daily purchases!
          </BannerText>
        </BannerContent>
        <BannerButton>Learn More</BannerButton>
      </RecommendationBanner>
    </TipsContainer>
  );
};
