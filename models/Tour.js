// models/Tour.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    city: String,
    hotel: String,
    dateArrival: Date,
    dateDeparture: Date,
    adults: Number,
    children: Number,
    price: Number,
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
