//utils/formatFunctions.js

const formatSensor = (id_registro, sensors) => {
    const sensorsList = [];
    if (!sensors || sensors.length === 0) return;
    for (const sensor of sensors) {
      const formattedSensor = {
        id_registro: id_registro, 
        nombre: sensor.entity_id, 
        dispositivo: null,
        area: null,
        ubicacion: null,
        coordX: 0,
        coordY: 0,
      };
      sensorsList.push(formattedSensor);
    }
    return sensorsList
}

const formatData = (sensors, data) => {
    const dataList = [];
    if (!sensors || !data) return;
    for (const sensor of sensors) {

        // Buscar el sensor correspondiente en Alldata usando el nombre
        const sensorData = data.find(data => data.entity_id === sensor.nombre);
        // console.log("sensorData",sensorData);

        if (!sensorData) {
            // console.warn(`No se encontró data para el sensor: ${sensor.nombre}`);
            continue;
        }
        // Formatear los datos del sensor
        const formattedData = {
            id_sensor: sensor.id, 
            nombre: sensor.nombre,
            valor: String(sensorData.state) || null, 
            estado: "good", 
            fecha_hora: sensorData.last_changed,  
            unidades: sensorData.attributes?.unit_of_measurement || "",
        };
        dataList.push(formattedData);
    }
    return dataList
}

module.exports = { formatSensor, formatData};