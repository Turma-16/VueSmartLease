import axios from "axios"; //tem que fazer o npm install axios

const axiosInstance = axios.create({

    baseURL: 'https://localhost:7054/',  // esse é o host que a aplicação rodou, caso não for essa porta tem que mudar
    proxy: false

    }
)
export default axiosInstance;
