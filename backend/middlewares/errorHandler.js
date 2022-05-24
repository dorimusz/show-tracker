const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json("Something went wrong, bro");
}

module.exports = errorHandler