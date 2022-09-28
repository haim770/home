import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../../common/Chip";
import Viewers from "../../../common/Viewers";
import "./styles.css";

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    cover,
    category,
    id,
    views,
  },
}) => {
  const authorAvatar = "author.jpg";
  return (
    <div className="blogItem-wrap">
      <Link className="blogItem-link" to={`/blog/${id}`}>
        <img
          className="blogItem-cover"
          src={
            process.env.PUBLIC_URL +
            require("../../../../../../../../../api/Images/" + cover)
          }
          alt="cover"
        />
      </Link>
      <div className="chipWrapper">
        <Chip label={category} />
        <Viewers label={views} />
      </div>
      <Link className="blogItem-link" to={`/blog/${id}`}>
        <h3>{title}</h3>
      </Link>
      <Link className="blogItem-link" to={`/blog/${id}`}>
        <p className="blogItem-desc">{description}</p>
      </Link>
      <footer className="footer-styles">
        <div className="blogItem-author">
          {/*<img src={authorAvatar} alt="avatar" /> */}
          <img
            src={
              process.env.PUBLIC_URL +
              require("../../../../../../../../../api/Images/" + authorAvatar)
            }
            alt="avatar"
          />
          <div>
            <h6>{authorName}</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className="blogItem-link" to={`/blog/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
