// utils/sensorFunction.js
const { Sensors } = require("../_database/models/sensors");
const { SensorsRepository } = require("../_database/repositories/sensorsRepository");

const getSensors = async () => {
    const sensors = SensorsRepository.get();
    return sensors;
}

const insertSensors = async (sensors) => {
    // console.log("Insertando Sensor ", sensors);

    if (!Array.isArray(sensors) || sensors.length === 0) {
        return res.status(400).json({ message: "No hay datos de sensores para insertar." });
    }

    // Obtener los atributos válidos del modelo Sensors
    const validFields = Object.keys(Sensors.getAttributes());
    // console.log("validFields de Sensors: ", validFields);

    const insertedData = await Promise.all(
        sensors.map(async (sensor) => {
        // Filtrar dinámicamente solo los campos válidos y formatear según tipo
        const filteredData = Object.fromEntries(
            Object.entries(sensor)
            .filter(([key]) => validFields.includes(key))
            .map(([key, value]) => {
                if (key === "valor") {
                return [key, parseFloat(value) || 0.0];
                }
                if (["coordX", "coordY"].includes(key)) {
                return [key, value != null ? parseFloat(value) : null];
                }
                // Para campos de texto que pueden ser nulos (dispositivo, area, ubicacion)
                if (["dispositivo", "area", "ubicacion"].includes(key)) {
                return [key, value != null ? value : null];
                }
                // Para otros campos, por ejemplo id_registro y nombre
                return [key, value != null ? value : "Desconocido"];
            })
        );

        // Verificar si ya existe un sensor con el mismo id_registro y nombre
        const existingSensor = await Sensors.findOne({
            where: {
            id_registro: filteredData.id_registro,
            nombre: filteredData.nombre,
            },
        });

        if (existingSensor) {
            // console.log("Sensor ya existe:", filteredData.nombre, filteredData.id_registro);
            // Omitir la inserción devolviendo null (o se puede devolver el sensor existente)
            return null;
        } else {
            // Insertar el sensor en la base de datos
            return await SensorsRepository.insert(filteredData);
        }
        })
    );

    // Se filtran los nulos para no incluir registros omitidos en la respuesta
    const insertedDataFiltered = insertedData.filter(item => item !== null);
    return insertedDataFiltered;
}

module.exports = { getSensors, insertSensors};