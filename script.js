document.addEventListener('DOMContentLoaded', ()=>{
    
    const location = document.getElementById("location");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const typeOfWeather = document.getElementById("type-of-weather");
    const weatherIcon=document.getElementById("weather-icon");
    const introText= document.querySelector(".intro-text");

    const apiKey = "a73b3877ea464eb392f65140240907";

    function getWeather(city){
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
        .then((result)=> result.json())
        .then(data => {
            console.log(data);

            location.textContent = `Weather in ${data.location.name}`;
            temperature.textContent = `${data.current.temp_c}°C`;
            humidity.textContent = `Humidity: ${data.current.humidity}%`;
            windSpeed.textContent = `Wind speed: ${data.current.wind_kph} km/h`;
            typeOfWeather.textContent = data.current.condition.text;
            weatherIcon.src = `https:${data.current.condition.icon}`;
            weatherIcon.classList.remove('hidden');

            introText.classList.add('hidden');
            
        });
    }

    function displayWeather(){
        const searchButton = document.querySelector(".search-city-btn");
        
        searchButton.addEventListener('click',()=>{
            const city = document.querySelector(".search-city-input").value;
            if (city) {
                getWeather(city);
            } else {
                alert('Please enter a city name.');
            }
        });

        document.addEventListener('keydown', event =>{
            if(event.key === 'Enter'){
                const city = document.querySelector(".search-city-input").value;
                getWeather(city);
            }
            
        })
    }

    displayWeather();
});