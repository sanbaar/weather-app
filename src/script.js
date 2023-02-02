let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentTime = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
let date = document.getElementById("date");
date.innerHTML = day + " " + currentTime;

function showTemperature(response) {
  document.querySelector("#main-temperature").innerHTML =
    " " + Math.round(response.data.main.temp);
  document.querySelector("#main-wind").innerHTML =
    " " + Math.round(response.data.wind.speed);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  function celsius(event) {
    event.preventDefault();
    let temperatureCelsius = document.querySelector("#main-temperature");
    temperatureCelsius.innerHTML = " " + Math.round(response.data.main.temp);
  }

  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", celsius);

  function fahrenheit(event) {
    event.preventDefault();
    let temperatureFahrenheit = document.querySelector("#main-temperature");
    temperatureFahrenheit.innerHTML =
      " " + Math.round((response.data.main.temp * 9) / 5 + 32);
  }

  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", fahrenheit);
}

function city(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=2ff29bed3181c3526c35cc5408037f85&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let cityApp = document.querySelector("#search-city");
cityApp.addEventListener("submit", city);

function showGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showGeolocation);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2ff29bed3181c3526c35cc5408037f85&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
