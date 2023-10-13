//Feature 1//

let time = new Date();
let currentDate = document.querySelector("#current-date");
let date = time.getDate();
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = daysWeek[time.getDay()];

currentDate.innerHTML = `${day} ${date}, ${hours}:${minutes}`;

//Functionalities for homework 5//

function enterCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-text").value;
  searchCity = searchCity.toLowerCase();
  searchCity = searchCity.trim();

  let units = "metric";
  let apiKey = "600e71379f8c180beb6f6a60ca757713";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);

  let cityDisplay = document.querySelector("#input-city");
  let tempDisplay = document.querySelector("#temperature");
  let conditionDisplay = document.querySelector("#current-condition");
  let humidDisplay = document.querySelector("#humidity");
  let windDisplay = document.querySelector("#wind-speed");

  cityDisplay.innerHTML = `${city}`;
  tempDisplay.innerHTML = `${temp}°C`;
  conditionDisplay.innerHTML = `${condition}`;
  humidDisplay.innerHTML = `Humidity: ${humidity}%`;
  windDisplay.innerHTML = `Wind: ${windSpeed}km/h`;

  console.log(response);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

//Current weather//

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "600e71379f8c180beb6f6a60ca757713";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(position);

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(currentPosition);

let weatherButton = document.querySelector("#current-button");
weatherButton.addEventListener("click", currentPosition);
