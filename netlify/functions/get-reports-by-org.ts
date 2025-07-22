// Netlify Function: Get reports by organization ID
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
    const reports = await storage.getReportsByOrganization(id);
    if (!reports) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Reports not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(reports),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 