const mongoose = require('mongoose');

const tourHistorySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String,
        required: true
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    }
});

const TourHistory = mongoose.model('TourHistory', tourHistorySchema);

module.exports = TourHistory;
