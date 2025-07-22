// Netlify Function: Get platform statistics
import { storage } from '../../server/storage';

export async function handler() {
  try {
    const stats = await storage.getStatistics();
    return {
      statusCode: 200,
      body: JSON.stringify(stats),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 