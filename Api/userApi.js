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
export function registerUser(body) {
    return api.post('/client/register/user', body)
}
export function verifyEmail(id,token) {
    return api.get(`/client/verify/${id}/${token}`)
}
export function forgetPassword (email) {
    return api.post('/client/forgot-password',{email : email})
}
export function resetPassword (token, body) {
    return api.post(`/client/reset-password/${token}`, body)
}