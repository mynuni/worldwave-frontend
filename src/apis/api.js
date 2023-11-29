import axios from "axios";
import {API_PATHS} from "../constants/path";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const privateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

privateApi.interceptors.request.use(
    config => {

        const accessToken = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
privateApi.interceptors.response.use(
    response => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                const newAccessToken = await requestRefreshToken();
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(error.config);
            } catch (error) {
                localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY);
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)

const requestRefreshToken = async () => {
    try {
        const response = await publicApi.post(API_PATHS.REFRESH_TOKEN);
        const {accessToken} = response.data;
        localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY, accessToken);
        return accessToken;
    } catch (error) {
        throw error;
    }

}