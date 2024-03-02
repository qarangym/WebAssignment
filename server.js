const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tourRoutes = require('./routes/tourRoutes');
const historyRoutes = require('./routes/historyRoutes');
const app = express();
const port = 3000;
const uri = 'mongodb+srv://aruakh:tima1396@cluster0.sh7vxoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function loadTourHistory() {
    try {
        const data = await fs.readFile('./data/history.json', 'utf8');
        tourHistory = JSON.parse(data);
    } catch (error) {
        console.error('Error loading tour history:', error);
    }
}
app.get('/travelagency/history', (req, res) => {
    res.json(tourHistory);
});
app.get('/weather', async (req, res) => {
    try {
        const apiKey = 'f8c14aa329ba434b8c992642241701';
        const city = req.query.city || 'undefined'; 
  
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
  
        const weatherData = {
            location: response.data.location.name,
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
            humidity: response.data.current.humidity,
        };
  
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB Atlas
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Routes
app.use('/api', tourRoutes);

app.use('/api', historyRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    loadTourHistory();
});
