const mongoose = require('mongoose');

//subdocuments, no need to make model out of them
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true }, //empty string is not accepted
    description: { type: String, required: true }, //empty string IS enough
    isDone: { type: Boolean, default: false },
});

const dashboardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    todos: [todoSchema],
});

//uses the subdocuments
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }, //empty string is not accepted + !!!UNIQUE
    googleID: { type: String, unique: true, required: true }, //google auth miatt + !!!UNIQUE
    // email: { type: String, unique: true, required: true }, //empty string is not accepted + validation + !!!UNIQUE
    // password: { type: String, required: true }, //empty string is not accepted + validation
    dashboards: [dashboardSchema], //empty list as default
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;