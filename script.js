// Defining the API key and assigned city
const apiKey = "648684a36ad3efe73c8b76c880e40142";
const assigned_City = "DERBY, GB";

// When the window loads, getting the weather for the assigned city
window.addEventListener('load', () => {
    getWeather(assigned_City);
});

// When we click search, get the weather for the specified city
function searchWeather() {
    const input = document.querySelector('input[type="text"]');
    const city = input.value;
    getWeather(city);
}

// Getting the weather data from the OpenWeatherMap API for the specified city
function getWeather(city) {
    // Making a request to the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Extracting the weather data from the response
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const timezone = data.timezone;
            const city = data.name;
            const max_temp = data.main.temp_max;
            const min_temp = data.main.temp_min;
            const main = data.weather[0].main;
            const icon = data.weather[0].icon;
            const country = data.sys.country;
            const windspeed = data.wind.speed;
            // const rainfall = data.daily[0].pop;

            //Extracting hour, minute and second from timezone
            utc_time = new Date();
            console.log(utc_time);
            const time = new Date(utc_time.getTime() + timezone * 1000);
            const hours = time.getUTCHours().toString().padStart(2, '0');
            const minutes = time.getUTCMinutes().toString().padStart(2, '0');
            const seconds = time.getUTCSeconds().toString().padStart(2, '0');
            
            const utc_date = new Date(data.dt * 1000);
            const date = utc_date.toLocaleDateString();
            const day = utc_date.toLocaleDateString('en-GB', { weekday: 'short' });
            
            // Set the URL for the weather icon based on the time of day and weather condition
            let iconUrl
            if (hours >= 6 && hours <= 18) {
                if (main == 'Clouds'){
                    iconUrl = `day_icons/${description}.svg`;
                }
                else{
                    iconUrl = `day_icons/${main}.svg`;
                }
              } else {
                if (icon == '50d'){
                    iconUrl = `night_icons/haze.svg`;
                }
                else if(main == 'Clouds'){
                    iconUrl = `night_icons/${description}.svg`
                    console.log(main)
                }
                else{
                    iconUrl = `night_icons/${main}.svg`;
                }
               }

            // Updating the DOM with the weather data
            const weatherIcon = document.querySelector('.weather img');
            const temperatureElem = document.querySelector('.temperature');
            const dateElem = document.querySelector('.date');
            const descriptionElem = document.querySelector('.description');
            const humidityElem = document.querySelector('.humidity');
            const timeElem = document.querySelector('.time');
            const cityElem = document.querySelector('.city');
            const max_tempElem = document.querySelector('.max_temp');
            const min_tempElem = document.querySelector('.min_temp');
            const countryElem = document.querySelector('.country');
            const windspeedElem = document.querySelector('.windspeed')
            // const rainfallElem = document.querySelector('.rainfall')
            
            weatherIcon.src = iconUrl;
            cityElem.innerHTML = `${city}`;
            timeElem.innerHTML = `${hours} : ${minutes} : ${seconds}`;
            temperatureElem.innerHTML = `${temperature}°C`;
            descriptionElem.innerHTML = description;
            humidityElem.innerHTML = `humidity: ${humidity}`;
            max_tempElem.innerHTML = `| H: ${max_temp}°C |`;
            countryElem.innerHTML = `Country :  ${country} `;
            min_tempElem.innerHTML = `| L: ${min_temp}°C |`;
            dateElem.innerHTML = `Date: ${date} - ${day}`
            windspeedElem.innerHTML = `Windspeed: ${windspeed}`;
            // rainfallElem.innerHTML = rainfall;
            console.log(data); // Logging the weather data to the console for debugging
        })
        .catch(error => {
            // Handle errors by showing an alert to the user
            console.log(error);
            alert('Error fetching weather data');
        });
}
