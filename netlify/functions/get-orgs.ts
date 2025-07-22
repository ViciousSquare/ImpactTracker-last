// Netlify Function: List organizations (paginated, with filters)
import { storage } from '../../server/storage';

export async function handler(event: any) {
  // Parse query parameters
  const params = event.queryStringParameters || {};
  const filters = {
    sector: params.sector || undefined,
    region: params.region || undefined,
    verificationType: params.verificationType || undefined,
    query: params.query || undefined,
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: params.limit ? parseInt(params.limit, 10) : 10,
  };

  try {
    const { organizations, total } = await storage.listOrganizations(filters);
    return {
      statusCode: 200,
      body: JSON.stringify({ organizations, total }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 