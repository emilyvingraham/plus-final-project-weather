function respondToCity(response) {
  let temperatureElement = document.querySelector('#current-temperature');
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector('#city-name');
  let feelsLikeElement = document.querySelector('#feels-like');
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  let latitudeElement = document.querySelector("#latitude");
  let latitude = response.data.coordinates.latitude.toFixed(2);
  let longitudeElement = document.querySelector("#longitude");
  let longitude = response.data.coordinates.longitude.toFixed(2);
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");

  console.log(response.data);

  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.city;
  feelsLikeElement.innerHTML = `${feelsLike}°`
  humidityElement.innerHTML = `${humidity}%`
  windElement.innerHTML = `${wind}km/h`;
  latitudeElement.innerHTML = `${latitude}°, `
  longitudeElement.innerHTML = `${longitude}°`
  countryElement.innerHTML = response.data.country;
  descriptionElement.innerHTML = response.data.condition.description;
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

let formElement = document.querySelector('#form');
formElement.addEventListener('submit', searchForCity);

updateCityName('Denver');
