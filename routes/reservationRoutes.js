const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reservationController");

router.post("/", ctrl.createReservation);
router.get("/", ctrl.getReservations);
router.patch("/:id/status", ctrl.updateStatus);

module.exports = router;
