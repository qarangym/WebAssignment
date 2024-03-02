// routes/historyRoutes.js

const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Route to get all tour history
router.get('/history', historyController.getAllTourHistory);

module.exports = router;
