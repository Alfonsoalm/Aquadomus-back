// controller/relayController.js
const { sendRequest } = require("../config/session-ApiRest.js");
const { handleCheck } = require("../utils/handleCheck");

const changeRelayState = async (req, res) => {
  const { state } = req.body;
  if (!["on", "off"].includes(state)) {
    return res.status(400).json({ error: "Estado inválido, usa 'on' o 'off'" });
  }
  await handleCheck(
    res,
    async () => {
      const result = await sendRequest("POST", "switch.solid_state_relay", {
        state,
      });
      return { message: `Relé cambiado a ${state}`, data: result };
    },
    "Error al cambiar el estado del relé"
  );
};

const getRelayState = async (req, res) => {
  await handleCheck(
    res,
    async () => {
      const result = await sendRequest("GET", "switch.solid_state_relay");
      return { state: result.state };
    },
    "Error al obtener el estado del relé"
  );
};

module.exports = { changeRelayState, getRelayState };
