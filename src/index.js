function searchForCity(event) {
  event.preventDefault();
  let cityName = document.querySelector('#city-name');
  let searchInput = document.querySelector('#input-text');
  cityName.innerHTML = searchInput.value;
}

let formElement = document.querySelector('#form');
formElement.addEventListener('submit', searchForCity);
