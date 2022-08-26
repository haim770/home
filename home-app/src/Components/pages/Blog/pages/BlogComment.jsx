import React, { useState } from "react";
import "../../../../styles/blogComment.css";
import instance from "../../../../api/AxiosInstance";
import useAuth from "../../../../Auth/useAuth";
import BlogCommentForm from "./BlogCommentForm";
function LinkRecord(props) {
  const { auth } = useAuth();
  const [showReport, setReportShow] = useState("notShowReport");
  const deleteComment = async (e) => {
    //delete link
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
    console.log(result);
    if (result?.data == "not authorized") {
      alert("error");
    } else {
      alert("deleted");
      props.getComments();
    }
  };
  return (
    <section>
      {console.log(props)}
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
          {console.log(auth)}
          <li className="commentsHeaderPart">
            <li>{props.blogComment.userId}</li>
            <li>{props.blogComment.create_time}</li>
          </li>
          <li className="commentTitlePart">
            <li className="titleComments">כותרת</li>
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
