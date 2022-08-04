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
import AdsBlockForReports from "../../../AdsBlockForReports.js";
function HandleComplainOnAd(props) {
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const changeToListView = (e) => {
    e.preventDefault();
    props.setTableClassName("showTable");
    props.setClassName("notShowSelected");
    props.setSelectedReport({});
  };
  return (
    <article className={props.className}>
      <div>
        <button onClick={changeToListView}>x</button>
      </div>
      <div className="makeTwoElementSideBySide">
        <section>
          <AdsBlockForReports adBlock={props.selectedAd} />
        </section>
        <section>
          <ShowReport element_type="ad" report={props.selectedReport} adBlock={props.selectedAd}  />
        </section>
      </div>
      <p>
        <Button content="contact seller" onclick={props.onclick} />
      </p>
    </article>
  );
}
HandleComplainOnAd.defaultProps = {
  didWatch: 0,
  sellerName: "seller",
  price: "0",
  createTime: "00/00/00",
  adLink: "null",
  city: "haif",
  street: "ha",
  number: "45",
  rooms: "3",
};
export default HandleComplainOnAd;
