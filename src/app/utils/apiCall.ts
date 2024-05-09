import axios from "axios";
import Cookies from "js-cookie";

const NEXT_PUBLIC_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const axiosRequest = axios.create();

const apiCall = async(
    url: string,
    method: string,
    data: object,
    headers: object,
) => {

    let access_token = Cookies.get('Authorization');
    try{
        const response = await axiosRequest({
            url: `${NEXT_PUBLIC_BACKEND_API_URL}${url}`,
            method,
            data,
            headers:{
                ...headers,
                'Authorization': `${access_token}`
            }
        })
        return response.data;
    }catch(error){
        throw error;
    }
}

const refresh_token = async() => {
    const refresh_token = Cookies.get('refresh_token');
    try{
        const response = await apiCall(`/refresh_token`, 'POST', { refresh_token }, {})
        Cookies.set('Authorization', `Bearer ${response.access_token}`)
        Cookies.set('refresh_token', `${response.refresh_token}`)
    }catch(error){
        Cookies.remove('Authorization');
        Cookies.remove('refresh_token');
        window.location.href = "/signin"
    }

}

axiosRequest.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if(error.response?.status == 401){
        await refresh_token();

        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = Cookies.get('Authorization');
        return axios(originalRequest);

    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default apiCall