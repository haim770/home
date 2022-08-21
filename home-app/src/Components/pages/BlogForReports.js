import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FcSms } from "react-icons/fc";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "../../styles/AdsBlockForReports.module.css";
import Chip from "../pages/Blog/components/common/Chip";
import "../../styles/Report.css";

// view component for the chat

import { v4 as uuidv4 } from "uuid";
import RecipeReviewCard from "../RecipeReviewCard.js";
import instance from "../../api/AxiosInstance.jsx";
import Parameter from "../Parameter.js";
import useAuth from "../../Auth/useAuth";

const BlogForReports = (props) => {
  console.log(props);
  /**
   * Add function of start new chat with user ad publisher
   */
  const { auth } = useAuth();
  const deleteBlog = async (e) => {
    //delete blog
    console.log(props.selectedBlog.Blogs[0].id);
    const result = await instance.request({
      data: {
        data_type: "deleteBlogById",
        params: {
          blogId: props.selectedBlog.Blogs[0].id,
          guest: "registered",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data != "didnt succeed" && result.data != "not authorized") {
      alert("blog deleted");
      await props.getAllReports();
    }
  };
  return (
    <section className={styles.cardBlock}>
      {console.log(props.selectedBlog.Blogs[0].subCategory)}
      <div className="blog-wrap">
        <header>
          <p className="blog-date">
            פורסם ב {props.selectedBlog.Blogs[0].createdAt}
          </p>
          <h1>{props.selectedBlog.Blogs[0].title}</h1>
          <div className="blog-subCategory">
            {props.selectedBlog.Blogs[0].subCategory
              .split(",")
              .map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
          </div>
        </header>
        <img
          src={
            process.env.PUBLIC_URL +
            require("../../../../api/Images/" +
              props.selectedBlog.Blogs[0].cover)
          }
          alt="cover"
        />
        <p className="blog-desc">{props.selectedBlog.Blogs[0].description}</p>
        <button onClick={deleteBlog}>מחק </button>
      </div>
    </section>
  );
};
BlogForReports.defaultProps = {
  isFavorite: false,
  didWatch: 0,
};
export default BlogForReports;
