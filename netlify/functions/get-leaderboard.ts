// Netlify Function: Get leaderboard data
import { storage } from '../../server/storage';

export async function handler(event: any) {
  // Parse query parameters
  const params = event.queryStringParameters || {};
  const filters = {
    sector: params.sector || '',
    region: params.region || '',
    sdg: params.sdg || '',
    query: params.query || '',
    page: params.page ? parseInt(params.page, 10) : 1,
    sortBy: params.sortBy || 'impactScore',
    sortOrder: params.sortOrder || 'desc',
  };

  try {
    const { items, total } = await storage.getLeaderboard(filters);
    return {
      statusCode: 200,
      body: JSON.stringify({ items, total }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 