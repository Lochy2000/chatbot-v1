import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, botType } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Get token information
    const usage = result.response.usageMetadata || {};

    return res.status(200).json({
      reply: text,
      tokens: {
        totalTokenCount: usage.totalTokenCount || 0,
        promptTokenCount: usage.promptTokenCount || 0,
        candidatesTokenCount: usage.candidatesTokenCount || 0
      }
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    return res.status(500).json({
      error: 'Failed to get response from AI',
      details: error.message
    });
  }
}