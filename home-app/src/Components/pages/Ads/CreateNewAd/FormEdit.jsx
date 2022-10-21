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
  const [formDataStepFourImageOld, setFormDataStepFourImageOld] = useState([]);
  const [formDataStepThreeRent, setFormDataStepThreeRent] = useState({});
  const [formDataImageUpload, setFormDataImageUpload] = useState("");
  const [picsForDelete, setPicsForDelete] = useState([]);
  const [requiredFieldsStepThreeRent, setrequiredFieldsStepThreeRent] =
    useState({});
  const [requiredFieldsStepThreeBuy, setrequiredFieldsStepThreeBuy] = useState(
    {}
  );
  const { auth } = useAuth();
  // Page title, display accordin to our page index
  const FormTitles = [
    "סוג הנכס",
    "קצת מידע על הנכס?",
    "הפרטים הקטנים",
    "קצת תמונות תמיד עוזר",
  ];
  const checkIfAllRequiredFieldsInAdContentAreValid = () => {
    if (formData.assetOption == "rent") {
      for (const [keyForRequired, valueRequired] of Object.entries(
        requiredFieldsStepThreeRent
      )) {
        let paramExist = false; //parameter exist in the adaContentObject
        for (const [keyForAdContentRent, valueAdContentRent] of Object.entries(
          formDataStepThreeRent
        )) {
          if (keyForAdContentRent == keyForRequired) {
            if (valueAdContentRent == "") {
              toast.dismiss();
              toast.error("חייב למלא שדה " + keyForRequired);
              return false;
            } else {
              paramExist = true;
            }
          }
        }
        if (!paramExist) {
          toast.dismiss();
          toast.error("חייב למלא שדה " + keyForRequired);
          return false;
        }
      }
    } else {
      for (const [keyForRequired, value] of Object.entries(
        requiredFieldsStepThreeBuy
      )) {
        let paramExist = false; //parameter exist in the adaContentObject
        for (const [keyForAdContentBuy, valueAdContentBuy] of Object.entries(
          formDataStepThreeBuy
        )) {
          if (keyForAdContentBuy == keyForRequired) {
            if (valueAdContentBuy == "") {
              toast.dismiss();
              toast.error("חייב למלא שדה " + keyForRequired);
              return false;
            } else {
              paramExist = true;
            }
          }
        }
        if (!paramExist) {
          toast.dismiss();
          toast.error("חייב למלא שדה " + keyForRequired);
          return false;
        }
      }
    }
    return true;
  };
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
      for (let x = 0; x < formDataImageUpload[i].length; x++) {
        data.append("files[]", formDataImageUpload[i][x]);
      }
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
    data.append("picsDelete", JSON.stringify(picsForDelete));
    /**
     * END Build the post data
     */
    const result = await instance.request({
      data,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (result?.data === "publish") {
      toast.dismiss(); // remove loading toast
      toast.success("המודעה נערכה בהצלחה!");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך והמודעה לא פורסמה!");
    }

    // reload this compnent after 4 second
    setTimeout(function () {
      window.location.reload(false);
    }, 4000);
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
    for (let index = 0; index < props.adBlock.adImages.length; index++) {
      formDataStepFourImageOld[index] = {
        alt: props.adBlock.adImages[index].alt,
        picture_url: props.adBlock.adImages[index].picture_url,
      };
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
            requiredFieldsStepThreeRent={requiredFieldsStepThreeRent}
            requiredFieldsStepThreeBuy={requiredFieldsStepThreeBuy}
            setrequiredFieldsStepThreeRent={setrequiredFieldsStepThreeRent}
            setrequiredFieldsStepThreeBuy={setrequiredFieldsStepThreeBuy}
          />
        );
      case 3:
        return (
          <StepFourEdit
            formData={formData}
            setFormData={setFormData}
            formDataImage={formDataImage}
            formDataImageUpload={formDataImageUpload}
            formDataImageOld={formDataStepFourImageOld}
            setFormDataImage={setFormDataImage}
            setFormDataImageUpload={setFormDataImageUpload}
            adBlock={props.adBlock}
            picsForDelete={picsForDelete}
            setPicsForDelete={setPicsForDelete}
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
            onClick={(e) => {
              e.preventDefault();
              if (page === FormTitles.length - 1) {
                postNewAdd();
              } else {
                if (page === FormTitles.length - 2) {
                  if (checkIfAllRequiredFieldsInAdContentAreValid()) {
                    setPage((currPage) => currPage + 1);
                  } else {
                    return;
                  }
                } else {
                  setPage((currPage) => currPage + 1);
                }
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
