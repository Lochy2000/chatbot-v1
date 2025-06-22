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
    const modelName = "gemini-2.5-pro"; // or "gemini-2.5-flash"
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      },
    );

    let data;
    try {
      data = await result.json();
    } catch {
      data = null;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (!result.ok) {
      console.error("Gemini API error:", result.status, data);
      const errorMessage = data?.error?.message || "Gemini API request failed.";
      return res
        .status(result.status)
        .json({ error: errorMessage, status: result.status });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Gemini API fetch error:", err);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(500).json({ error: err.message || "Gemini API request failed." });
  }
}
