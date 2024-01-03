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
console.log(JSON.parse(localStorage.getItem("cities")));

if (JSON.parse(localStorage.getItem("cities")) !== null) {
    console.log("there is an array");
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

//retreives current weather for city and adds to page
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

//retrieves the 5-day weather for city and adds to page
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
            var forecastSection = document.createElement("div")
            forecastSection.classList.add("fiveDaySection")
            
          
            for(var i = 2; i < 40; i+=8){
                console.log(i)
                var createCard1 = document.createElement("div");
                var Date1 = document.createElement("p");
                var Temp1 = document.createElement("p");
                var Wind1 = document.createElement("p");
                var Humidity1 = document.createElement("p");
                var weatherIcon1 = data.list[i].weather[0].icon;
                var loadWeatherIcon1 = document.createElement("img");
                loadWeatherIcon1.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon1 + ".png");
    
                Date1.textContent = data.list[i].dt_txt;
                Date1.classList.add("bold");
                Temp1.textContent = "Temperature: " + data.list[i].main.temp + " °F";
                Wind1.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                Humidity1.textContent = "Humidity: " + data.list[i].main.humidity + "%";
    
                createCard1.appendChild(loadWeatherIcon1)
                createCard1.appendChild(Date1)
                createCard1.appendChild(Temp1)
                createCard1.appendChild(Wind1)
                createCard1.appendChild(Humidity1)
                forecastSection.appendChild(createCard1);
                fiveDayWeatherEl.appendChild(forecastSection)
            }
            // Day 1 weather info
            // var createCard1 = document.createElement("div");
            // var Date1 = document.createElement("p");
            // var Temp1 = document.createElement("p");
            // var Wind1 = document.createElement("p");
            // var Humidity1 = document.createElement("p");
            // var weatherIcon1 = data.list[2].weather[0].icon;
            // var loadWeatherIcon1 = document.createElement("img");
            // loadWeatherIcon1.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon1 + ".png");

            // Date1.textContent = data.list[2].dt_txt;
            // Date1.classList.add("bold");
            // Temp1.textContent = "Temperature: " + data.list[2].main.temp + " °F";
            // Wind1.textContent = "Wind: " + data.list[2].wind.speed + " MPH";
            // Humidity1.textContent = "Humidity: " + data.list[2].main.humidity + "%";

            // createCard1.appendChild(loadWeatherIcon1)
            // createCard1.appendChild(Date1)
            // createCard1.appendChild(Temp1)
            // createCard1.appendChild(Wind1)
            // createCard1.appendChild(Humidity1)
            // fiveDayWeatherEl.appendChild(createCard1);

            // fiveDayWeatherEl.children[1].appendChild(loadWeatherIcon1);
            // fiveDayWeatherEl.children[1].appendChild(Date1);
            // fiveDayWeatherEl.children[1].appendChild(Temp1);
            // fiveDayWeatherEl.children[1].appendChild(Wind1);
            // fiveDayWeatherEl.children[1].appendChild(Humidity1);

            // Day 2 weather info
            // var createCard2 = document.createElement("div");
            // var Date2 = document.createElement("p");
            // var Temp2 = document.createElement("p");
            // var Wind2 = document.createElement("p");
            // var Humidity2 = document.createElement("p");
            // var weatherIcon2 = data.list[10].weather[0].icon;
            // var loadWeatherIcon2 = document.createElement("img");
            // loadWeatherIcon2.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon2 + ".png");

            // Date2.textContent = data.list[10].dt_txt;
            // Date2.classList.add("bold");
            // Temp2.textContent = "Temperature: " + data.list[10].main.temp + " °F";
            // Wind2.textContent = "Wind: " + data.list[10].wind.speed + " MPH";
            // Humidity2.textContent = "Humidity: " + data.list[10].main.humidity + "%";

            // fiveDayWeatherEl.appendChild(createCard2);
            // fiveDayWeatherEl.children[2].appendChild(loadWeatherIcon2);
            // fiveDayWeatherEl.children[2].appendChild(Date2);
            // fiveDayWeatherEl.children[2].appendChild(Temp2);
            // fiveDayWeatherEl.children[2].appendChild(Wind2);
            // fiveDayWeatherEl.children[2].appendChild(Humidity2);

            // Day 3 weather info
            // var createCard3 = document.createElement("div");
            // var Date3 = document.createElement("p");
            // var Temp3 = document.createElement("p");
            // var Wind3 = document.createElement("p");
            // var Humidity3 = document.createElement("p");
            // var weatherIcon3 = data.list[18].weather[0].icon;
            // var loadWeatherIcon3 = document.createElement("img");
            // loadWeatherIcon3.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon3 + ".png");

            // Date3.textContent = data.list[18].dt_txt;
            // Date3.classList.add("bold");
            // Temp3.textContent = "Temperature: " + data.list[18].main.temp + " °F";
            // Wind3.textContent = "Wind: " + data.list[18].wind.speed + " MPH";
            // Humidity3.textContent = "Humidity: " + data.list[18].main.humidity + "%";

            // fiveDayWeatherEl.appendChild(createCard3);
            // fiveDayWeatherEl.children[3].appendChild(loadWeatherIcon3);
            // fiveDayWeatherEl.children[3].appendChild(Date3);
            // fiveDayWeatherEl.children[3].appendChild(Temp3);
            // fiveDayWeatherEl.children[3].appendChild(Wind3);
            // fiveDayWeatherEl.children[3].appendChild(Humidity3);

            // Day 4 weather info
            // var createCard4 = document.createElement("div");
            // var Date4 = document.createElement("p");
            // var Temp4 = document.createElement("p");
            // var Wind4 = document.createElement("p");
            // var Humidity4 = document.createElement("p");
            // var weatherIcon4 = data.list[26].weather[0].icon;
            // var loadWeatherIcon4 = document.createElement("img");
            // loadWeatherIcon4.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon4 + ".png");

            // Date4.textContent = data.list[26].dt_txt;
            // Date4.classList.add("bold");
            // Temp4.textContent = "Temperature: " + data.list[26].main.temp + " °F";
            // Wind4.textContent = "Wind: " + data.list[26].wind.speed + " MPH";
            // Humidity4.textContent = "Humidity: " + data.list[26].main.humidity + "%";

            // fiveDayWeatherEl.appendChild(createCard4);
            // fiveDayWeatherEl.children[4].appendChild(loadWeatherIcon4);
            // fiveDayWeatherEl.children[4].appendChild(Date4);
            // fiveDayWeatherEl.children[4].appendChild(Temp4);
            // fiveDayWeatherEl.children[4].appendChild(Wind4);
            // fiveDayWeatherEl.children[4].appendChild(Humidity4);

            // Day 5 weather info
            // var createCard5 = document.createElement("div");
            // var Date5 = document.createElement("p");
            // var Temp5 = document.createElement("p");
            // var Wind5 = document.createElement("p");
            // var Humidity5 = document.createElement("p");
            // var weatherIcon5 = data.list[34].weather[0].icon;
            // var loadWeatherIcon5 = document.createElement("img");
            // loadWeatherIcon5.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon5 + ".png");

            // Date5.textContent = data.list[34].dt_txt;
            // Date5.classList.add("bold");
            // Temp5.textContent = "Temperature: " + data.list[34].main.temp + " °F";
            // Wind5.textContent = "Wind: " + data.list[34].wind.speed + " MPH";
            // Humidity5.textContent = "Humidity: " + data.list[34].main.humidity + "%";

            // fiveDayWeatherEl.appendChild(createCard5);
            // fiveDayWeatherEl.children[5].appendChild(loadWeatherIcon5);
            // fiveDayWeatherEl.children[5].appendChild(Date5);
            // fiveDayWeatherEl.children[5].appendChild(Temp5);
            // fiveDayWeatherEl.children[5].appendChild(Wind5);
            // fiveDayWeatherEl.children[5].appendChild(Humidity5);
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

    savedCitiesArray.push(city);
    console.log(savedCitiesArray);
    localStorage.setItem("cities", JSON.stringify(savedCitiesArray));
};

function renderHistory() {
   var cityArray = JSON.parse(localStorage.getItem("cities"));
   console.log(cityArray);

   for (var i=0; i<cityArray.length; i++) {
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

}

function init() {
    renderHistory();
}

init();

// function addTwoNumbers(numOne, numTwo){

//console.log(numOne + numTwo)
// }
// addTwoNumbers(10, 6);
// addTwoNumbers(5,9);

//local storage
//styling
//consolidate