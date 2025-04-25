const express = require("express");
const https = require("https");
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = "deepseek/deepseek-r1:free";

const validateApiKey = (req, res, next) => {
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Server configuration error" });
  }
  next();
};

router.post("/chat", validateApiKey, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const systemPrompt = {
      role: "system",
      content: "You are a helpful assistant for MyApp called futurex."
    };

    const requestBody = JSON.stringify({
      model: req.body.model || DEFAULT_MODEL,
      messages: [systemPrompt, ...messages]
    });

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
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
          if (parsedData.error?.metadata?.raw?.includes("429")) {
            return res.status(429).json({ error: "Please wait a minute before trying again" });
          }
          res.json(parsedData);
        } catch {
          res.status(500).json({ error: "Failed to process response" });
        }
      });
    });

    openRouterReq.on('error', () => {
      res.status(500).json({ error: "Failed to connect to API" });
    });

    openRouterReq.write(requestBody);
    openRouterReq.end();

  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;