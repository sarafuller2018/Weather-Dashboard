var APIKey = "3b4fe08e3d81d374d723df247f19a378";
var cityEl = document.getElementById("cityName");
var submitCityButtonEl = document.getElementById("submitCityButton");
var searchHistoryEl = document.getElementById("searchHistory");
var currentWeatherDivEl = document.getElementById("currentWeatherDiv");
var fiveDayWeatherEl = document.getElementById("5dayWeather");
var card1El = document.getElementById("card1");
var card2El = document.getElementById("card2");
var card3El = document.getElementById("card3");
var card4El = document.getElementById("card4");
var card5El = document.getElementById("card5");
var savedCitiesArray = [];

// pulls local storage if it exists, if not uses an empty array
console.log(JSON.parse(localStorage.getItem("cities")));

if (JSON.parse(localStorage.getItem("cities")) !== null) {
    savedCitiesArray = JSON.parse(localStorage.getItem("cities"));
};

// user submits a city and calls functions to complete js logic
submitCityButtonEl.addEventListener("click", function () {
    var cityTextValue = cityEl.value;
    console.log("user city input: ", cityTextValue);

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
            console.log("longitude and latitiude info: ", data)
            console.log("lat: ", data[0].lat)
            console.log("lon: ", data[0].lon)
            var Lat = data[0].lat;
            var Long = data[0].lon;
            getCurrentWeather(Lat, Long)
            get5DayWeather(Lat, Long);
        });
};

// retreives current weather for city and adds to page
function getCurrentWeather(lat, long) {

    currentWeatherDivEl.innerHTML = "";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("current weather info: ", data)

            var createHeaderCity = document.createElement("h2");
            var createCurrentDate = document.createElement("p");
            var currentTemp = document.createElement("p");
            var currentWind = document.createElement("p");
            var currentHumidity = document.createElement("p");
            var weatherIcon = data.weather[0].icon;
            var loadWeatherIcon = document.createElement("img");
            loadWeatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");

            createHeaderCity.textContent = data.name;
            createCurrentDate.textContent = dayjs().format("MM/DD/YYYY");
            createCurrentDate.classList.add("bold");
            currentTemp.textContent = "Temperature: " + data.main.temp + " °F";
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";

            currentWeatherDivEl.appendChild(loadWeatherIcon);
            currentWeatherDivEl.appendChild(createHeaderCity);
            currentWeatherDivEl.appendChild(createCurrentDate);
            currentWeatherDivEl.appendChild(currentTemp);
            currentWeatherDivEl.appendChild(currentWind);
            currentWeatherDivEl.appendChild(currentHumidity);
        });
};

// retrieves the 5-day weather for city and adds to page
function get5DayWeather(lat, long) {

    fiveDayWeatherEl.innerHTML = "";

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("five day weather info: ", data)

            var create5DayHeader = document.createElement("h2");
            create5DayHeader.textContent = "5-Day Forecast";
            fiveDayWeatherEl.appendChild(create5DayHeader);

            var forecastSection = document.createElement("div");
            forecastSection.classList.add("fiveDaySection");
            forecastSection.setAttribute("class", "fiveDayWrap");

            // iterates through 5 day forecast data and appends to page
            for (var i = 2; i < 40; i += 8) {
                console.log(i)
                var createCard = document.createElement("div");
                createCard.setAttribute("class", "paddingNoWrap")
                var Date = document.createElement("p");
                var Temp = document.createElement("p");
                var Wind = document.createElement("p");
                var Humidity = document.createElement("p");
                var weatherIcon = data.list[i].weather[0].icon;
                var loadWeatherIcon = document.createElement("img");
                loadWeatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");

                Date.textContent = dayjs(data.list[i].dt_txt).format("MM/DD/YYYY");
                Date.classList.add("bold");
                Temp.textContent = "Temperature: " + data.list[i].main.temp + " °F";
                Wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                Humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                createCard.appendChild(loadWeatherIcon);
                createCard.appendChild(Date);
                createCard.appendChild(Temp);
                createCard.appendChild(Wind);
                createCard.appendChild(Humidity);
                forecastSection.appendChild(createCard);
                fiveDayWeatherEl.appendChild(forecastSection);
            };
        });
};

// adds button with city to page
function saveCityButton(city) {
    var addHistory = document.createElement("button");
    addHistory.setAttribute("class", "w-75 m-2");
    addHistory.textContent = city;
    addHistory.addEventListener("click", function (event) {

        var city = event.target.textContent;
        getGeoCoding(city)
    });

    searchHistoryEl.appendChild(addHistory);

    savedCitiesArray.push(city);
    console.log(savedCitiesArray);
    localStorage.setItem("cities", JSON.stringify(savedCitiesArray));
};

// allows page to pull search history and add to page
function renderHistory() {
    var cityArray = JSON.parse(localStorage.getItem("cities"));
    console.log(cityArray);

    for (var i = 0; i < cityArray.length; i++) {
        console.log(cityArray[i]);
        var addHistory = document.createElement("button");
        addHistory.setAttribute("class", "w-75 m-2");
        addHistory.textContent = cityArray[i];
        addHistory.addEventListener("click", function (event) {

            var city = event.target.textContent;
            getGeoCoding(city)
        });

        searchHistoryEl.appendChild(addHistory);
    }
};

//calls search history on init of page 
function init() {
    renderHistory();
};

init();