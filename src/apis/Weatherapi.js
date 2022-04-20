import axios from 'axios';

const WeatherBaseUrl = "https://koenvangeel.pythonanywhere.com/api/weather";

class WeatherApi  {

    getWeather(city) {
        return axios.get(WeatherBaseUrl + "?type=forecast&city=" + city);
    }

    getWeatherSlow(city) {
        return axios.get(WeatherBaseUrl + "?type=slow&city=" + city);
    }

    getWeatherError(city) {
        return axios.get(WeatherBaseUrl + "?type=error&city=" + city);
    }

}

export default WeatherApi;
