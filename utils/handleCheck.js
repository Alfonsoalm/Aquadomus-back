// utils/handleCheck.js

const handleCheck = async (res, asyncFn, errorMsg) => {
  try {
    const data = await asyncFn();
    res.json({ success: true, data });
  } catch (error) {
    console.error(`❌ ${errorMsg}: ${error.message}`);
    res.status(500).json({
      error: errorMsg,
      details: error.message,
    });
  }
};

module.exports = { handleCheck };
