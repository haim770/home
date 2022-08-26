import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chip from "../components/common/Chip";
import EmptyList from "../components/common/EmptyList";
import "./styles.css";
import { Link } from "react-router-dom";
import instance from "../../../../api/AxiosInstance";
import Report from "../../../Report.js";
import BlogCommentForm from "./BlogCommentForm";
import CommentsForBlog from "./CommentsForBlog";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReport, setReportShow] = useState("notShowReport");
  const reportOnBlog = (e) => {
    //report on BLOG
    e.preventDefault();
    setReportShow("showReport");
  };
  const insertComment = (e) => {
    //open comment window
    e.preventDefault();
    setReportShow("showComment");
  };
  /**
   * Get Blogs from server
   */
  const getBlogs = async () => {
    const result = await instance.request({
      data: {
        data_type: "getBlogById",
        params: { blogId: id },
      },
    });

    // check if we got new data from server or any response
    console.log(result?.data);
    if (result?.data) {
      if (result?.data?.Blogs) {
        setBlog(result.data.Blogs[0]);
      }
    }
    // after finish load all data stop loading
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div className="loaderBlog"></div>
  ) : (
    <div className="blogMargin">
      <Link className="blog-goBack" to="/Blog">
        <span> &#8594;</span> <span>חזור</span>
      </Link>
      {blog && showReport != "showReport" && showReport != "showComment" ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">פורסם ב {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subCategory">
              {blog.subCategory.split(",").map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img
            src={
              process.env.PUBLIC_URL +
              require("../../../../../../api/Images/" + blog.cover)
            }
            alt="cover"
          />
          <p className="blog-desc">{blog.description}</p>
          <button className="button-4" onClick={reportOnBlog}>
            {" "}
            דווח על בלוג
          </button>
          <button className="button-4"  onClick={insertComment}>
            הגב
          </button>
          <CommentsForBlog blogId={id} />
        </div>
      ) : showReport == "showReport" ? (
        <Report
          className={showReport}
          setClassName={setReportShow}
          blogId={id}
          elementType="blog"
        />
      ) : showReport == "showComment" ? (
        <BlogCommentForm
          className={showReport}
          setClassName={setReportShow}
          blogId={id}
        />
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default Blog;
