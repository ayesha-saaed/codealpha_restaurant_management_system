const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/tableController");

router.get("/", ctrl.getTables);
router.post("/", ctrl.createTable);
router.patch("/:id/availability", ctrl.setAvailability);

module.exports = router;
