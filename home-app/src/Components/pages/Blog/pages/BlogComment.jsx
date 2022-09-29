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
    // time difference in ms
    var timeDiff = startTime - endTime;

    // strip the ms
    timeDiff /= 1000;

    // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
    var seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    var days = timeDiff;

    if (days < 1) {
      if (hours > 1) return "לפני " + hours + " שעות";
      else if (minutes > 1) return "לפני " + minutes + " דקות";
      else return "לפני " + seconds + " שניות";
    } else if (days > 365) return "לפני " + Math.round(days / 365) + " שנים";
    else return "לפני " + days + " ימים";
  };
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
          <li className="userComment">{props.blogComment.content}</li>
          {auth?.roles == "5150" ? (
            <li className="adminPanel">
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
