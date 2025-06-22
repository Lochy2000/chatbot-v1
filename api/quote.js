export default async function handler(req, res) {
  const prompt = req.query.prompt;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Missing Gemini API key." });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Missing 'prompt' query parameter." });
  }

  try {
    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-pro";
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await result.json();

    if (!result.ok) {
      const errorMessage =
        data.error?.message || "Gemini API request failed.";
      console.error(
        `Gemini API error ${result.status}: ${errorMessage}`
      );

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      return res.status(result.status).json({ error: errorMessage });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json({ reply });
  } catch (err) {
    console.error(`Gemini API request failed: ${err.message}`);
    res.status(500).json({ error: "Gemini API request failed." });
  }
}
