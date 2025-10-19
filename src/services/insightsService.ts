export interface MobileCard {
  id: string;
  title: string;
  body: string;
  bodyHtml: string;
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
        Body?: {
          html?: string;
        };
        Image?: {
          url?: {
            default?: string;
          };
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
        Body {
          html
        }
        Image {
          url {
            default
          }
        }
      }
    }
  }
`;

export const fetchMobileCards = async (): Promise<MobileCard[]> => {
  try {
    // Optimizely Content Graph authentication using single_key as query parameter
    // This is used to fetch published content only
    const url = `${GRAPHQL_ENDPOINT}?auth=${SINGLE_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      .filter(item => item.Title && item.Body?.html) // Only include items with required fields
      .map(item => {
        const bodyHtml = item.Body?.html || '';
        // Strip HTML tags to get plain text for body
        const bodyText = bodyHtml.replace(/<[^>]*>/g, '');

        return {
          id: item._metadata?.key || Math.random().toString(36).substr(2, 9),
          title: item.Title || 'Untitled',
          body: bodyText,
          bodyHtml: bodyHtml,
          image: {
            url: item.Image?.url?.default || '',
            alt: item.Title || 'Card image',
          },
        };
      });
  } catch (error) {
    console.error('Error fetching mobile cards:', error);
    throw error;
  }
};
