const express = require('express');
const { getDatabaseSize, getTableSize, deleteTableData } = require('../controllers/databaseController');

const databaseRouter = express.Router();

databaseRouter.get('/get-size', getDatabaseSize);

databaseRouter.get('/get-table-size', getTableSize);

databaseRouter.post('/delete-data', deleteTableData);

module.exports = databaseRouter ;