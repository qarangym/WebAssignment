const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let tours = [];
let tourHistory = [];
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

async function loadToursFromFile() {
    try {
        const data = await fs.readFile('./data/tours.json', 'utf8');
        tours = JSON.parse(data);
    } catch (error) {
        console.error('Error loading tours:', error);
    }
}

async function saveToursToFile() {
    try {
        await fs.writeFile('./data/tours.json', JSON.stringify(tours, null, 2));
    } catch (error) {
        console.error('Error saving tours:', error);
    }
}

async function loadTourHistory() {
    try {
        const data = await fs.readFile('./data/history.json', 'utf8');
        tourHistory = JSON.parse(data);
    } catch (error) {
        console.error('Error loading tour history:', error);
    }
}

async function saveTourHistory() {
    try {
        await fs.writeFile('./data/history.json', JSON.stringify(tourHistory, null, 2));
    } catch (error) {
        console.error('Error saving tour history:', error);
    }
}

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/travelagency', (req, res) => {
    res.json(tours);
});

app.post('/travelagency', (req, res) => {
    const newTour = req.body;
    tours.push(newTour);
    saveToursToFile().then(() => {
        res.status(201).send('Tour added successfully');
    });
});

app.delete('/travelagency/:id', (req, res) => {
    const { id } = req.params;
    const deletedTour = tours.find(tour => tour.id === parseInt(id));
    if (deletedTour) {
        tourHistory.push({ tour: deletedTour, timestamp: new Date().toLocaleString() });
        tours = tours.filter(tour => tour.id !== parseInt(id));
        saveToursToFile().then(() => {
            saveTourHistory().then(() => {
                res.status(200).send('Tour deleted successfully');
            });
        });
    } else {
        res.status(404).send('Tour not found');
    }
});

app.get('/travelagency/history', (req, res) => {
    res.json(tourHistory);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    loadToursFromFile();
    loadTourHistory();
});
