// Netlify Function: Get organization by ID
import { storage } from '../../server/storage';

export async function handler(event: any) {
  const params = event.queryStringParameters || {};
  const id = params.id ? parseInt(params.id, 10) : undefined;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing or invalid id parameter' }),
    };
  }
  try {
    const org = await storage.getOrganizationById(id);
    if (!org) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Organization not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(org),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 