// controller/sensorController.js
const { Op } = require("sequelize");
const { SensorDataRepository } = require("../_database/repositories/sensorDataRepository.js");
const { SensorsRepository } = require("../_database/repositories/sensorsRepository.js");
const { sendRequest } = require("../config/session-ApiRest.js");
const { handleCheck } = require("../utils/handleCheck.js");
const { NodesRepository } = require("../_database/repositories/nodesRepository.js");
  
  // Obtiene sensores de la base de datos
  const getActuators = async (req, res) => {
    const { id } = req.query;
    console.log("id", id);
    await handleCheck(
      res,
      async () => {
        const filters = {
          id_registro: id,
          nombre: { [Op.like]: 'switch.%' }, // Solo los switch.*
        };
        const actuators = await SensorsRepository.get(filters);
        console.log("Leyendo actuadores de la base de datos");
        return actuators;
      },
      "Error al obtener actuadores"
    );
  };

  // Obtener información de uno o todos los sensores del nodo
  const getActuatorsData = async (req, res) => {
    const { actuatorsIds } = req.query;
    console.log("IDs recibidos en la petición actuatorsIds:", actuatorsIds);
    await handleCheck(
      res,
      async () => {
        let filters = {};
        if (actuatorsIds) {
          const idsArray = Array.isArray(actuatorsIds)
            ? actuatorsIds.map(Number)
            : [Number(actuatorsIds)];
          filters.id_sensor = { [Op.in]: idsArray };
        }
        const actuators = await SensorDataRepository.get(filters);
        // console.log("Leyendo datos de actuadores de la base de datos:", actuators);
        return actuators;
      },
      "Error al obtener datos de los actuadores"
    );
  };
  
  const setActuatorState = async (req, res) => {
    const { id, state } = req.body;
    console.log("ID recibido en la petición:", id, "Estado:", state);
  
    if (!["on", "off"].includes(state)) {
      return res.status(400).json({ error: "Estado inválido, usa 'on' o 'off'" });
    }
  
    await handleCheck(
      res,
      async () => {
        // Buscar el actuador por ID
        const actuador = await SensorsRepository.get({ id });
        if (!actuador || actuador.length === 0) {
          return res.status(404).json({ error: "Actuador no encontrado" });
        }
        const { nombre: nombreActuador, id_registro } = actuador[0];
        // Validar que sea un switch
        if (!nombreActuador.startsWith("switch.")) {
          return res.status(400).json({ error: "El actuador no es un actuador válido (switch)" });
        }
        // Buscar la IP y el token del nodo a partir del id_registro
        const nodo = await NodesRepository.get({ id: id_registro });
        if (!nodo || nodo.length === 0) {
          return res.status(404).json({ error: "Nodo no encontrado para el actuador" });
        }
        const { ip, token } = nodo[0];
        // Llamada a la API de Home Assistant
        const result = await sendRequest(
          "POST",
          ip,
          token,
          `${nombreActuador}`,
          {
            state,
          }
        );
        return {
          message: `Estado del actuador '${nombreActuador}' cambiado a '${state}'`,
          data: result,
        };
      },
      "Error al cambiar el estado del actuador"
    );
  };

  const getActuatorState = async (req, res) => {
    const { id } = req.query;
    console.log("getActuatorState con id ", id)
    await handleCheck(
      res,
      async () => {
        const actuador = await SensorsRepository.get({ id });
        if (!actuador || actuador.length === 0) {
          return res.status(404).json({ error: "Actuador no encontrado" });
        }
        let filters = {id_sensor: id};
        // Obtenemos los registros de datos del actuador, ordenados por fecha de más reciente a más antiguo
        const actuatorData = await SensorDataRepository.get(filters, { order: [['fecha_hora', 'DESC']] });
        
        if (!actuatorData || actuatorData.length === 0) {
          return res.status(404).json({ error: "No se encontraron datos para el actuador" });
        }
        
        // Tomamos el primer registro de los resultados (el más reciente)
        const latestActuatorData = actuatorData[0];
          return latestActuatorData.valor;

        },
        "Error al cambiar el estado del actuador"
    );
  }
  
  
  module.exports = { getActuators, getActuatorsData, setActuatorState, getActuatorState };
  