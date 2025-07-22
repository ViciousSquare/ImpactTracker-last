// Netlify Function: Get trending organizations
import { storage } from '../../server/storage';

export async function handler() {
  try {
    const orgs = await storage.getTrendingOrganizations();
    return {
      statusCode: 200,
      body: JSON.stringify(orgs),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 