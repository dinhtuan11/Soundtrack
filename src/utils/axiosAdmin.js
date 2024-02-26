import axios from 'axios';
export let store;
export const injectStoreAdmin = _store => {
    store = _store
}
const instanceAdmin = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
        "Content-type": "application/json",
    },
    timeout:10000 // 10s
});
instanceAdmin.interceptors.request.use(function (config) {
    const token = store.getState()?.auth.adminToken;
    if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
instanceAdmin.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default instanceAdmin;
