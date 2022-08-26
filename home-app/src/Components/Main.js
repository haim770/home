import Favorite from "@mui/icons-material/Favorite";
import { React, useState, useLayoutEffect } from "react";
import ImgCarousel from "./ImgCarousel";
import ChangeUserRule from "./ChangeUserRule";
import FavoritesAds from "./FavoritesAds";
import EditAd from "./pages/EditAd";
import EmptyList from "./pages/Blog/components/common/EmptyList";
import BlogList from "./pages/Blog/components/home/BlogList";
import instance from "../api/AxiosInstance";
import "../styles/MainPage.css";
import useView from "./pages/Chat/ChatUseContext";
import useAuth from "../Auth/useAuth";
import AdById from "./AdById";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [ads, setAds] = useState([]);
  const [indexStartAds, setIndexStartAds] = useState(0);
  const [noMoreAds, setNoMoreAds] = useState(false);
  const [midSend, setMidSend] = useState(false);
  const { auth } = useAuth();
  const { startNewChat } = useView();
  /**
   * Get Blogs from server
   */
  const getBlogs = async () => {
    const result = await instance.request({
      data: {
        data_type: "getBlogsTop",
        params: {},
      },
    });

    // check if we got new data from server or any response
    //console.log(result?.data);
    if (result?.data) {
      if (result?.data?.Blogs) {
        setBlogs(result.data.Blogs);
      }
    }
  };

  /**
   * get ads at start
   *
   */
  const getAds = async () => {
    if (!midSend) {
      setMidSend(true);
      const result = await instance.request({
        data: {
          data_type: "getAdsForMain",
          params: { start: indexStartAds, end: 3 },
          guest: auth.accessToken != undefined ? "registered" : "guest",
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      // check if we got new data from server or any response
      //console.log(result?.data);
      if (result.data == false) {
        setNoMoreAds(true);
      }
      if (result?.data) {
        setNoMoreAds(false);
        setAds(
          result.data.map((ad) => (
            <AdById
              key={ad.adID}
              adID={ad.adID}
              auth={auth}
              startNewChat={startNewChat}
            />
          ))
        );
      }
    }
    setMidSend(false);
  };

  /**
   * This will make that first we get all contacts then we will display all other
   * data and view, so we will see all contacts when we open the contacts
   * window
   */
  useLayoutEffect(() => {
    getBlogs();
    getAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="wrapperHomePage">
      {/* Blog List & Empty View */}
      <section>
        {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
      </section>
      {/*section for top ads */}
      <section className="sectionAdsInMain">
        <button
          className="button-4"
          disabled={indexStartAds == "0" ? true : false}
          onClick={async (e) => {
            e.preventDefault();

            //console.log(indexStartAds);
            setIndexStartAds((indexStartAds) =>
              indexStartAds == "0" || indexStartAds == "3"
                ? 0
                : indexStartAds - 3
            );
            await getAds();
          }}
        >
          prev
        </button>
        <div className="adsContainerMain">{ads}</div>
        <button
          className="button-4"
          disabled={noMoreAds}
          onClick={async (e) => {
            e.preventDefault();
            setIndexStartAds(indexStartAds + 3);
            await getAds();
          }}
        >
          next
        </button>
      </section>


    </div>
  );
};

export default Home;
