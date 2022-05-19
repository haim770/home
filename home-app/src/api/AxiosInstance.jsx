import axios from 'axios'
    const BASE_URL = "http://localhost:80/home/home-app/api.php";

    const instance = axios.create({
      baseURL: BASE_URL,
      method: "POST",
      timeout: 1000,
    });
export default instance;

// adding private instance to send cookies with our axios requests
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});