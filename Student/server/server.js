const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");
// Try to load dotenv if available (don't crash if it's not installed)
try {
  // eslint-disable-next-line global-require
  require('dotenv').config();
} catch (e) {
  // dotenv not installed; the server can still use environment variables
  // set by the OS or the caller. Install dotenv with `npm install dotenv` if
  // you want to use a .env file.
}

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const upload = multer({ dest: "uploads/" }); // Temporary folder

// Read API key from environment for security. Do NOT commit real keys to source control.
// Set OPENROUTER_API_KEY in your environment or in a .env file in this folder.
const API_KEY = process.env.OPENROUTER_API_KEY || "";

// Helpful startup log so you can see whether the key is present.
console.log('OPENROUTER_API_KEY present:', !!API_KEY);

// Store file text globally (you can improve this later with sessions)
let uploadedFileText = "";

// ---- 🆕 File Upload Route ----
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let text = "";

    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } 
    else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const data = await mammoth.extractRawText({ path: file.path });
      text = data.value;
    } 
    else if (file.mimetype.startsWith("text/")) {
      text = fs.readFileSync(file.path, "utf-8");
    } 
    else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    uploadedFileText = text; // Save file text globally
    fs.unlinkSync(file.path); // Delete uploaded file after reading

    res.json({ message: "File uploaded successfully", preview: text.slice(0, 300) + "..." });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Error processing file" });
  }
});

// ---- Chat Route (with file context) ----
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    // Keep the context reasonably small to avoid hitting token limits.
    // Tokens ~= 3-4 chars on average; reduce the slice if you have large files.
    const CONTEXT_SLICE_CHARS = parseInt(process.env.CONTEXT_SLICE_CHARS || '2000', 10);
    const context = uploadedFileText
      ? `You have the following document content available:\n\n${uploadedFileText.slice(0, CONTEXT_SLICE_CHARS)}\n\n`
      : "";
    // Allow overriding the max response tokens via env; default to a conservative 800 tokens.
    const MAX_RESPONSE_TOKENS = parseInt(process.env.OPENROUTER_MAX_TOKENS || '800', 10);
    if (!API_KEY) {
      console.error('OpenRouter API key is not configured. Set OPENROUTER_API_KEY in your .env file.');
      return res.status(500).json({ error: 'Server misconfiguration: missing API key' });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        max_tokens: MAX_RESPONSE_TOKENS,
        temperature: 0.2,
        messages: [
          { role: "system", content: "You are an assistant that answers questions based on uploaded documents and user input." },
          { role: "user", content: context + "\nUser question: " + userMessage },
        ],
      }),
    });

    // Better error surface: if upstream returns non-OK, forward the message
    if (!response.ok) {
      let errBody = {};
      try {
        errBody = await response.json();
      } catch (e) {
        errBody = { error: 'Upstream error', status: response.status };
      }
      console.error('OpenRouter error:', response.status, errBody);
      // Provide actionable advice for 402 Payment Required errors
      if (response.status === 402) {
        return res.status(402).json({
          error: errBody,
          hint: 'Your OpenRouter account has insufficient credits or the requested token limit is too high. Reduce max tokens or add credits at https://openrouter.ai/settings/credits.'
        });
      }
      return res.status(response.status).json({ error: errBody });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No response from model.";
    res.json({ answer });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
