import React, { useState } from "react";
import "../../users/Settings/Pages/Styles/AddParameterMaster.css";
import useAuth from "./../../../../Auth/useAuth";
import toast, { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs && https://react-hot-toast.com/
import instance from "./../../../../api/AxiosInstance";
function BlogCommentForm(props) {
  const { auth } = useAuth();
  const [title, setTitle] = useState(props.title); //hook for reason name
  const [content, setContent] = useState(props.content);
  const onChangeState = (setStateName, e) => {
    //func that recieves setstate and the event and change value of state to the value of input
    setStateName(e.target.value);
  };
  const returnStateToDefault = () => {
    setContent("");
    setTitle("");
  };
  const submitComment = async (e) => {
    //add ad to the db, returns true/false
    e.preventDefault();

    if (title.trim() === "") {
      alert("fill the fields");
      return;
    }
    if (props.action != "edit") {
      const result = await instance.request({
        data: {
          data_type: "submitComment",
          params: {
            title: title,
            content: content,
            blogId: props.blogId,
            guest: auth.accessToken != undefined ? "registered" : "guest",
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      
      if (result.data == "not authorized") {
        toast.dismiss(); // remove loading toast
        toast.error("משהו השתבש");
      } else {
        props.setClassName("notShowSelected");
        toast.dismiss(); // remove loading toast
        toast.success("תגובה נוספה");
        returnStateToDefault();
      }
    } else {
      const result = await instance.request({
        data: {
          data_type: "editComment",
          params: {
            commentId: props.commentId,
            title: title,
            content: content,
            guest: auth.accessToken != undefined ? "registered" : "guest",
          },
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
  
      if (result.data == "not authorized") {
        toast.dismiss(); // remove loading toast
        toast.error("משהו השתבש");
      } else {
        props.setClassName("notShowSelected");
        toast.dismiss(); // remove loading toast
        toast.success("תגובה נוספה");
        props.getComments();
        returnStateToDefault();
      }
    }
  };
  const closeParam = (e) => {
    e.preventDefault();
    props.setClassName("notShowSelected");
    props.setTableClassName("showTable");
  };
  return (
    <section className={props.className}>
      <button onClick={closeParam}>x</button>
      <form className="formAddParameter">
        <label className="labelParamAdd">
          <span>כותרת </span>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => onChangeState(setTitle, e)}
          />
        </label>
        <label className="labelParamAdd">
          <span>תוכן </span>
          <input
            type="text"
            name="content"
            id="content"
            required
            value={content}
            onChange={(e) => onChangeState(setContent, e)}
          />
        </label>
        <p className="labelParamAdd">
          <button className="button-4" onClick={submitComment}>
            הוספה
          </button>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
BlogCommentForm.defaultProps = {
  title: "",
  content: "",
  action: "create",
  className: "notShowSelected",
};
export default BlogCommentForm;
