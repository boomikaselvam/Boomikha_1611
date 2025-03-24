const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

async function getWeather() {
    const city = document.getElementById("city").value;
    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError("Unable to retrieve weather information. Try again later.");
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.classList.remove("error");
}

function showError(message) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `<p class="error">${message}</p>`;
}
