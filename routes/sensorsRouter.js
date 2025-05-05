const express = require("express");
const { getSensors } = require("../controllers/sensorController");
const { getSensorsData } = require("../controllers/sensorController");

const sensorsRouter = express.Router();

sensorsRouter.get("/get-sensors", getSensors);

sensorsRouter.get("/get-data", getSensorsData);

module.exports =  sensorsRouter ;
