const jwt = require('jsonwebtoken')

//ha nem tudja dekodolni, akkor csak simán nullt ad vissza. remek.
let decoded = jwt.decode("alma")

console.log(decoded)