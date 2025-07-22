// Netlify Function: Get solutions
import { storage } from '../../server/storage';

export async function handler(event: any) {
  // Parse query parameters
  const params = event.queryStringParameters || {};
  const filters = {
    query: params.query || '',
    sector: params.sector || '',
    region: params.region || '',
    businessType: params.businessType || '',
    sdg: params.sdg || '',
    demographic: params.demographic || '',
    page: params.page ? parseInt(params.page, 10) : 1,
  };

  try {
    const solutions = await storage.getSolutions(filters);
    return {
      statusCode: 200,
      body: JSON.stringify(solutions),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 