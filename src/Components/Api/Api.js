import axios from 'axios';

const BASE_URL = 'https://restcountries.eu/rest/v2/all';

export const GetCountries = url => axios.get(BASE_URL);