//1
let today = new Date();
let h2 = document.querySelector("h2");

let currentmillisecond = today.getMilliseconds();

let days = ["Sun", "Mon", "Teus", "Weds", "Thurs", "Fri", "Sat"];
let currentDay = days[2];

let currentYear = today.getFullYear();
let currentDate = today.getDate();

let months = [
	"Jan",
	"Feb",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
let currentMonth = months[1];

let currentHour = today.getHours();
let currentMinute = today.getMinutes();

h2.innerHTML = `${currentDay} ${currentMonth} ${currentDate}, ${currentYear}: ${currentHour} ${currentMinute} ${currentmillisecond}`;

//2

function search(event) {
	event.preventDefault();
	let cityElement = document.querySelector("#city");
	let cityInput = document.querySelector("#city-input");
	cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//convert temp 
function displayFar (event){
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let farTemp = (tempElement.innerHTML *9)/5+32;
  tempElement.innerHTML = Math.round(farTemp);
}

let farLink = document.querySelector("#fahrenheit");
farLink.addEventListener("click", displayFar);

///

function showWeather(response) {
	let cityElement = document.querySelector("h1");
	cityElement.innerHTML = `${response.data.name}`;
	let temperature = Math.round(response.data.main.temp);
	document.querySelector("#temperature").innerHTML = `${temperature}`;
	let description = response.data.weather[0].description;
	document.querySelector("#degree").innerHTML = `${description}`;
	//console.log(response.data);
	document.querySelector("#humid").innerHTML = response.data.main.humidity;
	document.querySelector("#windy").innerHTML = Math.round(
    response.data.wind.speed);

    //icon//
    let iconElement = document.querySelector("#icon")
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
	let apiKey = "6c3ed25c99387b9ebbd7be3237775381";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

	axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
	event.preventDefault();
	let city = document.querySelector("#city-input").value;
	searchCity(city);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", showCity);

searchCity("Paris");

// Geolocation

function showPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "6c3ed25c99387b9ebbd7be3237775381";
	let units = "metric";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", getPosition);


