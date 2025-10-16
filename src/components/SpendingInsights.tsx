import React from 'react';
import styled from 'styled-components';

const InsightsContainer = styled.div`
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

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const InsightCard = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background: linear-gradient(135deg, #FF6200 0%, #E55A00 100%);
  color: white;
`;

const InsightLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const InsightValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const InsightSubtext = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const CategoryBreakdown = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const CategoryItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const CategoryName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const CategoryAmount = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number; $color: string }>`
  width: ${props => props.$percentage}%;
  height: 100%;
  background-color: ${props => props.$color};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: width 0.5s ease;
`;

const CategoryPercentage = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
  margin-left: ${props => props.theme.spacing.sm};
`;

const categories = [
  { icon: '🏠', name: 'Housing', amount: '€1,250', percentage: 35, color: '#FF6200' },
  { icon: '🍔', name: 'Food & Dining', amount: '€680', percentage: 19, color: '#00A755' },
  { icon: '🚗', name: 'Transportation', amount: '€450', percentage: 13, color: '#1976D2' },
  { icon: '🎬', name: 'Entertainment', amount: '€320', percentage: 9, color: '#7B1FA2' },
  { icon: '🛍️', name: 'Shopping', amount: '€580', percentage: 16, color: '#F57C00' },
  { icon: '💡', name: 'Utilities', amount: '€280', percentage: 8, color: '#388E3C' }
];

export const SpendingInsights: React.FC = () => {
  const totalSpent = 3560;
  const monthlyBudget = 4000;
  const budgetRemaining = monthlyBudget - totalSpent;
  const savingsRate = ((budgetRemaining / monthlyBudget) * 100).toFixed(1);

  return (
    <InsightsContainer>
      <SectionTitle>💰 Spending Insights</SectionTitle>

      <InsightsGrid>
        <InsightCard>
          <InsightLabel>This Month's Spending</InsightLabel>
          <InsightValue>€{totalSpent.toLocaleString()}</InsightValue>
          <InsightSubtext>of €{monthlyBudget.toLocaleString()} budget</InsightSubtext>
        </InsightCard>

        <InsightCard style={{ background: 'linear-gradient(135deg, #00A755 0%, #00923D 100%)' }}>
          <InsightLabel>Budget Remaining</InsightLabel>
          <InsightValue>€{budgetRemaining}</InsightValue>
          <InsightSubtext>{savingsRate}% under budget</InsightSubtext>
        </InsightCard>

        <InsightCard style={{ background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)' }}>
          <InsightLabel>Avg. Daily Spending</InsightLabel>
          <InsightValue>€{(totalSpent / 14).toFixed(2)}</InsightValue>
          <InsightSubtext>Last 14 days</InsightSubtext>
        </InsightCard>
      </InsightsGrid>

      <CategoryBreakdown>
        <SectionTitle style={{ fontSize: '18px', marginBottom: '16px' }}>
          Spending by Category
        </SectionTitle>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            <CategoryHeader>
              <CategoryName>
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <CategoryPercentage>{category.percentage}%</CategoryPercentage>
              </CategoryName>
              <CategoryAmount>{category.amount}</CategoryAmount>
            </CategoryHeader>
            <ProgressBar>
              <ProgressFill $percentage={category.percentage} $color={category.color} />
            </ProgressBar>
          </CategoryItem>
        ))}
      </CategoryBreakdown>
    </InsightsContainer>
  );
};
