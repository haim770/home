import Favorite from "@mui/icons-material/Favorite";
import { React, useState, useLayoutEffect } from "react";
import ImgCarousel from "./ImgCarousel";
import ChangeUserRule from "./ChangeUserRule";
import FavoritesAds from "./FavoritesAds";
import EditAd from "./pages/EditAd";
import EmptyList from "./pages/Blog/components/common/EmptyList";
import BlogList from "./pages/Blog/components/home/BlogList";
import instance from "../api/AxiosInstance";
import "../styles/MainPage.css"
const Home = () => {
    const [blogs, setBlogs] = useState([]);
    /**
     * Get Blogs from server
     */
    const getBlogs = async () => {
      const result = await instance.request({
        data: {
          data_type: "getBlogsTop",
          params: { },
        },
      });

      // check if we got new data from server or any response
      console.log(result?.data);
      if (result?.data) {
        if (result?.data?.Blogs) {
          setBlogs(result.data.Blogs);
        }
      }
    };

  /**
   * This will make that first we get all contacts then we will display all other
   * data and view, so we will see all contacts when we open the contacts
   * window
   */
  useLayoutEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wrapperHomePage">
      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
      {/* <EditAd/> */}
      <p>Home page</p>
    </div>
  );
};

export default Home;
