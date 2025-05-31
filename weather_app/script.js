// Apni API key yahan paste karein
const API_KEY = "d8df0a8fb6320f828651a5a416454e8e"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// HTML elements ko select karein
const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather-display");
const errorMsg = document.querySelector(".error-msg");

// Weather data fetch karne ka asynchronous function
async function checkWeather(city) {
    try {
        // API call
        const response = await fetch(API_URL + city + `&appid=${API_KEY}`);

        // Agar response successful nahi hai (e.g., 404 City not found)
        if (response.status == 404) {
            errorMsg.style.display = "block"; // Error message dikhayein
            weatherDisplay.style.display = "none"; // Weather display hide karein
            return; // Function se bahar nikal jayein
        }

        // Response ko JSON format mein parse karein
        const data = await response.json();

        // Data ko HTML elements mein update karein
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;

        // Weather condition ke hisab se icon update karein
        // OpenWeatherMap weather conditions aur unke corresponding icons
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        } else {
            // Default icon agar koi match na kare
            weatherIcon.src = "images/default.png"; // Aapko yeh image provide karni hogi
        }
        
        weatherIcon.style.display = "block"; // Icon dikhayein
        weatherDisplay.style.display = "block"; // Weather display ko visible karein
        errorMsg.style.display = "none"; // Error message hide karein

    } catch (error) {
        // Agar API call mein koi aur error aaye (e.g., network issue)
        console.error("Error fetching weather data:", error);
        errorMsg.innerHTML = "Could not fetch weather data. Please check your internet connection or try again.";
        errorMsg.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

// Search button par click event listener
searchBtn.addEventListener("click", () => {
    // Input field se city ka naam lein
    // .trim() extra spaces ko remove karta hai
    if (searchBox.value.trim() !== "") { // Check karein ki input empty na ho
        checkWeather(searchBox.value);
    } else {
        alert("Please enter a city name!"); // User ko alert karein agar input empty hai
    }
});

// Enter key press event listener (optional, but good for user experience)
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        if (searchBox.value.trim() !== "") {
            searchBtn.click(); // Programmatically click the search button
        } else {
            alert("Please enter a city name!");
        }
    }
});

// Optional: Jab page load ho to default city ka weather dikhayein
// checkWeather("New York"); // Aap apni pasand ki default city de sakte hain