import React, { useState } from "react";
import "./button.css";
function Button(props) {
  const [nameClass, setClassName] = useState(props.nameClass); //class of btn hook
  const changeBtnClass = (classNa) => {
    //change the class of btn
    setClassName("after");
  };
  return (
    <button className={nameClass} onClick={props.onClick}>
      {props.content}
    </button>
  );
}
Button.defaultProps = {
  nameClass: "b4",
  content: "kk",
  onClick: null,
};

export default Button;
