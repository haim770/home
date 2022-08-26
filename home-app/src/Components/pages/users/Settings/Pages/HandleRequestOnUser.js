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
import UserForTheReport from "../../../UserForTheReport.jsx";
function HandleRequestOnUser(props) {
  const { auth } = useAuth();
  const changeToListView = (e) => {
    e.preventDefault();
    props.setTableClassName("showTable");
    props.setClassName("notShowSelected");
    props.setSelectedReport({});
  };
  const changeMail = async (e) => {
    //change mail if mail is validy by manager eyes and has no duplicates
    console.log(props.selectedUser);
    // return;
    const result = await instance.request({
      data: {
        data_type: "changeUserMailByManager",
        params: {
          oldMail: props.selectedUser[0].mail,
          newMail: props.selectedReport.title,
        },
        guest: "registered",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data != "didnt succeed" && result.data != "not authorized") {
      alert("mail changed");
      props.setSelectedReport({});
      props.setSelectedUser({});
      props.setClassName("notShowSelected");
      props.setTableClassName("showTable");
      await props.getAllReports();
    } else {
      alert("no change");
    }
  };
  return (
    <article className={props.className}>
      <div>
        <button onClick={changeToListView}>x</button>
      </div>
      <div className="makeTwoElementSideBySide">
        <section>
          <UserForTheReport
            user={props.selectedUser}
            getAllReports={props.getAllReports}
            changeMail={changeMail}
          />
        </section>
        <section>
          <ShowReport
            element_type="user"
            report={props.selectedReport}
            adBlock={props.selectedUser}
            getAllReports={props.getAllReports}
          />
        </section>
      </div>
    </article>
  );
}
HandleRequestOnUser.defaultProps = {
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
export default HandleRequestOnUser;
