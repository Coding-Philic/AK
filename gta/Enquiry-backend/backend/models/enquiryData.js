const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  message : { type: String, required: true },
  phone : {type: String, required: true},
  type :{type: String, required: true}
}, { timestamps: true });


module.exports = mongoose.model("Enquiry", EnquirySchema);        