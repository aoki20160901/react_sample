import axios from 'axios';

if (process.env.NODE_ENV !== "development") {
  const setInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('token');
        accessToken && (config.headers.common['Authorization'] = `Bearer ${accessToken}`);
        return config
      },
      (error) => {
        const { response } = error;
        // Do something with request error
        return Promise.reject(response)
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response } = error;
        // refresh token
        // if (response && response.status === 401) {
        // }
        // check if config errorHandler is on
        return Promise.reject(response)
      }
    );
  }

  const setDefaultConfig = () => {
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_URI;
    axios.defaults.headers["content-type"] = "application/json";
    axios.defaults.withCredentials = false;
  };
  setDefaultConfig();
  setInterceptors();
}