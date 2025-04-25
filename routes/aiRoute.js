const express = require("express");
const fetch = import("node-fetch");
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
  try {
    const { messages, model } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Define your system prompt (instructions for the AI)
    const systemPrompt = {
      role: "system",  // OpenRouter supports "system" role for instructions
      content: `You are a helpful assistant for MyApp called futurex.
       whih help student to plan their study,give resource and motivate students.
        Be concise and friendly.`
    };

    // Prepend system prompt to user messages
    const updatedMessages = [systemPrompt, ...messages];

    const requestBody = {
      model: model || DEFAULT_MODEL,
      messages: updatedMessages,  // Use the modified array
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": req.headers.referer || "https://your-site.com",
        "X-Title": "Your App Name",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // ... rest of your error handling and response logic
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
