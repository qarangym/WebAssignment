function toggleTourVisibility() {
    const tourList = document.getElementById('tour-list');
    tourList.style.display = tourList.style.display === 'none' ? 'block' : 'none';
}

function toggleHistoryVisibility() {
    const historyList = document.getElementById('tour-history');
    historyList.style.display = historyList.style.display === 'none' ? 'block' : 'none';
}

async function addTour() {
    try {
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const hotel = document.getElementById('hotel').value;
        const dateArrival = document.getElementById('dateArrival').value;
        const dateDeparture = document.getElementById('dateDeparture').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;

        const response = await fetch('/travelagency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin,
                destination,
                country,
                city,
                hotel,
                dateArrival,
                dateDeparture,
                adults,
                children
            })
        });
        if (response.ok) {
            alert('Tour added successfully!');
            viewTours();
        } else {
            throw new Error('Failed to add tour');
        }
    } catch (error) {
        console.error('Error adding tour:', error);
    }
}

async function deleteTour() {
    try {
        const tourId = prompt('Enter the ID of the tour you want to delete:');
        if (!tourId) return;

        const response = await fetch(`/travelagency/${tourId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Tour deleted successfully!');
            viewTours(); 
        } else {
            throw new Error('Failed to delete tour');
        }
    } catch (error) {
        console.error('Error deleting tour:', error);
    }
}

async function viewTours() {
    try {
        const response = await fetch('/travelagency');
        const tours = await response.json();
        const tourList = document.getElementById('tour-list');
        tourList.innerHTML = ''; 
        tours.forEach(tour => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            const cityLink = document.createElement('a');
            cityLink.textContent = `Destination: ${tour.destination}, Price: ${tour.price}`;
            cityLink.href = '#';
            cityLink.addEventListener('click', (event) => {
                event.preventDefault(); 
                fetchWeather(tour.destination);
            });
            listItem.appendChild(cityLink);
            tourList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching tours:', error);
    }
}

async function fetchWeather(city) {
    try {
        const apiKey = 'f8c14aa329ba434b8c992642241701';
        
        const response = await fetch(`/weather?city=${city}&apiKey=${apiKey}`);
        const weatherData = await response.json();

        alert(`Weather in ${weatherData.location}: Temperature: ${weatherData.temperature}°C, Condition: ${weatherData.condition}, Humidity: ${weatherData.humidity}%`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


async function viewHistory() {
    try {
        const response = await fetch('/travelagency/history');
        const history = await response.json();
        const historyList = document.getElementById('tour-history');
        historyList.innerHTML = '';
        history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = `Destination: ${item.tour.destination}, Price: ${item.tour.price}, Deleted at: ${item.timestamp}`;
            historyList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching tour history:', error);
    }
}

async function fetchCities() {
    try {
        const country = document.getElementById('country').value;
        const response = await fetch(`/cities?country=${country}`);
        const cities = await response.json();
        const cityDropdown = document.getElementById('city');
        cityDropdown.innerHTML = '<option value="">Select City</option>'; 
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

let isViewTours = true;

function toggleTourFunction() {
    if (isViewTours) {
        viewTours(); 
    } else {
        toggleTourVisibility(); 
    }
    isViewTours = false; 
}

let isViewHistory = true;

function toggleHistoryFunction() {
    if (isViewHistory) {
        viewHistory(); 
    } else {
        toggleHistoryVisibility();
    }
    isViewHistory = false; 
}

async function fetchInitialData() {
    try {
        await fetchCities();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

window.onload = fetchInitialData;
