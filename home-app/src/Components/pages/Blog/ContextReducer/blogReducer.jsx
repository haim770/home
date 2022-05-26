// initial the view states
export const initialState = {
  /**
   * blogInfo will contain:
   *    - Blog title
   *    - Blog ID
   *    - Blog Cover image
   *    - Blog short Description
   *    - Blog create time
   *    - Blog author
   */
  blogInfo: [],
  /**
   * blogCategory will contain:
   *    - Blog Category
   */
  blogCategory: [],
};

const blogReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_BLOGS":
      return {
        ...state,
        blogInfo: payload.blogInfo,
        blogCategory: payload.blogCategory,
      };

    case "CLEAR_BLOG_LIST":
      return initialState;

    default:
      // only for the dev
      throw new Error(`No case for type ${type} in blog reducer`);
  }
};

export default blogReducer;
