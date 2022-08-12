import axios from 'axios';

export const axiosSSR = axios.create({
    baseURL: 'http://170.187.147.23:8000',
    headers: { 
        'Content-type': 'application/json' 
    },
});

axiosSSR.interceptors.request.use(config => {
        if (!config.params) config.params = {}
        if(localStorage.getItem("token")) {
            config.headers = {
                'Content-type': 'application/json',
                "Authorization": `Token ${window.localStorage.getItem("token")}`
            }
        }
        console.log(config)
        return config; 
    }, error => Promise.reject(error) 
)

axiosSSR.interceptors.response.use(
    (res ) => ({
      error: null,
      data: res.data,
    }),
    (err) => ({
      error: {
        statusCode: err.response?.status || 0,
        message: err.message || 'An unexpected error has occurred',
      },
      data: null,
    })
  )