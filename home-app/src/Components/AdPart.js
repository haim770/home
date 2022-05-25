import React from "react";
import Parameter from "./Parameter.js";
const AdPart = (props) => {
  const renderComp = () => {
    let code = [];
    for (const [key, value] of Object.entries(props.ad[0])) {
      //we get an object of ad in the props and get out the 0 place which is the ads params
      code.push(
        <div key={props.ad[0].adId+key}>
          <Parameter paramName={key} paramValue={value} />
        </div>
      );
      // console.log(`${key}: ${value}`);
    }
    return code;
  };

  return (
    <div className="adCardTitle">
      <h1>adPart</h1>
      {console.log(props.ad)}
      {props.ad ? renderComp() : <p>no ad</p>}
    </div>
  );
};

export default AdPart;
