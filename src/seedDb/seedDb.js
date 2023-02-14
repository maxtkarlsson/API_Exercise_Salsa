require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/Event");
const Course = require("../models/Course");
const { courses } = require("./courses");
const { events } = require("./events");
// Hello from SJ
const populateDbWithMockData = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Course.deleteMany();
    await Event.deleteMany();

    const courseRes = await Course.create(courses);
    const eventRes = await Event.create(events);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData(process.env.MONGO_CONNECTION_STRING);
