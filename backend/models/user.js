const mongoose = require('mongoose');

//subdocuments, no need to make model out of them
const episodeSchema = new mongoose.Schema({
    name: { type: String }, //ide lehet felesleges?
    season: { type: String },
    epNumber: { type: String },
    airdate: { type: String },
    watched: { type: Boolean }
});

const tvShowSchema = new mongoose.Schema({
    showId: { type: String },
    name: { type: String },
    type: { type: String },
    language: { type: String },
    genres: { type: Array },
    status: { type: String },
    runtime: { type: String },
    netwrok: { type: String },
    image: { type: String },
    summary: { type: String },
    seasons: [episodeSchema],
    isIgnored: { type: Boolean }, //ignored or not, showing on show overview page
    isDeleted: { type: Boolean } //if deleted from watchlist
})


const watchlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    seriesList: [tvShowSchema],
});

const userSchema = new mongoose.Schema({
    username: { type: String }, //empty string is not accepted + !!!UNIQUE
    providers: {
        google: { type: String, sparse: true, unique: true },
        oid: { type: String, sparse: true, unique: true },
    },
    watchlist: [watchlistSchema], //empty list as default
});

const User = mongoose.model("user", userSchema);
module.exports = User;