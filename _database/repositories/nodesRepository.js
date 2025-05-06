// nodesRepository.js
const { Nodes } = require( '../models/nodes.js');
const { decryptData } = require("../../utils/cryptoUtils.js");
const sequelize = require('../connection.js');

class NodesRepository {
  static async get(filters = {}) {
    const nodes = await Nodes.findAll({ where: filters });
    return nodes.map((node) => {
      const decryptedNode = node.dataValues;
      try {
        decryptedNode.token = decryptData(decryptedNode.token);
      } catch (error) {
        console.error("Error al desencriptar token:", error, "Nodo ID:", decryptedNode.id);
        decryptedNode.token = null;
      }
      return decryptedNode;
    });
  }

  static async insert(newNode){
    const node = await Nodes.create(newNode)
    return node.dataValues
  }

  static async delete(filters){
    await Nodes.destroy({where: filters})
  }

  static async update(updates, filters) {
    await Nodes.update(updates, {
        where: filters,
    });
  }

  static async getFields() {
    const query = `DESCRIBE nodes;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }
  
}                                                                                                                                                                                                                                                                                                                 

module.exports = { NodesRepository };