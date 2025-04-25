const express = require("express");
const https = require("https");
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = "deepseek/deepseek-r1:free";

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
  if (!OPENROUTER_API_KEY) {
    return res
      .status(500)
      .json({ error: "Server configuration error - missing API key" });
  }
  next();
};

router.post("/chat", validateApiKey, async (req, res) => {
  try {
    const { messages, model } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Define your system prompt
    const systemPrompt = {
      role: "system",
      content: `You are a helpful assistant for MyApp called futurex.
       which help student to plan their study, give resource and motivate students. Be concise and friendly.`
    };

    // Prepend system prompt to user messages
    const updatedMessages = [systemPrompt, ...messages];

    const requestBody = JSON.stringify({
      model: model || DEFAULT_MODEL,
      messages: updatedMessages,
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': req.headers.referer || 'https://your-site.com',
        'X-Title': 'Your App Name',
        'Content-Type': 'application/json',
        'Content-Length': requestBody.length
      }
    };

    const openRouterReq = https.request(options, (openRouterRes) => {
      let data = '';

      openRouterRes.on('data', (chunk) => {
        data += chunk;
      });

      openRouterRes.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (openRouterRes.statusCode >= 400) {
            return res.status(openRouterRes.statusCode).json({
              error: parsedData.error?.message || 'Error from OpenRouter API',
              details: parsedData
            });
          }
          res.json(parsedData);
        } catch (parseError) {
          console.error("Parse error:", parseError);
          res.status(500).json({ error: "Failed to parse API response" });
        }
      });
    });

    openRouterReq.on('error', (error) => {
      console.error("Request error:", error);
      res.status(500).json({ error: "Failed to make request to OpenRouter API" });
    });

    openRouterReq.write(requestBody);
    openRouterReq.end();

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;