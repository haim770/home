import React, { useEffect, useState } from "react";
import Button from "../../../../Button.js";
import instance from "../../../../../api/AxiosInstance.jsx";
import "../../../../../styles/handleComplainOnAd.css";
import RecipeReviewCard from "../../../../RecipeReviewCard.js";
import useAuth from "../../../../../Auth/useAuth";
import AdsBlock from "../../../AdsBlock.jsx";
import AdPart from "../../../../AdPart.js";
import Report from "../../../../Report.js";
import ShowReport from "../../../../showReport.js";
import BlogForReports from "../../../BlogForReports";
function HandleComplainOnAd(props) {
  const { auth } = useAuth();
  const changeToListView = (e) => {
    e.preventDefault();
    props.setTableClassName("showTable");
    props.setClassName("notShowSelected");
    props.setSelectedReport({});
  };
  return (
    <article className={props.className}>
      {console.log(props)}
      <div>
        <button onClick={changeToListView}>x</button>
      </div>
      <div className="makeTwoElementSideBySide">
        <section>
          <BlogForReports
            selectedBlog={props.selectedBlog}
            getAllReports={props.getAllReports}
          />
        </section>
        <section>
          <ShowReport
            element_type="blog"
            report={props.selectedReport}
            selectedBlog={props.selectedBlog}
            getAllReports={props.getAllReports}
            setTableClassName={props.setTableClassName}
            setClassName={props.setClassName}
          />
        </section>
      </div>
    </article>
  );
}
HandleComplainOnAd.defaultProps = {};
export default HandleComplainOnAd;
