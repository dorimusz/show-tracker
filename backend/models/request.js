const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comment: { type: String },
    status: { type: String, default: "pending" },
})

const Request = mongoose.model("request", requestSchema);
module.exports = Request;
