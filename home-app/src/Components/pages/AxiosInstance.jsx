import axios from 'axios'

    /*
          responseType: "json",
      responseEncoding: "utf8",
      by defult */
    const url = "http://localhost:80/home/home-app/api.php";
    const instance = axios.create({
      baseURL: url,
      method: "POST",
      timeout: 1000,
    });
export default instance;