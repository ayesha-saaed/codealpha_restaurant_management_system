const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
  reservationTime: { type: Date, required: true },
  status: { type: String, enum: ["booked","completed","cancelled"], default: "booked" }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
