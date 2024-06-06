import axios from 'axios';
// import jwt from 'jsonwebtoken';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});


export function registerClient(body,endpoint) {
    return api.post(`/${endpoint}/register`, body)
}
export function registerUser(body) {
    return api.post('/client/register', body)
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

export function loginUserApi(email,password,endpoint) {
    console.log(endpoint)
    return api.post(`/${endpoint}/login`, {email : email, password : password})
}
