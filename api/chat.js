import { GoogleGenerativeAI } from '@google/generative-ai';

// Available model configurations
const MODELS = {
  // Gemini models
  'gemini-1.5-flash': { provider: 'gemini', name: 'gemini-1.5-flash' },
  'gemini-1.5-pro': { provider: 'gemini', name: 'gemini-1.5-pro' },
  
  // OpenRouter models
  'claude-3.5-sonnet': { provider: 'openrouter', name: 'anthropic/claude-3.5-sonnet' },
  'gpt-4o': { provider: 'openrouter', name: 'openai/gpt-4o' },
  'gpt-4o-mini': { provider: 'openrouter', name: 'openai/gpt-4o-mini' },
  'llama-3.1-70b': { provider: 'openrouter', name: 'meta-llama/llama-3.1-70b-instruct' },
  'claude-3-haiku': { provider: 'openrouter', name: 'anthropic/claude-3-haiku' }
};

async function callGemini(modelName, message) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: modelName });
  
  const result = await model.generateContent(message);
  const response = await result.response;
  const text = response.text();
  const usage = result.response.usageMetadata || {};
  
  return {
    reply: text,
    tokens: {
      totalTokenCount: usage.totalTokenCount || 0,
      promptTokenCount: usage.promptTokenCount || 0,
      candidatesTokenCount: usage.candidatesTokenCount || 0
    }
  };
}

async function callOpenRouter(modelName, message) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'X-Title': 'Bot Playground'
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  
  return {
    reply: data.choices[0].message.content,
    tokens: {
      totalTokenCount: data.usage?.total_tokens || 0,
      promptTokenCount: data.usage?.prompt_tokens || 0,
      candidatesTokenCount: data.usage?.completion_tokens || 0
    }
  };
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, botType, model = 'gemini-1.5-flash' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get model configuration
    const modelConfig = MODELS[model];
    if (!modelConfig) {
      return res.status(400).json({ 
        error: 'Invalid model', 
        availableModels: Object.keys(MODELS) 
      });
    }

    let result;

    // Route to appropriate provider
    if (modelConfig.provider === 'gemini') {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: 'Gemini API key not configured' 
        });
      }
      result = await callGemini(modelConfig.name, message);
      
    } else if (modelConfig.provider === 'openrouter') {
      if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({ 
          error: 'OpenRouter API key not configured' 
        });
      }
      result = await callOpenRouter(modelConfig.name, message);
    }

    return res.status(200).json({
      ...result,
      model: model,
      provider: modelConfig.provider
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      error: 'Failed to get response from AI',
      details: error.message
    });
  }
}