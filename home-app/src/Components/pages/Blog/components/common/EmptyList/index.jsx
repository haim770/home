import React from "react";
import "./styles.css";
import img1 from "../../../images/13525-empty.gif";

const EmptyList = () => (
  <div className="emptyList-wrap">
    <img src={img1} alt="empty" />
  </div>
);

export default EmptyList;
