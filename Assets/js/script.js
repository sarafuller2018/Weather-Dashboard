var APIKey= "3b4fe08e3d81d374d723df247f19a378";
var city = "";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);