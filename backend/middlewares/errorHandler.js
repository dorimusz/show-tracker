const logger = require('../utils/logger')
const errorHandler = (err, req, res, next) => {
    console.log(logger)
    logger.error(new Error("render error"), err.toString());
    res.status(500).json("Caught by error middleware");
}

module.exports = errorHandler