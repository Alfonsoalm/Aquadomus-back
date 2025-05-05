// controllers/entityController.js
const { sendRequest } = require("../config/session-ApiRest.js");
const { handleCheck } = require("../utils/handleCheck");

const getEntities = async (req, res) => {
  await handleCheck(
    res,
    async () => {
      const entities = await sendRequest("GET", "");
      const sensores = entities.filter(
        (item) =>
          (item.entity_id.startsWith("sensor.") && 
          !item.entity_id.startsWith("sensor.sun")) || 
          item.entity_id.startsWith("switch.")
      );
      return sensores;
    },
    "Error al obtener entidades"
  );
};

module.exports = { getEntities };

