const apiKey = '29dee38ef1634f6bf6f3334c823ceac6';
const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const resultDiv = document.getElementById('result');
const cityNameSpan = document.getElementById('city-name');
const temperatureSpan = document.getElementById('temperature');
const weatherSpan = document.getElementById('weather');
const pokemonSpan = document.getElementById('pokemon');
const pokemonImage = document.getElementById('pokemon-image');

searchButton.addEventListener('click', async () => {
    const city = cityInput.value;
    if (city === '') return alert('Please enter a city name');
    
    try {
        const weatherData = await getWeather(city);
        const pokemonType = determinePokemonType(weatherData.main.temp, weatherData.weather[0].main);
        const pokemonData = await getPokemonByType(pokemonType);
        
        displayResult(city, weatherData.main.temp, weatherData.weather[0].main, pokemonData, pokemonType);
    } catch (error) {
        alert('Failed to fetch data. Please try again later.');
        console.error(error);
    }
});

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    return data;
}

function determinePokemonType(temp, weather) {
    console.log(this.temp)
    if (weather.toLowerCase() === 'rain') return 'electric';
    if (temp < 5) return 'ice';
    if (temp >= 5 && temp < 10) return 'water';
    if (temp >= 12 && temp < 15) return 'grass';
    if (temp >= 15 && temp < 21) return 'ground';
    if (temp >= 23 && temp < 27) return 'bug';
    if (temp >= 27 && temp <= 33) return 'rock';
    if (temp > 33) return 'fire';
    return 'normal'    
}

async function getPokemonByType(type) {
    determinePokemonType;
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const pokemons = data.pokemon;
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)].pokemon;
    const pokemonDetails = await fetch(randomPokemon.url).then(res => res.json());
    return { name: pokemonDetails.name, image: pokemonDetails.sprites.front_default }
}

function displayResult(city, temp, weather, pokemon, type) {
    cityNameSpan.textContent = city;
    temperatureSpan.textContent = temp.toFixed(1);
    weatherSpan.textContent = weather;
    pokemonSpan.textContent = pokemon.name;
    pokemonImage.src = pokemon.image;

    resultDiv.classList.remove('hidden');
}