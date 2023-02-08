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
  document.querySelector("#main-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function celsius(event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML =
    " " + Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML =
    " " + Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheit);

let celsiusTemperature = null;

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
