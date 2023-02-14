const express = require("express");
const router = express.Router();
const { createHelloWorld } = require("../controllers/helloWorldController");

router.get("/", createHelloWorld);

module.exports = router;
