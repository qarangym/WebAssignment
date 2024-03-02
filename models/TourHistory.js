// models/TourHistory.js
const mongoose = require('mongoose');

const tourHistorySchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const TourHistory = mongoose.model('TourHistory', tourHistorySchema);

module.exports = TourHistory;
