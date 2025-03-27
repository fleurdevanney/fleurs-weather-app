function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let speed = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let feelsElement = document.querySelector("#feels");
  let feels = response.data.temperature.feels_like;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${Math.round(speed)}mph`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class=weather-app-icon /img>`;
  feelsElement.innerHTML = `${Math.round(feels)}%`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "16bfc20460o66fe0f260tfe95532783a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchAction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchAction);

function getForecast(city) {
  let apiKey = "16bfc20460o66fe0f260tfe95532783a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tues", "Weds", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>12°C</strong>
            </div>
              <div class="weather-forecast-temperature">6°C</div>
           </div>
        </div>
     
      `;
  });

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
