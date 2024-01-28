const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the weather page
app.get('/weather', async (req, res) => {
  try {
    const apiKey = 'f8c14aa329ba434b8c992642241701';
    const city = req.query.destination || 'Astana'; // Use 'destination' query parameter for city

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

// Define a route to search for flights
// Route for searching flights
app.get('/flights/search', async (req, res) => {
  try {
    const { fromId, toId, departDate } = req.query;

    const options = {
      method: 'GET',
      url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        fromId: 'NQZ.AIRPORT',
        toId: 'ALA.AIRPORT',
        departDate: '2024-02-02',
        pageNo: '1',
        adults: '1',
        children: '0',
        currency_code: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '273be8f9eamshe6fddc537b08da0p14b121jsn36f71f2a94cd',
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    // Check if flight offers exist
    if (!response.data.flightOffers || response.data.flightOffers.length === 0) {
      throw new Error('No flight offers available.');
    }

    // Extract flight data from the response
    const flight = response.data.flightOffers[0]; // Assuming the first offer is used
    const segments = flight.segments || [];
    const firstSegment = segments[0] || {};

    const flightsData = {
      destination: firstSegment.arrivalAirport ? firstSegment.arrivalAirport.cityName : 'Unknown',
      departureTime: firstSegment.departureTime || 'Unknown',
      arrivalTime: firstSegment.arrivalTime || 'Unknown',
      price: flight.travellerPrices ? flight.travellerPrices[0] : 'Unknown'
    };

    res.json(flightsData);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
