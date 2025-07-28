// api/generate-description.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { locationName } = req.body;

    if (!locationName || typeof locationName !== 'string') {
      return res.status(400).json({ error: 'locationName is required' });
    }

    const prompt = `Write a compelling, one-paragraph travel description for ${locationName}. Focus on what makes it unique for a remote worker interested in outdoor activities and a high quality of life. Be vivid and inspiring.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const description = response.text();

    res.status(200).json({ description });
  } catch (error) {
    console.error('Error calling Google AI:', error);
    res.status(500).json({ error: 'Failed to generate description' });
  }
}
