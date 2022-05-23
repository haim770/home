import React, { useEffect, useState } from "react";
import Button from "./Button";
import Address from "./Address";
import Parameter from "./Parameter";
import instance from "../api/AxiosInstance.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
function PackageFull(props) {
  const location = useLocation();
  const data = location.state;
  return (
    <section>
      <ul>
        <Parameter paramName="price" paramValue={data.pack.price} />
        <Parameter paramName="content" paramValue={data.pack.content} />
        <Parameter paramName="title" paramValue={data.pack.title} />
        <Parameter paramName="ad_value" paramValue={data.pack.ad_value} />
      </ul>
    </section>
  );
}
PackageFull.defaultProps = {};
export default PackageFull;
