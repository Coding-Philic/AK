const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    console.log("📩 Data Received:", req.body);

    const newMsg = new Contact(req.body);
    await newMsg.save();

    res.json({ success: true, msg: "✅ Message saved successfully!" });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ success: false, msg: "Server Error", error: err.message });
  }
});

module.exports = router;
