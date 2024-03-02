// controllers/historyController.js
const TourHistory = require('../models/TourHistory');

// Get all tour history
exports.getAllTourHistory = async (req, res) => {
    try {
        const tourHistory = await TourHistory.find();
        res.json(TourHistory);
    } catch (err) {
        console.error('Error fetching tour history:', err);
        res.status(500).send('Internal Server Error');
    }
};
