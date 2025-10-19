export interface MobileCard {
  id: string;
  title: string;
  body: string;
  image: {
    url: string;
    alt?: string;
  };
}

interface GraphQLResponse {
  data: {
    MobileCard?: {
      items: Array<{
        _metadata?: {
          key?: string;
        };
        Title?: string;
        Body?: string;
        Image?: {
          url?: string;
          alt?: string;
        };
      }>;
    };
  };
}

// Optimizely Content Graph endpoint configuration
const GRAPHQL_ENDPOINT = 'https://cg.optimizely.com/content/v2';
const SINGLE_KEY = 'pJh0iaTVPjctOtsuYDe1Uar1iNlJbehACzJVSZHOBOHtBxND';
const APP_KEY = 'HGNEetJZaKQjUkoaTDgsx5U0koXIJaTVhUeSHSkFygUAeeMq';

const MOBILE_CARD_QUERY = `
  query GetMobileCards {
    MobileCard(limit: 100) {
      items {
        _metadata {
          key
        }
        Title
        Body
        Image {
          url
          alt
        }
      }
    }
  }
`;

export const fetchMobileCards = async (): Promise<MobileCard[]> => {
  try {
    // Optimizely Content Graph authentication using Authorization header
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${SINGLE_KEY}:${APP_KEY}`)}`,
      },
      body: JSON.stringify({
        query: MOBILE_CARD_QUERY,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GraphQL Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result: GraphQLResponse = await response.json();
    console.log('GraphQL Response:', result);

    // Transform the GraphQL response to our MobileCard interface
    const items = result.data?.MobileCard?.items || [];

    return items
      .filter(item => item.Title && item.Body) // Only include items with required fields
      .map(item => ({
        id: item._metadata?.key || Math.random().toString(36).substr(2, 9),
        title: item.Title || 'Untitled',
        body: item.Body || '',
        image: {
          url: item.Image?.url || '',
          alt: item.Image?.alt || item.Title || 'Card image',
        },
      }));
  } catch (error) {
    console.error('Error fetching mobile cards:', error);
    throw error;
  }
};
