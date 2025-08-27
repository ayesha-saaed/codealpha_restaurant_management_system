const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/menuController");

// Public
router.get("/", ctrl.getAll);

// Admin/create/update/delete (for now public; add auth later if needed)
router.post("/", ctrl.createItem);
router.put("/:id", ctrl.updateItem);
router.delete("/:id", ctrl.deleteItem);

module.exports = router;
