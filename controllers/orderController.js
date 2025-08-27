const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Table = require("../models/Table");

async function calculateTotal(items) {
  let total = 0;
  for (const line of items) {
    const m = await MenuItem.findById(line.menuItem);
    if (!m || !m.available) throw new Error("Menu item not available");
    total += m.price * (line.quantity || 1);
  }
  return Number(total.toFixed(2));
}

exports.placeOrder = async (req, res) => {
  try {
    const { table, items } = req.body;
    const tbl = await Table.findById(table);
    if (!tbl) return res.status(404).json({ message: "Table not found" });

    const totalPrice = await calculateTotal(items);
    const order = await Order.create({ table, items, totalPrice });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const orders = await Order.find(filter)
    .populate("table", "tableNumber")
    .populate("items.menuItem", "name price")
    .sort({ createdAt: -1 });
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending","completed","cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ message: "Bad status" });
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
