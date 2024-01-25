const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the weather page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});
app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});
// Define a route to get weather information
app.get('/weather', async (req, res) => {
  try {
    const apiKey = 'f8c14aa329ba434b8c992642241701';
    const city = req.query.city || 'Astana';

    // Make a request to the WeatherAPI
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

    const weatherData = {
      location: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
      humidity: response.data.current.humidity,
    };

    // Send the weather information as a JSON response
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for serving the flight booking page
app.get('/flights', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'flights.html'));
});

// Define a route to get flight information
app.get('/flights/search', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    const apiKey = '273be8f9eamshe6fddc537b08da0p14b121jsn36f71f2a94cd';

    // Make a request to the flight booking API
    const response = await axios.get('https://flight-info-api.p.rapidapi.com/schedules', {
      params: {
        version: 'v2',
        DepartureDateTime: date,
        DepartureAirport: origin,
        ArrivalAirport: destination
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com'
      }
    });

    // Assuming the response format, you can modify it based on the API you're using
    const flightsData = response.data;

    // Send the flight information as a JSON response
    res.json(flightsData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
