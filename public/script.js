
async function getWeather() {
  const cityInput = document.getElementById('city');
  const cityName = cityInput.value;

  try {
    const response = await fetch(`/weather?city=${encodeURIComponent(cityName)}`);
    const weatherData = await response.json();

    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
      <h2>Weather Information for ${weatherData.location}</h2>
      <p>Temperature: ${weatherData.temperature}°C</p>
      <p>Condition: ${weatherData.condition}</p>
      <p>Humidity: ${weatherData.humidity}%</p>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}