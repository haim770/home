import React, { useState } from "react";
import "../../../../../styles/usefullLinks.css";
import instance from "../../../../../api/AxiosInstance";
import useAuth from "../../../../../Auth/useAuth";
function LinkRecord(props) {
  const { auth } = useAuth();
  const [link, setLink] = useState(props.link.link);
  const [linkContent, setLinkContent] = useState(props.link.link_content);
  const [type, setType] = useState("showLink");
  const cancelInsert = (e) => {
    //cancel insert
    e.preventDefault();
    props.setShowAddLink(false);
  };
  const editLink = async (e) => {
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "editLink",
        params: {
          linkId: props.link.linkId,
          linkContent: linkContent,
          link: link,
        },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    if (result?.data == true) {
      alert("append");
    } else {
      alert("not append");
    }
    setType("");
    props.setRefresh(!props.refresh);
  };
  const deleteLink = async (e) => {
    //delete link
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "deleteLink",
        params: { linkId: props.link.linkId },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    if (result?.data == true) {
      alert("append");
    } else {
      alert("not append");
    }
    props.setShowAddLink(false);
    props.setRefresh(!props.refresh);
  };
  const insertLink = async (e) => {
    //insertLink
    e.preventDefault();
    const result = await instance.request({
      data: {
        data_type: "insertLink",
        params: { link: link, linkContent: linkContent },
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result);
    if (result?.data == true) {
      alert("append");
    } else {
      alert("not append");
    }
    props.setShowAddLink(false);
    props.setRefresh(!props.refresh);
  };
  return props.type == "AddNewLink" && auth.roles == "5150" ? (
    <ul
      className={auth?.roles == "5150" ? "linkRecordManager" : "linkRecordUser"}
    >
      <label key="linkName" className="linkName">
        <span> שם לינק</span>
        <input
          type="text"
          name="linkName"
          id="linkName"
          value={linkContent}
          onChange={(e) => setLinkContent(e.target.value)}
        />
      </label>
      <label key="linkAddress" className="linkAddress">
        <span> לינק</span>
        <input
          type="text"
          name="linkAddress"
          id="linkAddress"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <li className="linkButtons">
        <button className="button-4" onClick={cancelInsert}>
          {" "}
          ביטול
        </button>
        <button className="button-4" onClick={insertLink}>
          הוספה{" "}
        </button>
      </li>
    </ul>
  ) : auth.roles == "5150" && type == "editLink" ? (
    <ul
      className={auth?.roles == "5150" ? "linkRecordManager" : "linkRecordUser"}
    >
      <label key="linkName" className="linkName">
        <span> שם לינק</span>
        <input
          type="text"
          name="linkName"
          id="linkName"
          value={linkContent}
          onChange={(e) => setLinkContent(e.target.value)}
        />
      </label>
      <label key="linkAddress" className="linkAddress">
        <span> לינק</span>
        <input
          type="text"
          name="linkAddress"
          id="linkAddress"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <li className="linkButtons">
        <button className="button-4" onClick={cancelInsert}>
          {" "}
          ביטול
        </button>
        <button className="button-4" onClick={editLink}>
          עריכה{" "}
        </button>
      </li>
    </ul>
  ) : props.link ? (
    <ul
      className={auth?.roles == "5150" ? "linkRecordManager" : "linkRecordUser"}
    >
      {console.log(auth)}
      <li className="linkName">{props.link.link_content}</li>
      <li className="linkAddress">{props.link.link}</li>
      {auth?.roles == "5150" ? (
        <li className="linkButtons">
          <button className="button-4" onClick={(e) => setType("editLink")}>
            עריכת לינק
          </button>
          <button className="button-4" onClick={deleteLink}>
            מחיקת לינק
          </button>
        </li>
      ) : (
        ""
      )}
    </ul>
  ) : (
    <ul></ul>
  );
}
LinkRecord.defaultProps = {
  type: "showLink",
  link: [],
};
export default LinkRecord;
