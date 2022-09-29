import React, { useState, useEffect, useMemo } from "react";
import instance from "../../../../api/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import "../../../../styles/Main.css";
import "../../../../styles/Ads.css";
import BlogComment from "./BlogComment";
import useAuth from "../../../../Auth/useAuth";
const CommentsForBlog = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [noMoreAdsForSearch, setNoMoreAdsForSearch] = useState(false); //control on weather we will scroll for more result changes to true if no more result are availabl
  const { auth } = useAuth();
  const getComments = async () => {
    setLoading(false);
    setNoMoreAdsForSearch(false);
    
    const result = await instance.request({
      data: {
        data_type: "getCommentsForBlogId",
        params: {
          blogId: props.blogId,
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
      },
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    console.log(result.data);
    if (result.data === false || result.data === "") {
      setNoMoreAdsForSearch(true);
      return;
    } else {
      setComments(
        result.data.map((comment) => (
          <BlogComment
            key={comment.id}
            blogComment={comment}
            auth={auth}
            getComments={getComments}
          />
        ))
      );
    }
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <section className="containerForAllAds" id="containerForAd">
      <h1>תגובות </h1>
      {comments}
    </section>
  );
};
export default CommentsForBlog;
