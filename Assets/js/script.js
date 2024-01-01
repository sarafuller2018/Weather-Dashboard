var APIKey = "3b4fe08e3d81d374d723df247f19a378";
var cityEl = document.getElementById("cityName");
var submitCityButtonEl = document.getElementById("submitCityButton");
var searchHistoryEl = document.getElementById("searchHistory");
var currentWeatherDivEl = document.getElementById("currentWeatherDiv");

// user submits a city and calls functions to complete js logic
submitCityButtonEl.addEventListener("click", function () {
    var cityTextValue = cityEl.value;
    console.log(cityTextValue);

    saveCityButton(cityTextValue);
    getGeoCoding(cityTextValue)
});

// retrieves longitude and latitude of city
function getGeoCoding(city) {
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lat)
            console.log(data[0].lon)
            var Lat = data[0].lat;
            var Long = data[0].lon;
            getCurrentWeather(Lat, Long)
            get5DayWeather(Lat, Long);
        });
};

//retreives current weather for city and adds to page
function getCurrentWeather(lat, long) {
    console.log("this is lat = ", lat);
    console.log("this is long = ", long)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var createHeaderCity = document.createElement("h2");
            var createCurrentDate = document.createElement("p");
            var currentTemp = document.createElement("p");
            var currentWind = document.createElement("p");
            var currentHumidity = document.createElement("p");
            var weatherIcon = data.weather[0].icon;
            var loadWeatherIcon = document.getElementById("weatherIcon");
           
            loadWeatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon +".png");

            createHeaderCity.textContent = data.name;
            createCurrentDate.textContent = dayjs().format("MM/DD/YYYY");
            createCurrentDate.classList.add("bold");
            currentTemp.textContent = "Temperature: " + data.main.temp + " °F";
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";

            currentWeatherDivEl.appendChild(createHeaderCity);
            currentWeatherDivEl.appendChild(createCurrentDate);
            currentWeatherDivEl.appendChild(currentTemp);
            currentWeatherDivEl.appendChild(currentWind);
            currentWeatherDivEl.appendChild(currentHumidity); 
        });
};

//retrieves the 5-day weather for city and adds to page
function get5DayWeather(lat, long) {
    console.log("this is lat = ", lat);
    console.log("this is long = ", long)
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
};

//adds button with city to page
function saveCityButton(city) {
    var addHistory = document.createElement("button");
    addHistory.setAttribute("class", "w-75 m-2");
    addHistory.textContent = city;
    addHistory.addEventListener("click", function (event) {

        var city = event.target.textContent;
        getGeoCoding(city)
    });

    searchHistoryEl.appendChild(addHistory);

    localStorage.setItem("cities", city);
};

function renderHistory() {
    console.log(localStorage.getItem("cities"));
}

function init() {
    renderHistory();
}

init();

// function addTwoNumbers(numOne, numTwo){

//     console.log(numOne + numTwo)
// }
// addTwoNumbers(10, 6);
// addTwoNumbers(5,9);