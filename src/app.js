require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const helloRoutes = require("./routes/helloRoutes");
const courseRoutes = require("./routes/courseRoutes");
const eventRoutes = require("./routes/eventRoute");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/hello", helloRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/events", eventRoutes);

const port = process.env.PORT || 5000;
async function run() {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
