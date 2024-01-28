// flightDataHandler.js

// Function to handle flight data
function handleFlightData(flightData) {
    const flights = flightData.flightOffers.map((offer) => {
      const {
        token,
        segments,
        priceBreakdown: { total },
      } = offer;
  
      const departureAirport = segments[0].departureAirport.cityName;
      const arrivalAirport = segments[0].arrivalAirport.cityName;
      const departDate = segments[0].departureTime;
      const price = total.units + total.nanos / 1e9;
  
      return { token, departureAirport, arrivalAirport, departDate, price };
    });
  
    return flights;
  }
  
  module.exports = { handleFlightData };
  