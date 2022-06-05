import React, {useState} from 'react'
import instance from "../../../../api/AxiosInstanceFormData";
import useAuth from '../../../../Auth/useAuth';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import "./styles.css";

const Form = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [formDataStepThree, setFormDataStepThree] = useState({});
  const [formDataImage, setFormDataImage] = useState([]);
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
    /**
     * Build the post data
     */
    let data = new FormData();
    for (let i = 0; i < formDataImageUpload.length; i++) {
      data.append("files[]", formDataImageUpload[i]);
    }
    data.append("data_type", "postNewAdd");
    data.append("formData", JSON.stringify(formData));
    data.append("formDataStepThree", JSON.stringify(formDataStepThree));
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
          />
        );
      case 3:
        return (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            formDataImage={formDataImage}
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
    </div>
  );
}

export default Form