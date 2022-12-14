import React, { useState, useEffect } from "react";
import "./Styles/AddParameterMaster.css";
import "./Styles/siteSettings.css";
import useAuth from "../../../../../Auth/useAuth";
import instance from "../../../../../api/AxiosInstance";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

function ManageSiteSettings(props) {
  //comp for manageing site settings
  const { auth } = useAuth();
  const [adValue, setAdValue] = useState(""); //hook for initial ad value per register
  const [editableParams, setEditableParams] = useState(false);
  const [expireDate, setExpireDate] = useState("");
  const [expectedProfit, setExpectedProfit] = useState("");
  const returnStateToDefault = () => {};
  const setDecimalParams = (e, setHook) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value[e.target.value.length - 1] === ".") return;
    setHook(e.target.value); //int number inside
  };
  const makeParamEditable = (e) => {
    //make params editable
    e.preventDefault();
    setEditableParams(!editableParams);
    console.log(editableParams);
  };
  const getAllSiteSettings = async () => {
    //get all site settings and place them in fields
    const result = await instance.request({
      data: {
        data_type: "getAllSiteSettings",
        params: {
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result.data === "not authorized") {
      alert("not authorized");
      return;
    } else {
      setAdValue(result.data[0].adsGift);
      setExpireDate(result.data[0].expireDateAds);
      setExpectedProfit(result.data[0].expectedProfit);
    }
  };
  useEffect(() => {
    getAllSiteSettings();
  }, []);
  const cancel = (e) => {
    //cancell operation
    e.preventDefault();
    getAllSiteSettings();
    setEditableParams(false);
  };
  const submitChanges = async (e) => {
    //submit changes
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "updateSiteSettings",
        params: {
          guest: "registered",
          ad_value: adValue > 0 ? adValue : 5,
          expireDateAds: expireDate > 0 ? expireDate : 30,
          expectedProfit: expectedProfit >= 0 ? expectedProfit : 0,
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === "update good") {
      toast.dismiss(); // remove loading toast
      toast.success("  ?????????? ????????????");
      getAllSiteSettings();
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("?????????? ??????????");
      getAllSiteSettings();
    }
  };
  return (
    <section>
      <form className="formAddParameter">
        <div>
          <label className="labelParamAdd" key={"adValueLable"}>
            <span>???????? ???????????? ???????????? ????????????</span>
            <input
              type="text"
              name="adValue"
              value={adValue || ""}
              readOnly={!editableParams}
              onChange={(e) => setDecimalParams(e, setAdValue)}
            />
          </label>
          <label className="labelParamAdd" key="expireDateLable">
            <span>???? ???????? ???? ???? ???????? ???? ??????????</span>
            <input
              type="text"
              name="expireDate"
              value={expireDate || ""}
              readOnly={!editableParams}
              onChange={(e) => setDecimalParams(e, setExpireDate)}
            />
          </label>
          <label className="labelParamAdd" key="expireDateLable">
            <span>?????????? ????????</span>
            <input
              type="text"
              name="expectedProfit"
              value={expectedProfit || ""}
              readOnly={!editableParams}
              onChange={(e) => setDecimalParams(e, setExpectedProfit)}
            />
          </label>
        </div>
        <div className="btnClassForSiteSettings">
          <button onClick={makeParamEditable} className="button-4">
            {!editableParams
              ? "???????? ???? ???????????????? ?????????????? ????????????"
              : "???????? ???????????? ??????????"}
          </button>
          <button className="button-4" onClick={submitChanges}>
            ???????? ?????????????? ????????
          </button>
          <button className="button-4" onClick={cancel}>
            ?????? ??????????????
          </button>
        </div>
      </form>
      <Toaster />
    </section>
  );
}
ManageSiteSettings.defaultProps = {};
export default ManageSiteSettings;
