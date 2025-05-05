// sensorDataRepository.js
const { SensorData } = require( '../models/sensorData.js');

class SensorDataRepository {
  static async get(filters = {}) {
    const sensorData = await SensorData.findAll({where: filters});
    return sensorData.map(data => data.dataValues);
  }

  static async insert(newData){
    const data = await SensorData.create(newData)
    return data.dataValues
  }

  static async delete(filters){
    await SensorData.destroy({where: filters})
  }

  static async update(updates, filters) {
    await SensorData.update(updates, { where: filters });
  }
}                                                                                                                                                                                                                                                                                                                 

module.exports = { SensorDataRepository };