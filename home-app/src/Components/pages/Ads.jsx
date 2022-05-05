import React, { useState } from "react";
import TestAxios from "./TestAxios";

import "../../styles/Main.css";
const Ads = () => {
  return (
    <div>
      <p>Ads page</p>
      <TestAxios data_type="TEST" params={""} />
    </div>
    
  );
};
export default Ads;
