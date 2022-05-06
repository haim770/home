import axios from "axios";
import { useState } from "react";

export default function TestAxios(params) {
  const [dataServer, setdataServer] = useState(0);
  const url = "http://localhost:80/home/home-app/api.php";
axios.post(
  url,
  JSON.stringify({
    data_type: params.data_type,
    params: params.params,
  })).then(function (response) {
        if (response.data.error) {
          setdataServer(response.data.message);
        } else {
          setdataServer(response.data);
        }
      });

  return JSON.stringify(dataServer);
}
