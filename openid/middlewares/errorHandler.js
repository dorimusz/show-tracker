// mivel 4 bemeneti paraméter van, tudni fogja, hogy ez error handler - de az err az első!!!
const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json("Something went wrong, bro");
}

module.exports = errorHandler