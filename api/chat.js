export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Return a specific 503 error to trigger the frontend fallback gracefully
    return res.status(503).json({ error: "API Key not configured in Vercel" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert goat farming assistant (बकरी-मित्र AI) in India. Answer the user's question in simple Hindi. Keep the answer concise and helpful. User's question: ${message}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Gemini API Error", details: data });
    }

    const botText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "क्षमा करें, मुझे कोई जवाब नहीं मिला।";

    res.status(200).json({ reply: botText });
  } catch (error) {
    console.error("API Chat Error:", error);
    res.status(500).json({ error: "Failed to fetch from Gemini API" });
  }
}
