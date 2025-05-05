const express = require('express');
const { getActuators, getActuatorsData, setActuatorState, getActuatorState } = require('../controllers/actuatorController');
const actuatorsRouter = express.Router();

actuatorsRouter.get('/get-actuators', getActuators);

actuatorsRouter.get('/get-data', getActuatorsData);

actuatorsRouter.get('/get-state', getActuatorState);

actuatorsRouter.post('/set-state', setActuatorState);

module.exports = actuatorsRouter ;