import useAuth from "../../../../../../../Auth/useAuth";
import "./styles.css";

import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import instance from "../../../../../../../api/AxiosInstanceFormData";
import { v4 as uuidv4 } from "uuid";

const CreateBlog = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [formDataStepThree, setFormDataStepThree] = useState({});
  const [formDataImage, setFormDataImage] = useState([]);
  const [formDataImageUpload, setFormDataImageUpload] = useState([]);
  const [formDataStepThreeBuy, setFormDataStepThreeBuy] = useState({});
  const [formDataStepThreeRent, setFormDataStepThreeRent] = useState({});
  const fileName = uuidv4();
  const { auth } = useAuth();

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
        console.log(formDataImageUpload[i][x]);
      }
      
    }
    data.append("data_type", "postNewBlog");
    data.append("formData", JSON.stringify(formData));
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
      toast.success("בלוג פורסם בהצלחה!");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך והבלוג לא פורסם!");
    }

    // reload this compnent after 4 second
    // setTimeout(function () {
    //   window.location.reload(false);
    // }, 4000);
  };

  const fileSelectedHandler = (e) =>{
      if (e.target.files)
        setFormDataImageUpload(e.target.files);
  }

  return auth?.roles === "5150" ? (
    <div className="addBlog">
      <div className="addBlogHeader"></div>
      <div className="addBlogBody">
        <input type="file" onChange={fileSelectedHandler} />
      </div>
      <div className="addBlogFooter">
        <button
          onClick={() => {
            postNewAdd();
          }}
        >
          פרסם בלוג
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CreateBlog;
