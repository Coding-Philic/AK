const express = require("express");
const router = express.Router();
const Enquiry = require("../models/enquiryData"); // ✅ import your model

// POST /api/Enquiry
router.post("/Enquiry", async (req, res) => {
  const { name, email, phone, type, message } = req.body;

  try {
    // Save to DB
    const enquiry = new Enquiry({ name, email, phone, type, message });
    await enquiry.save();

    console.log("New enquiry received:");
    console.log({ name, email, phone, type, message });

    res.status(201).json({ message: `User ${type} successfully saved!` });
  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
