import React, { useState } from "react";
import "../../../../styles/blogComment.css";
import instance from "../../../../api/AxiosInstance";
import useAuth from "../../../../Auth/useAuth";
function LinkRecord(props) {
  const { auth } = useAuth();
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
    <ul className="blogComment">
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
          <button className="linkButton" onClick={deleteComment}>
            מחיקת תגובה
          </button>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
}
LinkRecord.defaultProps = {
  type: "showLink",
  link: [],
};
export default LinkRecord;
