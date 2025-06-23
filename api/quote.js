let lastRequestTime = {}; // Simple in-memory rate limiter (per IP)
const RATE_LIMIT_MS = 2000; // 2 seconds between requests per IP

export default async function handler(req, res) {
  const prompt = req.query.prompt;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_MODEL = "gemini-1.5-flash";
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Validate
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API key." });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' query parameter." });
  }

  // Simple dev-friendly rate limiter
  const now = Date.now();
  if (lastRequestTime[clientIP] && now - lastRequestTime[clientIP] < RATE_LIMIT_MS) {
    return res.status(429).json({ error: "Rate limit: Too many requests, please slow down." });
  }
  lastRequestTime[clientIP] = now;

  try {
    const apiURL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    // Log raw response
    console.log("🪵 Gemini response:", JSON.stringify(data, null, 2));

    // Error handling
    if (!response.ok) {
      const errorMessage = data.error?.message || "Gemini API request failed.";
      return res.status(response.status).json({
        error: errorMessage,
        tokens: data.usageMetadata || null,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    // Send headers for CORS (for CodePen frontend)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Send response + token info
    return res.status(200).json({
      reply,
      tokens: data.usageMetadata || { inputTokenCount: null, outputTokenCount: null },
    });
  } catch (err) {
    console.error("Gemini API request failed:", err);

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({
      error: "Gemini API request failed unexpectedly.",
      tokens: null,
    });
  }
}
