import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/imageComponent.css";
const ImageComponent = (props) => {
  return (
    <div key={uuidv4()} className="picContainer" >
      <img
        src={require("../../../api/Images/" + props.src)}
        alt={props.alt}
        className="img"
         height= "200px"
        width="200px"
      />
    </div>
  );
};
ImageComponent.defaultProps = {
  alt: "no ads found",
  src: "blank_home.png",
  // className: "jss2255",
};
export default ImageComponent;
