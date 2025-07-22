// Netlify Function: Get programs by organization ID
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
    const programs = await storage.getProgramsByOrganization(id);
    if (!programs) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Programs not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(programs),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 