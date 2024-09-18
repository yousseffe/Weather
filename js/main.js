async function GetWeather(location){
	let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=aa29d667325342d39d0134603240102&q=${location}&days=3&aqi=no&alerts=no`)
	if (data.ok) {
        data = await data.json();
        DisplayWeather(data)
     }
}
GetWeather("London")

const x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
function DisplayWeather(data){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const compass = {
        'N': 'North', 'S': 'South', 'E': 'East', 'W': 'West', 'NE': 'NorthEast', 'SE': 'SouthEast', 'SW': 'SouthWest', 'NW': 'NorthWest'}
    let today = new Date(`${data.location.localtime}`)
    let tomorrow = new Date(`${data.forecast.forecastday[1].date}`)
    let afterTom = new Date(`${data.forecast.forecastday[2].date}`)
    console.log()
    console.log()
    console.log()
    console.log()
    
    $("#data").html(`
    <div class="row g-0 pb-5">
    <div class="item col-md-4 second-bg-clr rounded">
        <div class="d-flex align-items-center justify-content-between p-3 main-bg-clr text-light rounded fs-5 header ">
            <p class="my-auto">${weekday[today.getDay()]}</p>
            <span class="my-auto">
                <span>${today.getDate()}</span>
                <span>${month[today.getMonth()]}</span>
            </span>
        </div>
        <div class="item-content text-light text-start px-3 py-4">
            <p class="fs-4">${data.location.name}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="main-fs fw-bolder" >
                    <span >${data.current.temp_c}<sup>o</sup>C</span>
                    
                </span>
                <img src=${data.current.condition.icon} alt="" class="img-icon">
            </div>
            <p class="main-clr fs-5">${data.current.condition.text}</p>
        </div>
        <div class="item-footer d-flex text-light p-3">
            <div class="d-flex me-3 text-secondary">
            <i class="fa-solid fa-umbrella mx-1 fa-2x pe-1 text-secondary"></i>
                <p class="fs-5">${data.current.humidity}%</p>
            </div>
            <div class="d-flex me-3 text-secondary">
                <i class="fa-solid fa-wind mx-1 fa-2x pe-1 text-secondary"></i>
                <span class="fs-5">${data.current.wind_kph}km/h</span>
            </div>
            <div class="d-flex me-3 text-secondary">
                <i class="fa-regular fa-compass mx-1  fa-2x pe-1 "></i>
                <span class="fs-5">${compass[data.current.wind_dir]}</span>
            </div>
        </div>
    </div>
    <div class="item col-md-4 m-0 tri-bg-clr">
        <div class="py-3 text-center second-bg-clr text-light fs-5 header">
            <p class="my-auto">${weekday[tomorrow.getDay()]}</p>
        </div>
        <div  class="item-content text-start text-light  text-center pt-5">
            <img src=${data.forecast.forecastday[1].day.condition.icon} alt="" class="img-icon-2" >
            <h3 class="pt-3 fw-bolder">
                <span >${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</span>
                
            </h3>
            <p class="fs-5 text-light">
                <span >${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</span>
                
            </p>
            <p class="main-clr fs-5" >${data.forecast.forecastday[1].day.condition.text}</p>
        </div>
    </div>
    <div class="item col-md-4 m-0 second-bg-clr rounded">
        <div class="py-3 text-center main-bg-clr text-light rounded fs-5 header" >
            <p class="my-auto" >${weekday[afterTom.getDay()]}</p>
        </div>
        <div id="tommrow" class="item-content text-start text-light  text-center pt-5">
            <img src=${data.forecast.forecastday[2].day.condition.icon} class="img-icon-2" >
            <h3 class="pt-3 fw-bolder">
                <span >${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</span>
                
            </h3>
            <p class="fs-5">
                <span>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</span>
                
            </p>
            <p class="main-clr fs-5">${data.forecast.forecastday[2].day.condition.text}</p>
        </div>
    </div>
</div>
    
    `);
}
