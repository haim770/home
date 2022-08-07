import React, { useState, useEffect, useLayoutEffect } from 'react';
import instance from '../../../../api/AxiosInstance';
import EmptyList from '../components/common/EmptyList';
import BlogList from '../components/home/BlogList';
import Header from '../components/home/Header';
import CreateBlog from '../components/home/NewBlog';
import SearchBar from '../components/home/SearchBar';
import "./styles.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(true);
  let currentOffset = 0;
  let searchElement = "";
  let prvScrollHeight = 0;
  let scrollHeight = 0;
  /**
   * Get Blogs from server
   */
  const getBlogs = async () => {
    const result = await instance.request({
      data: {
        data_type: "getBlogs",
        params: { searchParams: searchElement,
                  offestVal: currentOffset,      
      },
      },
    });

    // check if we got new data from server or any response
    if (result?.data) {
      if (result?.data?.Blogs) {
        const tmpArray = blogs;
        Object.values(result.data.Blogs).forEach((element) => {
          if(!isDuplicate(tmpArray,element))
            tmpArray.push(element);
        });
        setBlogs(tmpArray);
      }
    }
    // after finish load all data stop loading
    setLoading(false);
    if(prvScrollHeight < scrollHeight) {
    currentOffset += 6;
    prvScrollHeight = Math.max(scrollHeight, prvScrollHeight);
    }

  };

const isDuplicate = (data, obj) =>
  data.some((el) =>
    Object.entries(obj).every(([key, value]) => value === el[key])
  );

// check when we scroll down to button
  const handleScroll = (e) => {
    // this is the inner height of the HTML page
    //const innerHeight = window.innerHeight;
    // get the current Scroll hheight
    //const scrollPosition = e.target.documentElement.scrollTop;
    // get full page scrolling height
    scrollHeight = e.target.documentElement.scrollHeight;

    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      setLoading(true)
      getBlogs();
      
    }
  };

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    // const allBlogs = blogList;
    // const filteredBlogs = allBlogs.filter((blog) =>
    //   blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    // );
    // setBlogs(filteredBlogs);
    // set what we want to search.
    searchElement = searchKey.toLowerCase();

    //update the offset value to zero
    currentOffset = 0;
    setLoading(true);
    getBlogs();
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    // Clear Search element
    searchElement = "";
    setSearchKey("");
    //update the offset value to zero
    currentOffset = 0;
    setLoading(true);
    getBlogs();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="blogMargin">
      {/* Page Header */}
      <Header />

      {/* Create New Blog - Admin only */}
      <CreateBlog />
      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}

      {loading ? (
        <div className="loaderBlog"></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
