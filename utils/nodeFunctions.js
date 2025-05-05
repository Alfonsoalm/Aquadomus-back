// utils/nodeFunction.js
const { NodesRepository } = require("../_database/repositories/nodesRepository");

const getNodes = async () => {
    const nodes = await NodesRepository.get();
    if (!nodes || nodes.length === 0) {
        throw new Error("No hay IPs registradas");
    }
    const nodesData = nodes.reduce((acc, node) => {
        acc[node.id] = node.ip;
        return acc;
    }, {});
    
    // console.log("nodesData", nodesData)
    return nodesData;
}

const setNode = async (ip) => {
    const nodes = await NodesRepository.get({ ip });
    if (nodes && nodes.length > 0) {
      dynamicIP = nodes[0].ip; console.log("ip: ", dynamicIP)
      dynamicToken = nodes[0].token;
    } else {
      console.error("IP no válida o varias IPs repetidas");
    }
    return {dynamicIP, dynamicToken}
}

module.exports = { getNodes, setNode};