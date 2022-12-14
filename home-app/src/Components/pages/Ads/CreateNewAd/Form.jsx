import React, { useState } from "react";
import instance from "../../../../api/AxiosInstanceFormData";
import useAuth from "../../../../Auth/useAuth";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/

const Form = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [formDataStepThree, setFormDataStepThree] = useState({});
  const [formDataImage, setFormDataImage] = useState([]);
  const [formDataImageUpload, setFormDataImageUpload] = useState("");
  const [formDataStepThreeBuy, setFormDataStepThreeBuy] = useState({});
  const [formDataStepThreeRent, setFormDataStepThreeRent] = useState({});
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
    //check if all required fields are filled
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

    data.append("data_type", "postNewAdd");
    data.append("formData", JSON.stringify(formData));
    data.append(
      "formDataStepThree",
      formData.assetOption === "השכרה"
        ? JSON.stringify(formDataStepThreeRent)
        : JSON.stringify(formDataStepThreeBuy)
    );
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
      toast.success("המודעה פורסמה בהצלחה!");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך והמודעה לא פורסמה!");
    }

    // reload this compnent after 4 second
    setTimeout(function () {
      window.location.reload(false);
    }, 4000);
  };

  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <StepOne formData={formData} setFormData={setFormData} />;
      case 1:
        return <StepTwo formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            formDataStepThree={formDataStepThree}
            setFormDataStepThree={setFormDataStepThree}
            formDataStepThreeBuy={formDataStepThreeBuy}
            setFormDataStepThreeBuy={setFormDataStepThreeBuy}
            formDataStepThreeRent={formDataStepThreeRent}
            setFormDataStepThreeRent={setFormDataStepThreeRent}
            requiredFieldsStepThreeRent={requiredFieldsStepThreeRent}
            requiredFieldsStepThreeBuy={requiredFieldsStepThreeBuy}
            setrequiredFieldsStepThreeRent={setrequiredFieldsStepThreeRent}
            setrequiredFieldsStepThreeBuy={setrequiredFieldsStepThreeBuy}
          />
        );
      case 3:
        return (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            formDataImage={formDataImage}
            formDataImageUpload={formDataImageUpload}
            setFormDataImage={setFormDataImage}
            setFormDataImageUpload={setFormDataImageUpload}
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
