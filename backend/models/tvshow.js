const mongoose = require('mongoose');//egy sorozat

const episodeSchema = new mongoose.Schema({
    name: { type: String }, //ide lehet felesleges?
    season: { type: String },
    epNumber: { type: String },
    airdate: { type: String },
})

const seriesSchema = new mongoose.Schema({
    showId: { type: String },
    name: { type: String },
    type: { type: String },
    language: { type: String },
    genres: { type: Array },
    status: { type: String },
    runtime: { type: String },
    network: { type: String },
    image: { type: String },
    summary: { type: String },
    seasons: [episodeSchema],
});
const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;