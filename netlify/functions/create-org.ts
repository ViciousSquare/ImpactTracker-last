// Netlify Function: Create a new organization
import { storage } from '../../server/storage';

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { Allow: 'POST' },
    };
  }
  try {
    const data = JSON.parse(event.body || '{}');
    const org = await storage.createOrganization(data);
    return {
      statusCode: 201,
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