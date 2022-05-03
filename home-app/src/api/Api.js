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
        this.resultFromServer = response.data;
        console.log(response.data);
        console.log(this.resultFromServer);
      },
      (error) => {
        console.log(error);
      }
    );
    //this is a work around that will get us array of keys and one of values and will merge them 
    //to get aray that represent the data we got
    return this.resultFromServer;
  }
   makeArrayOfObj(obj){
     if(!obj){
       return;
     }
    const keyArray=Object.keys(obj);
    const valueObj=Object.values(obj);
    const arrayKeyValue=[];

  }
}
export default Api;
