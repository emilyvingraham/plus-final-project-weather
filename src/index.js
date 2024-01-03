function respondToCity(response) {
  let temperatureElement = document.querySelector('#current-temperature');
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector('#city-name');
  let feelsLikeElement = document.querySelector('#feels-like');
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let humidityElement = document.querySelector('#humidity');
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector('#wind');
  let wind = Math.round(response.data.wind.speed);
  let latitudeElement = document.querySelector('#latitude');
  let latitude = response.data.coordinates.latitude.toFixed(2);
  let longitudeElement = document.querySelector('#longitude');
  let longitude = response.data.coordinates.longitude.toFixed(2);
  let countryElement = document.querySelector('#country');
  let descriptionElement = document.querySelector('#description');
  let iconElement = document.querySelector('#icon');
  let dateElement = document.querySelector('#date-and-time');
  let now = new Date();
  let days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
  let day = days[now.getDay()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours;
  }

  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.city;
  feelsLikeElement.innerHTML = `${feelsLike}°`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  latitudeElement.innerHTML = `${latitude}°, `;
  longitudeElement.innerHTML = `${longitude}°`;
  countryElement.innerHTML = response.data.country;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"/>`;
  dateElement.innerHTML = `${day} ${hours}:${minutes}, `;

  searchForForecast(response.data.city);
}

function updateCityName(city) {
  let apiKey = '47ce0ocdabaf4a2e81b031bb9t47a0e0';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(respondToCity);
}
function searchForCity(event) {
  event.preventDefault();
  let cityName = document.querySelector('#city-name');
  let searchInput = document.querySelector('#input-text');
  cityName.innerHTML = searchInput.value;
  updateCityName(searchInput.value);
}

function searchForForecast(city) {
  let apiKey = '47ce0ocdabaf4a2e81b031bb9t47a0e0';
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateForecast);
}

function formatForecastDay(timestamp) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let date = new Date(timestamp * 1000);

  return days[date.getDay()]

}

function updateForecast(response) {
  console.log(response.data);

  let weekForecast = '';
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      weekForecast =
        weekForecast +
        `<div class="forecast-day">${formatForecastDay(day.time)}
          <div><img class="forecast-icon" src="${day.condition.icon_url}"
          <div class="forecast-temperatures">
          <span class="forecast-temperatures-max">${Math.round(
            day.temperature.maximum
          )}°</span>
          <span class="forecast-temperatures-min">${Math.round(
            day.temperature.minimum
          )}°</span>
                          </div>
                      </div>
                  </div>`;
    }
  });
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = weekForecast;
}


let formElement = document.querySelector('#form');
formElement.addEventListener('submit', searchForCity);

updateCityName('Denver');
