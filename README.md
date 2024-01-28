# WebAssignment

This is a web application for managing tours and viewing tour history in a travel agency. It allows users to add new tours, delete existing tours, view tour listings, and view tour history.

## Features

- **Add Tour:** Users can add new tours by providing tour details such as origin, destination, hotel, dates, and number of adults and children.
- **Delete Tour:** Users can delete existing tours by specifying the ID of the tour they want to delete.
- **View Tours:** Users can view a list of available tours, showing only the destination and price.
- **View History:** Users can view a history of deleted tours, showing the destination, price, and deletion timestamp.
- **Clickable Cities:** Destination cities in the tour listings are clickable. Clicking on a city fetches and displays weather information for that city.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (with Fetch API for AJAX requests)
- **Backend:** Node.js with Express.js
- **Data Storage:** JSON files for storing tour data and tour history
- **External API:** WeatherAPI for fetching weather information

## Installation and Setup

1. Clone this repository to your local machine.
2. Install Node.js if not already installed.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install dependencies.
5. Start the server by running `node server.js` or `npm start`.
6. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. Add a new tour by filling out the form in the "Add a New Tour" section.
2. Delete an existing tour by clicking on "Delete Tour" and entering the ID of the tour to be deleted.
3. View available tours by clicking on "View Tours."
4. View tour history by clicking on "View History."
5. Click on a destination city in the tour listings to view the current weather in that city.

## Credits

- Weather information provided by [WeatherAPI](https://www.weatherapi.com/)

