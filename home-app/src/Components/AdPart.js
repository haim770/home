import React from "react";
import Parameter from "./Parameter.js";
import { NavLink, Link } from "react-router-dom";
import "../styles/adPart.css";
const AdPart = (props) => {
  //display the ad part of the ad
  const renderComp = () => {
    let code = [];
    for (const [key, value] of Object.entries(props.ad[0])) {
      if (value == "") {
        continue;
      }
      if (
        key === "adID" ||
        key === "userIdWatchSet" ||
        key === "userIdContactSet" ||
        key === "active" ||
        key === "close_reason" ||
        key === "map_X" ||
        key === "expire_date" ||
        key === "approval_status" ||
        key === "map_Y" ||
        key === "user_id" ||
        key === "watch"
      ) {
        continue;
      }
      let hebrewKey = "";
      //make hebrew key for display
      switch (key) {
        case "adID":
          hebrewKey = "מספר מודעה";
          break;
        case "ad_link":
          hebrewKey = "לינק";
          break;
        case "create_time":
          hebrewKey = "תאריך יצירת מודעה";
          code.push(
            <Parameter
              key={props.ad[0].adID + key}
              paramName={hebrewKey}
              paramValue={
                value.substring(0, value.indexOf(" ")).split("-")[2] +
                "/" +
                value.substring(0, value.indexOf(" ")).split("-")[1] +
                "/" +
                value.substring(0, value.indexOf(" ")).split("-")[0]
              }
            />
          );
          continue;
        case "contact_counter":
          hebrewKey = "מספר אנשים שיצרו קשר";
          break;
        // case "watch":
        //   hebrewKey = "מספר צפיות";
        //   break;
        case "city":
          hebrewKey = "עיר";
          break;
        case "street":
          hebrewKey = "רחוב";
          break;
        case "area":
          hebrewKey = "שטח";
          break;
        case "building_number":
          hebrewKey = "מס בניין";
          break;
        case "enteringDate":
          hebrewKey = "תאריך כניסה";
          break;
        case "propertyTaxes":
          hebrewKey = "ארנונה";
          break;
        case "houseCommittee":
          hebrewKey = "ועד בית";
          break;
        case "maxFloor":
          hebrewKey = "קומות בבניין";
          break;
        case "floor":
          hebrewKey = "קומה";
          break;
        case "adType":
          hebrewKey = "סוג מודעה";
          break;
        case "rooms":
          hebrewKey = "חדרים";
          break;
        case "price":
          hebrewKey = "מחיר";
          break;
        case "zip_code":
          hebrewKey = "מיקוד";
          break;
        case "apartment":
          hebrewKey = "מס דירה";
          break;
        case "entry":
          hebrewKey = "כניסה";
          break;
        case "entry_date":
          hebrewKey = "תאריך כניסה";
          break;
        case "property_type":
          hebrewKey = "סוג נכס";
          break;
        default:
          hebrewKey = "אין מפתח";
          break;
      }
      //we get an object of ad in the props and get out the 0 place which is the ads params
      if (hebrewKey == "לינק") {
        //if we have link we make a custome parameter
        code.push(
          <Parameter
            key={props.ad[0].adID + key}
            paramName={hebrewKey}
            paramValue={
              <Link to={{ pathname: "/AdsWithSearch/" + value }}>לחץ כאן</Link>
            }
          />
        );
      } else {
        code.push(
          <Parameter
            key={props.ad[0].adID + key}
            paramName={hebrewKey}
            paramValue={value}
          />
        );
      }
    }
    return code;
  };

  return (
    <ul className={props.className}>
      {props.ad ? renderComp() : <li>no ad</li>}
    </ul>
  );
};
AdPart.defaultProps = {
  withoutLink: false,
};
export default AdPart;
