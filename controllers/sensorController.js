// controller/sensorController.js
const { Op } = require("sequelize");
const { SensorDataRepository } = require("../_database/repositories/sensorDataRepository.js");
const { SensorsRepository } = require("../_database/repositories/sensorsRepository.js");
const { handleCheck } = require("../utils/handleCheck.js");

// Obtiene sensores de la base de datos
const getSensors = async (req, res) => {
  const { id } = req.query;
  await handleCheck(
    res,
    async () => {
      const sensors = await SensorsRepository.get({ id_registro: id });
      return sensors;
    },
    "Error al obtener sensores"
  );
};

// Obtener información de uno o todos los sensores del nodo
const getSensorsData = async (req, res) => {
	const { sensorIds } = req.query;
	console.log("IDs recibidos en la petición:", sensorIds);
	await handleCheck(
		res,
		async () => {
			let filters = {};
			if (sensorIds) {
				const idsArray = Array.isArray(sensorIds)
					? sensorIds.map(Number)
					: [Number(sensorIds)];
				filters.id_sensor = { [Op.in]: idsArray };
			}
			const sensors = await SensorDataRepository.get(filters);
			return sensors;
		},
		"Error al obtener datos de los sensores"
	);
};

module.exports = { getSensors, getSensorsData };
