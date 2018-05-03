
var temperature = document.getElementById("temperature");
var weather = document.getElementById("weather");
var btn = document.getElementById("btn");

var lat = "";
var lon = "";

document.addEventListener("onload",getLocation());

//setTimeout(weatherApi,1000);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else {
        temperature.innerHTML = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        weatherApi();
     }
}


function weatherApi(){

  var longitude = lon;
  var latitude = lat;
  
  //ajax request
  let theUrl = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude + "";
  
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.status == 200) {
      let myApi = JSON.parse(this.responseText);
      
      //display weather image
       document.querySelector('img').setAttribute("src", myApi.weather[0].icon);
      
      //display location
      weather.innerHTML = myApi.sys.country + "<br>" 
      + myApi.name;

      //display temperature
        temperature.innerHTML = myApi.main.temp ;
        btn.innerHTML = '<button class="btn btn-secondary" id="degresCel" onclick="toggle(temperature.innerHTML)">°C</button>';      
    }
  }
  xhr.open("GET", theUrl, true);
  
  xhr.send();

}
  
  function toggle(api) {
    let degres = document.getElementById("degresCel");
    let innerTemp = document.getElementById("temperature");
    
    if (degres.innerHTML == "°C") {
        degres.innerHTML = "°F";
        innerTemp.innerHTML = api * 1.8 + 32;
    } else {
        degres.innerHTML = "°C";
        innerTemp.innerHTML = (api - 32) / 1.8;
    }

  }


