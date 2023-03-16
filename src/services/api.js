import axios from 'axios';
import Auth from '@aws-amplify/auth';
import { baseURL } from '../config/api';


const api = axios.create({
    baseURL
})

export async function authInterceptor(config) {
    try {
        const currentSession = await Auth.currentSession();
        const token = currentSession?.accessToken?.jwtToken;
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    } catch (e) {

        return config;
    }
}

api.interceptors.request.use(authInterceptor);

export default api;