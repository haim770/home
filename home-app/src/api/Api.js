import axios from "axios";
import { useState } from "react";

class Api {
  //class to get the results from the server and send to it
  constructor() {
    this.url = "http://localhost:80/home/home-app/api.php";
    this.formData = new FormData();
    this.resultFromServer = "";
    this.formData = new FormData();
  }
  postToGetData(type) {
    this.formData.append("data", "ads");
    axios({
      method: "post",
      url: this.url,
      data: this.formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(
      (response) => {
        console.log(response.data);
        this.resultFromServer = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.resultFromServer;
  }
}
export default Api;
