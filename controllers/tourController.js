// controllers/tourController.js
const Tour = require('../models/Tour');

// Get all tours
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (err) {
        console.error('Error fetching tours:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Get a single tour by ID
exports.getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            res.status(404).send('Tour not found');
            return;
        }
        res.json(tour);
    } catch (err) {
        console.error('Error fetching tour by ID:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new tour
exports.createTour = async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        await newTour.save();
        res.status(201).json(newTour);
    } catch (err) {
        console.error('Error creating tour:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Update a tour by ID
exports.updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTour) {
            res.status(404).send('Tour not found');
            return;
        }
        res.json(updatedTour);
    } catch (err) {
        console.error('Error updating tour:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a tour by ID
exports.deleteTour = async (req, res) => {
    try {
        const tourId = req.params.id;
        const deletedTour = await Tour.findByIdAndDelete(tourId);
        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json({ message: 'Tour deleted successfully', deletedTour });
    } catch (err) {
        console.error('Error deleting tour:', err);
        res.status(500).send('Internal Server Error');
    }
};
