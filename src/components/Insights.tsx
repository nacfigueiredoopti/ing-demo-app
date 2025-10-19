import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchMobileCards, MobileCard } from '../services/insightsService';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CardItem = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: linear-gradient(135deg, #FF6B00 0%, #FF8C42 100%);
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
`;

const CardBody = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  line-height: 1.6;
  font-size: 1rem;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorState = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  color: #856404;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;

const Insights = () => {
  const [cards, setCards] = useState<MobileCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMobileCards = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMobileCards();
        setCards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load insights');
        console.error('Error loading mobile cards:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMobileCards();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingState>Loading insights...</LoadingState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Insights</Title>
          <Description>Discover personalized financial insights and tips</Description>
        </Header>
        <ErrorState>
          <strong>Error:</strong> {error}
          <br />
          <br />
          Please check the GraphQL endpoint configuration and try again.
        </ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Insights</Title>
        <Description>Discover personalized financial insights and tips</Description>
      </Header>

      {cards.length === 0 ? (
        <EmptyState>
          <h2>No insights available</h2>
          <p>Check back later for new content</p>
        </EmptyState>
      ) : (
        <CardsGrid>
          {cards.map((card) => (
            <CardItem key={card.id}>
              {card.image.url && (
                <CardImage
                  src={card.image.url}
                  alt={card.image.alt}
                  onError={(e) => {
                    // Hide image on error
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardBody>{card.body}</CardBody>
              </CardContent>
            </CardItem>
          ))}
        </CardsGrid>
      )}
    </Container>
  );
};

export default Insights;
