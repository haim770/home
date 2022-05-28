import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ImageComponent from "./ImageComponent.js";
const AdImages = (props) => {
  const renderComp = () => {
    let code = [];
    if (props.numPicToDisplay === 1) {
      if (props.images[0]) {
        code.push(
          <ImageComponent
            key={uuidv4()}
            src={props.images[0].picture_url}
            alt={props.images[0].alt}
          />
        );
      } else {
        <div>no pics</div>;
      }
    } else {
      for (let index = 0; index < props.images.length; index++) {
        //we get array of all the  images as props
        //we make display as checkbox
        code.push(
          <ImageComponent
            key={uuidv4()}
            src={props.images[index].picture_url}
            alt={props.images[index].alt}
          />
        );
      }
    }
    return code;
  };

  return (
    <div>
      <h1>ad image part</h1>
      {console.log(props.images)}
      {props.images ? (
        renderComp()
      ) : (
        <div>
          <img
            key={uuidv4()}
            src={require("../pics/blank_home.png")}
            alt="main_home_frame"
            className="jss2255"
          />
          {console.log("kdkd")}
        </div>
      )}
    </div>
  );
};

export default AdImages;