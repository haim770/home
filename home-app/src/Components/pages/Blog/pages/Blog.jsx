import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chip from "../components/common/Chip";
import EmptyList from "../components/common/EmptyList";
import "./styles.css";
import { Link } from "react-router-dom";
import instance from "../../../../api/AxiosInstance";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {blog ? (
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
          <img src={ 
              process.env.PUBLIC_URL +
              require("../../../../../../api/Images/" + blog.cover)
            }
             alt="cover" />
          <p className="blog-desc">{blog.description}</p>
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default Blog;
