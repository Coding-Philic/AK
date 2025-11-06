const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const upload = multer({ dest: "uploads/" }); // Temporary folder

const API_KEY = "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";

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
    const context = uploadedFileText
      ? `You have the following document content available:\n\n${uploadedFileText.slice(0, 5000)}\n\n`
      : "";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          { role: "system", content: "You are an assistant that answers questions based on uploaded documents and user input." },
          { role: "user", content: context + "\nUser question: " + userMessage },
        ],
      }),
    });
console.log(response)

    const data = await response.json();
    console.log(data)
    const answer = data.choices?.[0]?.message?.content || "No response from model.";
    res.json({ answer });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
