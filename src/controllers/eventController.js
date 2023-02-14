const Event = require("../models/Event");
const { NotFoundError, BadRequestError } = require("../utils/error");

exports.createEvent = async (req, res) => {
  const name = req.body.name;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const location = req.body.location;
  const description = req.body.description;

  if (!name) throw new BadRequestError("Du måste ange ett namn!");
  if (!startDate) throw new BadRequestError("Du måste ange en tid!");
  if (!endDate) throw new BadRequestError("Du måste ange en tid!");
  if (!startTime) throw new BadRequestError("Du måste ange en tid!");
  if (!endTime) throw new BadRequestError("Du måste ange en tid!");
  if (!location) throw new BadRequestError("Du måste ange en plats");
  if (!description) throw new BadRequestError("Du måste ange en beskrivning!");

  const newEvent = await Event.create({
    name: name,
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    endTime: endTime,
    location: location,
    description: description,
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/events/${newEvent._id}`
    )
    .status(201)
    .json(newEvent);
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;

  const {
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    description,
  } = req.body;

  if (
    !name ||
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !location ||
    !description
  ) {
    throw new BadRequestError("Du måste ange alla fält för att uppdatera");
  }

  const eventToUpdate = await Event.findById(eventId);

  if (!eventToUpdate) throw new NotFoundError("Det här eventet finns inte!");

  if (name) eventToUpdate.name = name;
  if (startDate) eventToUpdate.startDate = startDate;
  if (endDate) eventToUpdate.endDate = endDate;
  if (startTime) eventToUpdate.startTime = startTime;
  if (endTime) eventToUpdate.endTime = endTime;
  if (location) eventToUpdate.location = location;
  if (description) eventToUpdate.description = description;

  const updatedEvent = await eventToUpdate.save();

  res.send(`Event med id: ${eventId} har uppdaterats`);
  return res.json(updatedEvent);
};

exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;

  const eventToDelete = await Event.findById(eventId);

  if (!eventToDelete) throw new NotFoundError("This event does not exist");

  await eventToDelete.delete();

  return res.send(`Event med id: ${eventId} har tagits bort`);
};

exports.getAllEvents = async (req, res) => {
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query?.offset || 0);

  const events = await Event.find().limit(limit).skip(offset);
  const totalEventsInDatabase = await Event.countDocuments();

  return res.json({
    data: events,
    meta: {
      total: totalEventsInDatabase,
      limit: limit,
      offset: offset,
      count: events.length,
    },
  });
};

exports.getEventById = async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);

  if (!event) throw new NotFoundError("Det här eventet existerar inte");
  return res.json(event);
};
