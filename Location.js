const APPID = '9b1b44b270ab61e7b6f3fe7d8e9cc0ef';

export class Location {
    constructor(name, container){
        this.name = name;
        this.path = `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${APPID}&units=metric`;
        this.$container = document.querySelector(container);
        this.weatherinfo = null;
    }

    init() {
        let resolve = (response) => this.displayWeather(response);
        let reject = (error) => { console.log(error); };
        
        let request = new XMLHttpRequest();
        
        let promise = new Promise((resolve, reject) => {
            request.onreadystatechange = () => {
                if (request.readyState == 4 && request.status == 200) {
                    let response = JSON.parse(request.responseText);
                    resolve(response);
                }
            };
            request.open("GET", this.path);
            request.send();
        });

        promise.then(resolve).catch(reject);
        return this;
    }

    displayWeather(weatherInfo) {
        let $forecastBoard = this.prepareForecast(weatherInfo);
        this.$container.innerHTML = '';
        this.$container.append($forecastBoard);
        debugger
    }

    prepareForecast(weatherInfo) {
        let $forecastBoard = document.createElement('pre');
        let weatherOutput = `
            Outlook: ${weatherInfo.weather[0].main}
            
            Feels Like: ${Math.trunc(weatherInfo.main.temp)}°C

            Humidity: ${weatherInfo.main.humidity}%
            
            Pressure: ${weatherInfo.main.pressure}hPa
            `;
        
        $forecastBoard.innerHTML = weatherOutput;
        return $forecastBoard;
    }
}
