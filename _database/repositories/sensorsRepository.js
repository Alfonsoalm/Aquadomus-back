// sensorsRepository.js
const { Sensors } = require( '../models/sensors.js');

class SensorsRepository {
	static async get(filters = {}) {
		const sensors = await Sensors.findAll({ where: filters });
		return sensors.map(data => data.dataValues);
	}

	static async insert(newSensor){
		const sensor = await Sensors.create(newSensor)
		return sensor.dataValues
	}

	static async delete(filters){
		await Sensors.destroy({ where: filters })
	}

	static async update(updates, filters) {
		await Sensors.update(updates, { where: filters });
	}
}                                                                                                                                                                                                                                                                                                                 

module.exports = { SensorsRepository };