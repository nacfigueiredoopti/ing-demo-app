import React from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
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
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const NewsCard = styled.article`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const NewsCategory = styled.span<{ $category: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
  background-color: ${props => {
    switch (props.$category) {
      case 'markets': return '#E3F2FD';
      case 'investing': return '#E8F5E9';
      case 'economy': return '#FFF3E0';
      case 'crypto': return '#F3E5F5';
      default: return '#F5F5F5';
    }
  }};
  color: ${props => {
    switch (props.$category) {
      case 'markets': return '#1976D2';
      case 'investing': return '#388E3C';
      case 'economy': return '#F57C00';
      case 'crypto': return '#7B1FA2';
      default: return '#616161';
    }
  }};
`;

const NewsTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 16px;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
`;

const NewsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: ${props => props.theme.spacing.sm};
`;

const newsArticles = [
  {
    id: 1,
    category: 'markets',
    title: 'European Markets Rally as ECB Holds Rates Steady',
    excerpt: 'Major European indices saw gains today following the European Central Bank\'s decision to maintain current interest rates.',
    author: 'Financial Times',
    time: '2 hours ago'
  },
  {
    id: 2,
    category: 'investing',
    title: 'Sustainable Investing Reaches New Heights in 2025',
    excerpt: 'ESG funds continue to attract record inflows as investors prioritize environmental and social responsibility.',
    author: 'Bloomberg',
    time: '4 hours ago'
  },
  {
    id: 3,
    category: 'economy',
    title: 'Inflation Shows Signs of Cooling in Eurozone',
    excerpt: 'Latest data suggests inflation may be moderating, offering potential relief to consumers and businesses.',
    author: 'Reuters',
    time: '6 hours ago'
  },
  {
    id: 4,
    category: 'crypto',
    title: 'Digital Euro Pilot Program Expands',
    excerpt: 'The ECB announces expansion of its digital currency trials to include more commercial banks.',
    author: 'CoinDesk',
    time: '8 hours ago'
  },
  {
    id: 5,
    category: 'investing',
    title: 'Tech Sector Leads Market Recovery',
    excerpt: 'Technology stocks bounce back as earnings reports exceed analyst expectations.',
    author: 'CNBC',
    time: '1 day ago'
  },
  {
    id: 6,
    category: 'economy',
    title: 'Housing Market Shows Resilience',
    excerpt: 'Despite higher interest rates, housing demand remains strong in major European cities.',
    author: 'Wall Street Journal',
    time: '1 day ago'
  }
];

export const FinancialNews: React.FC = () => {
  return (
    <NewsContainer>
      <SectionTitle>
        📰 Financial News & Insights
      </SectionTitle>
      <NewsGrid>
        {newsArticles.map(article => (
          <NewsCard key={article.id}>
            <NewsCategory $category={article.category}>
              {article.category.toUpperCase()}
            </NewsCategory>
            <NewsTitle>{article.title}</NewsTitle>
            <NewsExcerpt>{article.excerpt}</NewsExcerpt>
            <NewsFooter>
              <span>{article.author}</span>
              <span>{article.time}</span>
            </NewsFooter>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  );
};
