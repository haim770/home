import useAuth from "../../../../../../../Auth/useAuth";
import "./styles.css";

import React, { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "../../../../../../../api/AxiosInstanceFormData";
import instanceA from "../../../../../../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import { FiUploadCloud } from "react-icons/fi";

import { useSearchParams } from "react-router-dom";

const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogSubCategory, setBlogSubCategory] = useState("");
  const [formDataImage, setFormDataImage] = useState([]);
  const [formDataImageUpload, setFormDataImageUpload] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [searchParams] = useSearchParams();
  const [imagePath,setImagePath]=useState("");
  const editBlogId = searchParams.get("editblog");
  const fileName = uuidv4();
  const { auth } = useAuth();

  // When enter page, Check if we in edit mode
  useLayoutEffect(() => {
    if (editBlogId) {
      setEditMode(true);
      getBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBlogId]);

  /**
   * Get Blogs from server
   */
  const getBlogs = async () => {
    const result = await instanceA.request({
      data: {
        data_type: "getBlogById",
        params: { blogId: editBlogId },
      },
    });
    // check if we got new data from server or any response
    if (result?.data) {
      if (result?.data?.Blogs) {
        setBlogBody(result.data.Blogs[0].description);
        setBlogCategory(result.data.Blogs[0].category);
        setBlogSubCategory(result.data.Blogs[0].subCategory);
        setBlogTitle(result.data.Blogs[0].title);
        setImagePath(result.data.Blogs[0].cover);
      }
    }
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
    if(imagePath > 2)
      data.append("image_name", imagePath);
    else
      data.append("files[]",formDataImageUpload);
    data.append("data_type", editMode ? "updateBlog" : "postNewBlog");
    data.append("blogTitle", JSON.stringify(blogTitle));
    data.append("blogBody", JSON.stringify(blogBody));
    data.append("blogCategory", JSON.stringify(blogCategory));
    data.append("blogSubCategory", JSON.stringify(blogSubCategory));
    data.append("blogId", JSON.stringify(editMode ? editBlogId : ""));
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
    if (result?.data === "publish") {
      toast.dismiss(); // remove loading toast
      toast.success("בלוג פורסם בהצלחה!");
    } else {
      toast.dismiss(); // remove loading toast
      toast.error("אוי לא, משהו השתבש בדרך והבלוג לא פורסם!");
    }
  };

  const fileSelectedHandler = (e) => {
    setImagePath("")
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
            {imagePath.length > 2 ? (
              <img
                src={
                  process.env.PUBLIC_URL +
                  require(
                  "../../../../../../../../../api/Images/" +
                  imagePath)
                }
                alt="image_"
              />
            ) : (
              <>
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
                        <img
                          src={photo}
                          alt={`${fileName}_${photo}`}
                          key={photo}
                        />
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="blog">
          <textarea
            type="text"
            className="title"
            placeholder="קטגוריה"
            onChange={(e) => setBlogCategory(e.target.value)}
            value={blogCategory}
          ></textarea>
          <textarea
            type="text"
            className="title"
            placeholder="תת קטגוריה, יש להפריד עם , "
            onChange={(e) => setBlogSubCategory(e.target.value)}
            value={blogSubCategory}
          ></textarea>
          <textarea
            type="text"
            className="title"
            placeholder="כותרת בלוג..."
            onChange={(e) => setBlogTitle(e.target.value)}
            value={blogTitle}
          ></textarea>
          <textarea
            type="text"
            className="article"
            placeholder="התחל לכתוב כאן..."
            onChange={(e) => setBlogBody(e.target.value)}
            value={blogBody}
          ></textarea>
        </div>
      </div>
      <div className="addBlogFooter">
        <button
          className="button-4"
          onClick={() => {
            postNewAdd();
          }}
        >
          {editMode ? "עדכן בלוג" : "פרסם בלוג"}
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CreateBlog;
