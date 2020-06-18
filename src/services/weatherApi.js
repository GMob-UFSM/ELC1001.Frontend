import axios from 'axios';

const WEATHER_API_TOKEN = 'INSIRA O TOKEN AQUI';

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

const weatherApi = {
    api: api,
    token: WEATHER_API_TOKEN
};

export default weatherApi;