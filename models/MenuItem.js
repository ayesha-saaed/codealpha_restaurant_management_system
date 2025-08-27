const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, default: "main course" }, // e.g. "starter", "drink"
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);
