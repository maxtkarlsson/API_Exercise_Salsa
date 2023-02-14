const express = require("express");
const router = express.Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/eventController");

router.post("/", createEvent);
router.put("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);
router.get("/", getAllEvents);
router.get("/:eventId", getEventById);

module.exports = router;
