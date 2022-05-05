import axios from "axios";
import { useState } from "react";

class Api {
  //class to get the results from the server and send to it
  constructor() {
    this.url = "http://localhost:80/home/home-app/api.php";//url of server
    this.formData = new FormData();//formdata obj to get data for server side
    this.resultFromServer = "";//result we save here from server
  }
  addParametersToFormData(params) {
    //bring the param object we got and iterate through him to insert it to formData object we can send
    for (const [key, value] of Object.entries(params)) {
      this.formData.append(key, value);
    }
  }
  postToGetData(params) {
    //post to php and the type of function will be determined by the type param returns an object
    // this.addParametersToFormData(params);
    this.addParametersToFormData(params);
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
    this.cleanFormData();
    return this.resultFromServer;
  }
  cleanFormData(){
    //func to clean the form data after each use
    this.formData=new FormData();
  }
  sendDataFromJsToPhp(parametersArray) {
    //sends the array with the func we need to call at the php, func recieves jason obj with jeys and value and 
    //returns the respond from server
    this.addParametersToFormData(parametersArray); //type to create new ad is insertAd
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
    //this is a work around that will get us array of keys and one of values and will merge them
    //to get aray that represent the data we got
    this.cleanFormData();
    return this.resultFromServer;
  }
}
export default Api;
