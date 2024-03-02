// routes/tourRoutes.js
const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Route to get all tours
router.get('/tours', tourController.getAllTours);

// Route to get a single tour by ID
router.get('/tours/:id', tourController.getTourById);

// Route to create a new tour
router.post('/tours', tourController.createTour);

// Route to update a tour by ID
router.put('/tours/:id', tourController.updateTour);

// Route to delete a tour by ID
router.delete('/tours/:id', tourController.deleteTour);

module.exports = router;
