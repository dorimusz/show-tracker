const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
})

const Request = mongoose.model("request", requestSchema);
module.exports = Request;
