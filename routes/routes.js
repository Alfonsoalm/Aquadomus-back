// routes.js
const express = require('express');
const nodesRouter = require("./nodesRouter");
const sensorsRouter = require("./sensorsRouter");
const actuatorsRouter = require('./actuatorsRouter');
const databaseRouter = require('./databaseRouter');

const appRouter = express.Router();

appRouter.use('/nodes', nodesRouter);

appRouter.use('/sensors', sensorsRouter);

appRouter.use('/actuators', actuatorsRouter);

appRouter.use('/database', databaseRouter);

module.exports =  appRouter ;