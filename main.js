// main.js
const { sendRequest } = require("./config/session-ApiRest.js");
const { formatSensor, formatData } = require("./utils/formatFunctions.js");
const { getNodes, setNode } = require("./utils/nodeFunctions.js");
const { insertSensors, getSensors } = require("./utils/sensorsFunctions.js");
const { insertSensorData } = require("./utils/sensorDataFunctions.js");

// Función que obtendrá las IPs y los datos de los sensores de Home Assistant
const cyclicSensorsReading = async () => {
    try {
      const nodesData = await getNodes();
      for (const id in nodesData) {
        const ip = nodesData[id];
        const ipData = await setNode(ip);
        const data = await sendRequest("GET", selectedIP = ipData.dynamicIP, selectedToken = ipData.dynamicToken,"");
        const dataFiltered = data.filter(
          (item) =>
            (item.entity_id.startsWith("sensor.") && 
            !item.entity_id.startsWith("sensor.sun")) || 
            item.entity_id.startsWith("switch.")
        );
        const dataSensorsFormatted = formatSensor(id, dataFiltered);
        await insertSensors(dataSensorsFormatted);
        const sensors = await getSensors();
        const formattedData = formatData(sensors, dataFiltered);
        await insertSensorData(formattedData);
      }
    } catch (error) {
      console.error("Error en el ciclo de obtención de datos:", error);
    }
  };

  module.exports = { cyclicSensorsReading };