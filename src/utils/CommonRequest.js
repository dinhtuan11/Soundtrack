import axiosInstance from "./axios"
import instanceAdmin from "./axiosAdmin";
export function getRequest(url, params, isAdmin = false ) {
    try {
        const axios = isAdmin? instanceAdmin : axiosInstance
        return axios.get(url, {
            params
        });
    } catch (error) {
        return undefined;
    }
}
export function postRequest(url, data, isAdmin = false, config = {}){
    try {
        const axios = isAdmin? instanceAdmin : axiosInstance
        return axios.post(url, data, config);
    } catch (error) {
        return undefined;
    }
}
export function deleteRequest(url, data, isAdmin = false,){
    try {
        const axios = isAdmin? instanceAdmin : axiosInstance
        return axios.delete(url, {data});
    } catch (error) {
        return undefined;
    }
}

export function getNextPageIndex(lastPage) {
    if (lastPage) return lastPage?.current_page < lastPage?.total_page ? +lastPage?.current_page + 1 : undefined
    return undefined
}