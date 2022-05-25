import React from 'react'
import "./blog.css"
import coverImg from "../../../pics/Blog/BlogCover1.jpg";
const BlogHeader = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg" src={coverImg} alt="CoverImg" />
    </div>
  );
}

export default BlogHeader;