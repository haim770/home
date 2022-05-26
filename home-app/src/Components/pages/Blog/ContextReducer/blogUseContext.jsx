import React, { useReducer, createContext, useContext } from "react";
import blogReducer, { initialState } from "./blogReducer";

const BlogContext = createContext(initialState);

export const BlogProvidor = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Adding new blog to our blog view list
  const addToBlog = (blogData, blogCategory) => {
    /**
     * what this do:
     *  1. state go to our reducer data
     *  2. blogInfo go to state->blogInfo in reducer
     *  3. concat add the new data with our old data
     */
    const updateblogInfo = state.blogInfo.concat(blogData);
    dispatch({
      type: "ADD_TO_BLOGS",
      payload: {
        blogInfo: updateblogInfo,
        blogCategory: blogCategory,
      },
    });
  };

  // Clear or blog list data for filter from database
  const clearData = () => {
    dispatch({
      type: "CLEAR_BLOG_LIST",
      payload: {
      },
    });
  };
  // the values we want to make global
  const value = {
    blogInfo: state.blogInfo,
    blogCategory: state.blogCategory,
    addToBlog,
    clearData,
  };
  return <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>;
};

const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error(`BlogView must be used within BlogContext`);
  }
  return context;
};
export default useBlog;
