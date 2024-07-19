// /src/js/api.mjs

const baseURL = import.meta.env.VITE_FOOTBALL_SERVER_URL;
const rapidapi_key = import.meta.env.VITE_RAPIDAPI_KEY;
const rapidapi_host = import.meta.env.VITE_RAPIDAPI_HOST;

export default class FootballAPI {
    constructor() {
        this.baseURL = baseURL;
        this.rapidapi_key = rapidapi_key;
        this.rapidapi_host = rapidapi_host;

        this.myHeaders = new Headers();
        this.myHeaders.append("x-rapidapi-key", this.rapidapi_key);
        this.myHeaders.append("x-rapidapi-host", this.rapidapi_host);
    }

    async convertToJson(res) {
        console.log("res", res);
        const jsonResponse = await res.json();
        if (res.ok) {
            return jsonResponse;
        } else {
            throw { name: 'servicesError', message: jsonResponse };
        }
    }

    async fetchFootballData(endpoint) {
        const url = `${this.baseURL}/${endpoint}`;

        const requestOptions = {
            method: 'GET',
            headers: this.myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(url, requestOptions);
            const result = await this.convertToJson(response);
            return result;
        } catch (error) {
            console.error('Error fetching football data:', error);
            throw error;
        }
    }
}
