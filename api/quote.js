export default async function handler(req, res) {
  const prompt = req.query.prompt;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_MODEL = "gemini-1.5-flash"; // Use this for fast & quota-friendly results

  // Basic validation
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API key." });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' query parameter." });
  }

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

    if (!response.ok) {
      const errorMessage = data.error?.message || "Gemini API request failed.";
      console.error(`Gemini API Error ${response.status}: ${errorMessage}`);

      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(response.status).json({ error: errorMessage });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    // Required for CodePen CORS requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API request failed:", err);
    res.status(500).json({ error: "Gemini API request failed." });
  }
}
