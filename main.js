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
    if (nodesData && Object.keys(nodesData).length > 0) {
      for (const id in nodesData) {
        const ip = nodesData[id];
        try {
          const ipData = await setNode(ip);
          if (ipData) {
            try {
              const data = await sendRequest("GET", selectedIP = ipData.dynamicIP, selectedToken = ipData.dynamicToken,"");
              if (data) {
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
              } else {
                console.log(`No se recibieron datos de Home Assistant para la IP: ${ip}`);
              }
            } catch (error) {
              console.error(`Error al obtener datos de Home Assistant para la IP ${ip}:`, error);
            }
          } else {
            console.log(`No se pudo obtener la configuración del nodo para la IP: ${ip}`);
          }
        } catch (error) {
          console.error(`Error al configurar el nodo para la IP ${ip}:`, error);
        }
      }
    } else {
      console.log("No se encontraron nodos para procesar.");
    }
  } catch (error) {
      console.error("Error en el ciclo de obtención de datos:", error);
  }
};

module.exports = { cyclicSensorsReading };