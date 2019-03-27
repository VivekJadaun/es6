import {Location} from './Location.js';

document.addEventListener('DOMContentLoaded', function () {
    let showWeatherBtn = document.querySelector('[data-id="show-weather"]');

    showWeatherBtn.addEventListener('click', function (event) {
        event.preventDefault();
        let city = document.querySelector('[data-id="location"]').value;
        let forecastBoard = '[data-behaviour="weather-output"]';
        
        let location = new Location(city, forecastBoard);
        location.init();
    });
});