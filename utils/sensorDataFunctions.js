// utils/sensorDataFunction.js
const { SensorData } = require("../_database/models/sensorData");
const { SensorDataRepository } = require("../_database/repositories/sensorDataRepository");

const insertSensorData = async (sensorData) => {
    if (!Array.isArray(sensorData) || sensorData.length === 0) {
        throw new Error("No hay datos de sensores para insertar.");
    }

    // Obtener los atributos del modelo para asegurarnos de que solo insertamos los válidos
    const validFields = Object.keys(SensorData.getAttributes());
        // console.log("validFields de SensorData: ", validFields);

    const insertedData = await Promise.all(
    sensorData.map(async (sensor) => {
        const filteredData = Object.fromEntries(
        Object.entries(sensor).filter(([key]) => validFields.includes(key))
        );
        return await SensorDataRepository.insert(filteredData);
    })
    );
    return insertedData
}

module.exports = { insertSensorData };