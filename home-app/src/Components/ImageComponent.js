import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const ImageComponent = (props) => {
  return (
    <div key={uuidv4()}>
      <img
        src={require("../" + props.src)}
        alt={props.alt}
        className={props.className}
      />
    </div>
  );
};
ImageComponent.defaultProps = {
  alt: "no ads found",
  src: "/pics/blank_home.png",
  className: "jss2255",
};
export default ImageComponent;
