import React, { useState } from "react";
import "../../../../styles/blogComment.css";
import instance from "../../../../api/AxiosInstance";
import useAuth from "../../../../Auth/useAuth";
import BlogCommentForm from "./BlogCommentForm";
function LinkRecord(props) {
  const { auth } = useAuth();
  const [showReport, setReportShow] = useState("notShowReport");
  const deleteComment = async (e) => {
    //delete comment
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "deleteComment",
        params: {
          id: props.blogComment.id,
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    
    if (result?.data == "not authorized") {
      alert("error");
    } else {
      alert("deleted");
      props.getComments();
    }
  };

  const getTime = (theTime) => {
    const startTime = new Date();
    const endTime = new Date(theTime);
    // To calculate the time difference of two dates
    var Difference_In_Time = startTime.getTime() - endTime.getTime();

    // To calculate the no. of days between two dates
    const numberOfDays = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    if (numberOfDays>365)
      return "לפני " + Math.round(numberOfDays / 365) + " שנים";
    else
    return "לפני " + numberOfDays + " ימים";
  }
  return (
    <section>
      {showReport === "showCommentEditForm" ? (
        <BlogCommentForm
          className={showReport}
          setClassName={setReportShow}
          action="edit"
          commentId={props.blogComment.id}
          blogId={props.blogComment.blogId}
          content={props.blogComment.content}
          title={props.blogComment.title}
          getComments={props.getComments}
        />
      ) : (
        <ul
          className="blogComment"
          style={{
            display: showReport != "showCommentEditForm" ? "block" : "none",
          }}
        >
          <li className="commentsHeaderPart">
            <li className="userNameHeader"> {props.blogComment.userId} </li>
            <li className="timeHeader">
              {getTime(props.blogComment.create_time)} •&nbsp;
            </li>
          </li>
          <li className="commentTitlePart">
            <li className="titleComments">{props.blogComment.title}</li>
          </li>
          <li>{props.blogComment.content}</li>
          {auth?.roles == "5150" ? (
            <li>
              <button className="button-4" onClick={deleteComment}>
                מחיקת תגובה
              </button>
              <button
                className="button-4"
                onClick={(e) => {
                  e.preventDefault();
                  setReportShow("showCommentEditForm");
                }}
              >
                עריכת תגובה
              </button>
            </li>
          ) : (
            <li></li>
          )}
        </ul>
      )}
    </section>
  );
}
LinkRecord.defaultProps = {
  type: "showLink",
  link: [],
};
export default LinkRecord;
