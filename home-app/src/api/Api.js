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
    //post to php and the type of function will be determined by the type param returns an object
    this.formData.append("data", type);
    axios({
      method: "post",
      url: this.url,
      data: this.formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    }).then(
      (response) => {
        this.resultFromServer = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    //this is a work around that will get us array of keys and one of values and will merge them
    //to get aray that represent the data we got
    return this.resultFromServer;
  }
}
export default Api;
