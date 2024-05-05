import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});


export function registerClient(body) {
    return api.post('/client/register', body)
}