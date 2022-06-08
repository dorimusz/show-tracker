const logger = require('../utils/logger')
// mivel 4 bemeneti paraméter van, tudni fogja, hogy ez error handler - de az err az első!!!
const errorHandler = (err, req, res, next) => {
    logger.error(new Error("render error"), err.toString());
    res.status(500).json("Caught by error middleware");
}

module.exports = errorHandler