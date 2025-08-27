const Table = require("../models/Table");

exports.createTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTables = async (req, res) => {
  const q = {};
  if (req.query.available === "true") q.isAvailable = true;
  if (req.query.available === "false") q.isAvailable = false;
  const tables = await Table.find(q).sort({ tableNumber: 1 });
  res.json(tables);
};

exports.setAvailability = async (req, res) => {
  const t = await Table.findByIdAndUpdate(req.params.id,
     { isAvailable: req.body.isAvailable }, { new: true });
  if (!t) return res.status(404).json({ message: "Table not found" });
  res.json(t);
};
