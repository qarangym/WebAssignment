const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
