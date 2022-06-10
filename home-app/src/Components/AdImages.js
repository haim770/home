import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ImageComponent from "./ImageComponent.js";
const AdImages = (props) => {
  const renderComp = () => {
    let code = [];
    //console.log(props);
    if (props.numPicToDisplay === "1") {
      if (props.images[0]) {
        code.push(
          <ImageComponent
            key={uuidv4()}
            src={props.images[0].picture_url}
            alt={props.images[0].alt}
          />
        );
      } else {
        code.push(
          <ImageComponent
            key={uuidv4()}
            src="../pics/blank_home.png"
            alt={props.images[0].alt}
          />
        );
      }
    } else {
      for (let index = 0; index < props.images.length; index++) {
        //we get array of all the  images as props
        //we make display as checkbox
        console.log(props.images[index]);
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
        </div>
      )}
    </div>
  );
};

export default AdImages;
