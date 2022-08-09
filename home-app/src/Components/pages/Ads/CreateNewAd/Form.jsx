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
    console.log(formDataImageUpload);
    for (let i = 0; i < formDataImageUpload.length; i++) {
      for (let x = 0; x < formDataImageUpload[i].length; x++) {
        data.append("files[]", formDataImageUpload[i][x]);
        console.log(formDataImageUpload[i][x]);
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
    console.log(result.data);
    if (result?.data === "publish") {
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
