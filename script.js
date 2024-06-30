document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    const getWeatherButton = document.getElementById('getWeatherButton');
    const cityInput = document.getElementById('city');
    const weatherResult = document.getElementById('weather-result');

    console.log('getWeatherButton:', getWeatherButton);
    console.log('cityInput:', cityInput);
    console.log('weatherResult:', weatherResult);

    if (!getWeatherButton) {
        console.error('getWeatherButton element not found');
    }
    if (!cityInput) {
        console.error('cityInput element not found');
    }
    if (!weatherResult) {
        console.error('weatherResult element not found');
    }

    if (getWeatherButton && cityInput && weatherResult) {
        getWeatherButton.addEventListener('click', function () {
            getWeather(cityInput, weatherResult);
        });
    }
});

const apiKey = '8984f488a8a933f8802dedad2780b967';


const weatherDescriptions = {
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "overcast clouds": "nublado",
    "shower rain": "chuva de banho",
    "rain": "chuva",
    "thunderstorm": "trovoada",
    "snow": "neve",
    "mist": "névoa"
};


function getWeather(cityInput, weatherResult) {
    const city = cityInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const description = weatherDescriptions[data.weather[0].description] || data.weather[0].description;
                weatherResult.innerHTML = `
                    <h2>${data.name}</h2>
                    <hr>
                    <br>
                    <p>Temperatura: ${data.main.temp} °C</p>
                    <p>Sensação térmica: ${data.main.feels_like} °C</p>
                    <p>Clima: ${description}</p>
                    <p>Umidade do ar: ${data.main.humidity}%</p>
                    <p>Pressão: ${data.main.pressure}hPa</p>
                    <p>Velocidade do vento: ${data.wind.speed} m/s</p>
                    <p>Direção do vento: ${data.wind.deg}°</p>
                    <p>Mínima: ${data.main.temp_min} °C</p>
                    <p>Máxima: ${data.main.temp_max} °C</p>
                    <p>Amanhecer ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Entardecer ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            weatherResult.innerHTML = '<p>Error fetching weather data</p>';
        });
}
