import React, { useState, useEffect, useMemo } from "react";
import instance from "../../../../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import "../../../../../styles/Main.css";
import "../../../../../styles/usefullLinks.css";
import useAuth from "../../../../../Auth/useAuth";
import LinkRecord from "./LinkRecord.jsx";
import { display } from "@mui/system";
const UsefullLinks = (props) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkContent, setLinkContent] = useState(""); //link name
  const [link, setLink] = useState(""); //link address
  const [showAddLink, setShowAddLink] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { auth } = useAuth();
  const insertLink = async (e) => {
    //add new link
    e.preventDefault();
    setShowAddLink(true);
  };
  const getLinks = async () => {
    //get all links
    setLoading(false);
    const result = await instance.request({
      data: {
        data_type: "getAllLinks",
        params: {},
        guest: auth.accessToken != undefined ? "registered" : "guest",
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "") {
      return;
    } else {
      setLinks(
        result.data.map((link) => (
          <LinkRecord
            key={link.linkId + uuidv4()}
            link={link}
            setShowAddLink={setShowAddLink}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ))
      );
      setLoading(true);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);
  useEffect(() => {
    getLinks();
  }, [refresh]);

  return (
    <section className="containerLinks">
      <h1>תצוגת לינקים</h1>
      {auth?.roles == "5150" ? (
        <button
          style={{
            padding: "0.5rem",
            margin: "1rem",
            display: !showAddLink ? "block" : "none",
          }}
          onClick={insertLink}
        >
          הוסף לינק
        </button>
      ) : (
        ""
      )}
      {loading && !showAddLink ? (
        <div className="usefullLinks">{loading && links}</div>
      ) : showAddLink ? (
        <LinkRecord
          type="AddNewLink"
          setShowAddLink={setShowAddLink}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        ""
      )}
    </section>
  );
};
export default UsefullLinks;
