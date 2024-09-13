async function fetchWeather() {
    const apiKey = '32f749558dmsh6b0ca52030e10dap1b4dadjsn6080ce67dc86';
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`City not found: ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error fetching weather data. Please check the city name.');
    }
}

function displayWeather(data) {
    const cityName = data.location.name;
    const tempC = data.current.temp_c;
    const weatherDesc = data.current.condition.text;
    const humidity = data.current.humidity;
    const windMph = data.current.wind_mph;
    const windKph = data.current.wind_kph;
    const pressureMb = data.current.pressure_mb;
    const pressureIn = data.current.pressure_in;
    const feelsLikeC = data.current.feelslike_c;
    const feelsLikeF = data.current.feelslike_f;
    const visibilityKm = data.current.vis_km;
    const visibilityMiles = data.current.vis_miles;
    const uvIndex = data.current.uv;
    const iconUrl = `https:${data.current.condition.icon}`;

    document.getElementById("cityName").innerText = cityName;
    document.getElementById("temp").innerText = `Temperature: ${tempC} °C (${data.current.temp_f} °F)`;
    document.getElementById("weatherDesc").innerText = `Weather: ${weatherDesc}`;
    document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
    document.getElementById("wind").innerText = `Wind Speed: ${windMph} mph (${windKph} kph)`;
    document.getElementById("pressure").innerText = `Pressure: ${pressureMb} mb (${pressureIn} in)`;
    document.getElementById("feelsLike").innerText = `Feels Like: ${feelsLikeC} °C (${feelsLikeF} °F)`;
    document.getElementById("visibility").innerText = `Visibility: ${visibilityKm} km (${visibilityMiles} miles)`;
    document.getElementById("uvIndex").innerText = `UV Index: ${uvIndex}`;
    document.getElementById("weatherIcon").src = iconUrl;
}
