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
    this.formData.append("data", type);
    axios({
      method: "post",
      url: this.url,
      data: this.formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(
      (response) => {
        console.log(typeof response.data);
        this.resultFromServer = (response.data);
        console.log(this.resultFromServer);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.resultFromServer);
    return this.resultFromServer;
  }
}
export default Api;
