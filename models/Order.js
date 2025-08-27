const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      quantity: { type: Number, default: 1, min: 1 }
    }
  ],
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["pending","completed","cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
