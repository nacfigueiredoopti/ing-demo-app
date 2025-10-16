import React from 'react';
import styled from 'styled-components';

const TrendsContainer = styled.div`
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

const TrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const TrendCard = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const TrendName = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const TrendValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const TrendChange = styled.div<{ $positive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$positive ? '#00A755' : '#D32F2F'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MarketList = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const MarketItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MarketInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MarketSymbol = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  font-size: 16px;
`;

const MarketName = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
`;

const MarketStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  text-align: right;
`;

const MarketPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const trends = [
  { name: 'AEX Index', value: '789.45', change: '+1.24%', positive: true },
  { name: 'EUR/USD', value: '1.0895', change: '+0.32%', positive: true },
  { name: 'Gold', value: '€1,987', change: '-0.15%', positive: false },
  { name: 'Oil (Brent)', value: '€78.50', change: '+2.10%', positive: true }
];

const stocks = [
  { symbol: 'ASML', name: 'ASML Holding', price: '€745.30', change: '+2.45%', positive: true },
  { symbol: 'SHELL', name: 'Shell PLC', price: '€29.85', change: '+1.20%', positive: true },
  { symbol: 'ING', name: 'ING Group', price: '€14.92', change: '+0.85%', positive: true },
  { symbol: 'PHIA', name: 'Philips', price: '€23.10', change: '-0.45%', positive: false },
  { symbol: 'HEIA', name: 'Heineken', price: '€89.50', change: '+1.15%', positive: true },
  { symbol: 'UNA', name: 'Unilever', price: '€48.75', change: '-0.30%', positive: false }
];

export const MarketTrends: React.FC = () => {
  return (
    <TrendsContainer>
      <SectionTitle>📈 Market Overview</SectionTitle>
      <TrendsGrid>
        {trends.map((trend, index) => (
          <TrendCard key={index}>
            <TrendName>{trend.name}</TrendName>
            <TrendValue>{trend.value}</TrendValue>
            <TrendChange $positive={trend.positive}>
              {trend.positive ? '▲' : '▼'} {trend.change}
            </TrendChange>
          </TrendCard>
        ))}
      </TrendsGrid>

      <MarketList>
        <SectionTitle style={{ fontSize: '18px', marginTop: '24px' }}>
          Top Dutch Stocks
        </SectionTitle>
        {stocks.map((stock, index) => (
          <MarketItem key={index}>
            <MarketInfo>
              <MarketSymbol>{stock.symbol}</MarketSymbol>
              <MarketName>{stock.name}</MarketName>
            </MarketInfo>
            <MarketStats>
              <MarketPrice>{stock.price}</MarketPrice>
              <TrendChange $positive={stock.positive}>
                {stock.positive ? '▲' : '▼'} {stock.change}
              </TrendChange>
            </MarketStats>
          </MarketItem>
        ))}
      </MarketList>
    </TrendsContainer>
  );
};
