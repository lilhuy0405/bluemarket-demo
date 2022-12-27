import axios from 'axios';
import queryString from 'query-string';

const API_URL = "http://13.229.201.66:3002/api";


//TODO: handle logic for intercept jwt token and refresh token when it expired
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  // @ts-ignore
  paramsSerializer: (params: any) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {

  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  }
  return response;
}, (error) => {
  throw error;
// Handle errors
});
export default axiosClient;
