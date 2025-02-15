const makeIconURL = (iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png`;
const API_KEY = '04814527754eac46c625f313e97427a3';

const getFormattedWeatherData = async (city, units = 'metric') => {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(link).then(res => res.json()).then(data => data);

    const { weather, main: { temp, feels_like, temp_min, temp_max, pressure, humidity }, wind: {speed}, sys: {country}, name } = data;
    const { description, icon } = weather[0];

    return {
        description, ImageUrl: makeIconURL(icon), temp, feels_like, temp_min, temp_max, pressure, humidity, speed, country, name
    }
}

export { getFormattedWeatherData };