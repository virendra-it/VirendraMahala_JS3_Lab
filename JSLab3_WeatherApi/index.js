//have event listener for search box
//click enter
//get results for city entered fetch api
//get date from browser
//add results for specified sections


const api = {
    key: "18473984871ef51c7de3d3d2572cbfb4",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getresults(searchBox.value);

    }

}
//https://api.openweathermap.org/data/2.5/weather?q=shimoga&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2
function getresults(data) {
    fetch(`${api.base}weather?q=${data}&units=metric&appid=${api.key}`).then(weather => {
        return weather.json()
    }).then(response => {
        displayResults(response)
    })
}

function displayResults(weatherInfo) {
    console.log(weatherInfo);
    let city = document.querySelector('.location .city');
    city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;

    let now = new Date();
    let dateInfo = document.querySelector('.location .date');
    dateInfo.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherInfo.main.temp)} <span> &#8451;</span>`;

    let weather = document.querySelector('.current .weather');
    weather.innerText = weatherInfo.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weatherInfo.main.temp_min)}  <span> &#8451;</span> / ${Math.round(weatherInfo.main.temp_max)}  <span> &#8451;</span> `

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednusday", "Thursday", "Friday", "Saturday"];
    let month = months[d.getMonth()]
    let day = days[d.getDay()];
    let date = d.getDate();
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}