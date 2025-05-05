// utils/nodeFunctions.js
const { NodesRepository } = require("../_database/repositories/nodesRepository");

const getNodes = async () => {
  try {
    const nodes = await NodesRepository.get();
    if (!nodes || nodes.length === 0) {
      console.log("No hay IPs registradas en la base de datos.");
      return {};
    }
    const nodesData = nodes.reduce((acc, node) => {
      acc[node.id] = node.ip;
      return acc;
    }, {});
    return nodesData;
  } catch (error) {
    console.error("Error al obtener nodos:", error);
    return {}; // Devuelve un objeto vacío en caso de error
  }
}

const setNode = async (ip) => {
  let dynamicIP;
  let dynamicToken;
  try {
    const nodes = await NodesRepository.get({ ip });
    if (nodes && nodes.length === 1) { // Asegurarse de que solo hay una IP coincidente
      dynamicIP = nodes[0].ip;
      dynamicToken = nodes[0].token;
      console.log("IP encontrada:", dynamicIP);
    } else if (nodes && nodes.length > 1) {
      console.error(`Múltiples IPs repetidas encontradas para: ${ip}`);
    } else {
      console.log(`No se encontró información del nodo para la IP: ${ip}`);
    }
    return { dynamicIP, dynamicToken };
  } catch (error) {
      console.error(`Error al obtener información del nodo para la IP ${ip}:`, error);
      return { dynamicIP: undefined, dynamicToken: undefined }; // Devuelve undefined en caso de error
  }
}

module.exports = { getNodes, setNode };