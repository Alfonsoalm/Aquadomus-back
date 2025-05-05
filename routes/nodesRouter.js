const express = require('express');
const { getIps, registerNode, getNodes, editNode, deleteNode, getFields } = require ('../controllers/nodeController');
const nodesRouter = express.Router();

nodesRouter.get('/get-nodes', getNodes);

nodesRouter.get('/get-fields', getFields);

nodesRouter.get('/get-ips', getIps);

nodesRouter.post('/insert-node', registerNode);

nodesRouter.put('/update-node', editNode);

nodesRouter.delete('/delete-node', deleteNode);

module.exports = nodesRouter ;