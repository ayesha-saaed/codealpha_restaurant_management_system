const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

function twoHourWindow(date) {
  const d = new Date(date);
  const start = new Date(d.getTime() - 2 * 60 * 60 * 1000);
  const end   = new Date(d.getTime() + 2 * 60 * 60 * 1000);
  return { start, end };
}

exports.createReservation = async (req, res) => {
  try {
    const { customerName, table, reservationTime } = req.body;
    const tbl = await Table.findById(table);
    if (!tbl) return res.status(404).json({ message: "Table not found" });

    const { start, end } = twoHourWindow(reservationTime);
    const clash = await Reservation.findOne({
      table,
      status: "booked",
      reservationTime: { $gte: start, $lte: end }
    });
    if (clash) return res.status(400).json({ message: "Time slot not available" });

    const created = await Reservation.create({ customerName, table, reservationTime });
    await Table.findByIdAndUpdate(table, { isAvailable: false });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getReservations = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const list = await Reservation.find(filter)
    .populate("table", "tableNumber seats")
    .sort({ reservationTime: 1 });
  res.json(list);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["booked","completed","cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ message: "Bad status" });

  const updated = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: "Reservation not found" });

  if (status !== "booked") {
    await Table.findByIdAndUpdate(updated.table, { isAvailable: true });
  }
  res.json(updated);
};
