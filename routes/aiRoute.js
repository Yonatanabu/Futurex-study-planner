const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = "deepseek/deepseek-v3-base:free";

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
  console.log("API Key:", process.env.OPENROUTER_API_KEY);
  try {
    const { messages, model } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Validate each message structure
    const isValidMessages = messages.every(
      (msg) => msg.role && msg.content && typeof msg.content === "string"
    );
    if (!isValidMessages) {
      return res.status(400).json({
        error: "Each message must have 'role' and 'content' (string) fields",
      });
    }

    // System prompt
    const systemPrompt = {
      role: "system",
      content: `You are a helpful assistant for FutureX, an app that helps students plan their studies, 
      provide learning resources, and offer motivation. Be concise, friendly, and focus on educational support.`
    };

    // Create the request payload
    const requestBody = {
      model: model || DEFAULT_MODEL,
      messages: [systemPrompt, ...messages],
    };

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        // "HTTP-Referer": req.headers.referer || "https://futurex.app", // Update with your domain
        // "X-Title": "FutureX Study App", // Update with your app name
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Handle API response
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return res.status(response.status).json({
        error: "Failed to get response from AI",
        details: errorData.error?.message || "Unknown error",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

module.exports = router;