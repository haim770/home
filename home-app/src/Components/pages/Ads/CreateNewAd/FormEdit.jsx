import React, { useEffect, useState } from "react";
import instance from "../../../../api/AxiosInstanceFormData";
import useAuth from "../../../../Auth/useAuth";
import StepFourEdit from "./StepFourEdit";
import StepOneEdit from "./StepOneEdit";
import StepThreeEdit from "./StepThreeEdit";
import StepTwoEdit from "./StepTwoEdit";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

const Form = (props) => {
  const [page, setPage] = useState(0);
  console.log(props.adBlock);
  const [formData, setFormData] = useState({
    assetOption: props.adBlock.ad[0].adType == "קנייה" ? "buy" : "rent",
    houseTax: props.adBlock.ad[0].houseCommittee || "",
    price: props.adBlock.ad[0].price || "",
    localTax: props.adBlock.ad[0].propertyTaxes || "",
    city: props.adBlock.ad[0].city || "",
    street: props.adBlock.ad[0].street || "",
    numberOfRooms: props.adBlock.ad[0].rooms || "",
    floor: props.adBlock.ad[0].floor || "",
    maxFloor: props.adBlock.ad[0].maxFloor || "",
    area: props.adBlock.ad[0].area || "",
    appartmentEntrance: props.adBlock.ad[0].entry || "",
    appartmentNumber: props.adBlock.ad[0].building_number || "",
    entryDate:
      props.adBlock.ad[0].entry_date !== "גמיש" &&
      props.adBlock.ad[0].entry_date !== "מיידי"
        ? props.adBlock.ad[0].entry_date
        : "",
    assetType: props.adBlock.ad[0].property_type || "דירה",
    assetEntry:
      props.adBlock.ad[0].entry_date === "גמיש" ||
      props.adBlock.ad[0].entry_date === "מיידי"
        ? props.adBlock.ad[0].entry_date
        : "עתידי",
  });
  const [formDataStepThreeBuy, setFormDataStepThreeBuy] = useState({});
  const [formDataImage, setFormDataImage] = useState([]);
  const [formDataStepThreeRent, setFormDataStepThreeRent] = useState({});
  const [formDataImageUpload, setFormDataImageUpload] = useState("");
  const { auth } = useAuth();
  // Page title, display accordin to our page index
  const FormTitles = [
    "סוג הנכס",
    "קצת מידע על הנכס?",
    "הפרטים הקטנים",
    "קצת תמונות תמיד עוזר",
  ];

  /**
   *Post form to server
   */
  const postNewAdd = async () => {
    toast.loading("מפרסם...");
    /**
     * Build the post data
     */
    let data = new FormData();
    for (let i = 0; i < formDataImageUpload.length; i++) {
      data.append("files[]", formDataImageUpload[i]);
    }
    data.append("data_type", "editAd");
    data.append("formData", JSON.stringify(formData));
    data.append(
      "formDataStepThree",
      formData.assetOption === "השכרה"
        ? JSON.stringify(formDataStepThreeRent)
        : JSON.stringify(formDataStepThreeBuy)
    );
    data.append("adId", props.adBlock.ad[0].adID);
    /**
     * END Build the post data
     */
    const result = await instance.request({
      data,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    if (result?.data === "success") {
      toast.dismiss(); // remove loading toast
      toast.success("המודעה פורסמה בהצלחה!");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך והמודעה לא פורסמה!");
    }

    // reload this compnent after 4 second
    // setTimeout(function () {
    //   window.location.reload(false);
    // }, 4000);
  };
  useEffect(() => {
    for (let index = 0; index < props.adBlock.adContent.length; index++) {
      if (props.adBlock.ad[0].adType == "השכרה") {
        formDataStepThreeRent[props.adBlock.adContent[index].name] =
          props.adBlock.adContent[index].value;
      } else {
        formDataStepThreeBuy[props.adBlock.adContent[index].name] =
          props.adBlock.adContent[index].value;
      }
    }
  }, []);
  const PageDisplay = () => {
    switch (page) {
      case 0:
        return (
          <StepOneEdit
            formData={formData}
            setFormData={setFormData}
            adBlock={props.adBlock}
          />
        );
      case 1:
        return (
          <StepTwoEdit
            formData={formData}
            setFormData={setFormData}
            adBlock={props.adBlock}
          />
        );
      case 2:
        return (
          <StepThreeEdit
            formData={formData}
            setFormData={setFormData}
            formDataStepThreeBuy={formDataStepThreeBuy}
            setFormDataStepThreeBuy={setFormDataStepThreeBuy}
            formDataStepThreeRent={formDataStepThreeRent}
            setFormDataStepThreeRent={setFormDataStepThreeRent}
            adBlock={props.adBlock}
          />
        );
      case 3:
        return (
          <StepFourEdit
            formData={formData}
            setFormData={setFormData}
            formDataImage={formDataImage}
            setFormDataImage={setFormDataImage}
            setFormDataImageUpload={setFormDataImageUpload}
            adBlock={props.adBlock}
          />
        );
      default:
        // only for the dev
        throw new Error(`No case for type ${page} in form slider`);
    }
  };

  return (
    <div className="createNewForm">
      <div className="createNewForm-container">
        <div className="progressbarForm">
          <div
            style={{
              width:
                page === 0
                  ? "25%"
                  : page === 1
                  ? "50%"
                  : page === 2
                  ? "75%"
                  : "100%",
            }}
          ></div>
        </div>
        <div className="createNewForm-header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="createNewForm-body">{PageDisplay()}</div>
        <div className="createNewForm-footer">
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                postNewAdd();
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "פרסם" : "הבא"}
          </button>
          <button
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            הקודם
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Form;