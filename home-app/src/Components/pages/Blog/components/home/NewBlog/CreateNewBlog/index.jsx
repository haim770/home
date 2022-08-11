import useAuth from "../../../../../../../Auth/useAuth";
import "./styles.css";

import React, { useState } from "react";
import toast from "react-hot-toast";
import instance from "../../../../../../../api/AxiosInstanceFormData";
import { v4 as uuidv4 } from "uuid";
import { FiUploadCloud } from "react-icons/fi";

const CreateBlog = () => {
  const [blogTitle,setBlogTitle]=useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogSubCategory, setBlogSubCategory] = useState("");
  const [formDataImage, setFormDataImage] = useState([]);
  const [formDataImageUpload, setFormDataImageUpload] = useState([]);

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
    data.append("files[]", formDataImageUpload);
    data.append("data_type", "postNewBlog");
    data.append("blogTitle", JSON.stringify(blogTitle));
    data.append("blogBody", JSON.stringify(blogBody));
    data.append("blogCategory", JSON.stringify(blogCategory));
    data.append("blogSubCategory", JSON.stringify(blogSubCategory));
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

  const fileSelectedHandler = (e) => {
    if (e.target.files) {
      setFormDataImageUpload(e.target.files[0]);
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormDataImage((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
  const deleteImage = (e) => {
    const itemToRemove = e.target.getAttribute("id");
    setFormDataImage(formDataImage.filter((item) => item !== itemToRemove));
    setFormDataImageUpload(
      formDataImage.filter((item) => item !== itemToRemove)
    );
  };
  return auth?.roles === "5150" ? (
    <div className="addBlog">
      <div className="addBlogHeader"></div>
      <div className="addBlogBody">
        <div className="fileUploader">
          <input
            type="file"
            onChange={fileSelectedHandler}
            id="file"
            name="files"
            accept="image/*"
            multiple={false}
          />
          <div className="label-holder">
            <label htmlFor="file" className="label">
              <FiUploadCloud />
            </label>
            <span>תמונת נושא</span>
          </div>
          <div className="result">
            {formDataImage.map((photo) => {
              return (
                <>
                  <div className="imageContainer">
                    <button
                      className="top-right"
                      id={photo}
                      onClick={deleteImage}
                    >
                      X
                    </button>
                    <br></br>
                    <img src={photo} alt={`${fileName}_${photo}`} key={photo} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="blog">
          <textarea
            type="text"
            className="title"
            placeholder="קטגוריה"
            onChange={(e) => setBlogCategory(e.target.value)}
          ></textarea>
          <textarea
            type="text"
            className="title"
            placeholder="תת קטגוריה, יש להפריד עם , "
            onChange={(e) => setBlogSubCategory(e.target.value)}
          ></textarea>
          <textarea
            type="text"
            className="title"
            placeholder="כותרת בלוג..."
            onChange={(e) => setBlogTitle(e.target.value)}
          ></textarea>
          <textarea
            type="text"
            className="article"
            placeholder="התחל לכתוב כאן..."
            onChange={(e) => setBlogBody(e.target.value)}
          ></textarea>
        </div>
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
