// Netlify Function: Get organization success stories
import { storage } from '../../server/storage';

export async function handler() {
  try {
    const stories = await storage.getSuccessStories();
    return {
      statusCode: 200,
      body: JSON.stringify(stories),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
} 